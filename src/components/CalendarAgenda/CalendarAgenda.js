import { useState, useEffect } from "react";
import {
  useNavigate,
  Routes,
  Route,
  useParams,
  Navigate,
} from "react-router-dom";

import "./CalendarAgenda.css";
import Calendar from "./Calendar.js";
import Notes from "./Notes.js";
import CreateHoliday from "./CreateHoliday.js";
import CreateNote from "./CreateNote.js";
import EditNote from "./EditNote.js";
import EditCalNote from "./EditCalNote.js";
import * as calendarService from "../../services/calendarService.js";
import { useAuth } from "../../contexts/AuthContext.js";
import { useError } from "../../contexts/ErrorContext.js";
import { useHeader } from "../../contexts/HeaderContext.js";

const currentDate = new Date();
let d = currentDate.getDate();
let m = currentDate.getMonth();
let y = currentDate.getFullYear();
const today = { y, m, d };

function CalendarAgenda() {
  const [year, setYear] = useState(y);
  const [month, setMonth] = useState(m);
  const [pickedDay, setPickedDay] = useState(d);
  const [monthAgenda, setMonthAgenda] = useState({});
  const [dayAgenda, setDayAgenda] = useState({});
  const [calendarClass, setCalendarClass] = useState('calendar');

  const { user } = useAuth();
  const { loadError } = useError();
  const { startLoading, completeLoading, searchResult, loadResult } = useHeader();
  const { noteId } = useParams();

  useEffect(() => {
    pullAgenda();
  }, [month]);

  useEffect(() => {
    if (searchResult.notes) {
      searchResult.notes.forEach((x) => (x.search = true));
      searchResult.holidays.forEach((x) => (x.search = true));
      setTimeout(() => {
        setDayAgenda(searchResult);
        completeLoading();
      }, 500);
    }
  }, [searchResult]);

  useEffect(() => {
    if (Boolean(Object.keys(monthAgenda).length)) {
      checkDayAgenda();
    }
  }, [pickedDay]);

  useEffect(() => {
    if (Boolean(Object.keys(monthAgenda).length)) {
      setTimeout(() => {
        checkDayAgenda();
        completeLoading();
      }, 400);
    }
  }, [monthAgenda]);

  const changeMonth = (newMonth, newYear) => {
    setMonth(newMonth);
    setYear(newYear);
  };

  const pullAgenda = async () => {
    startLoading();
    setDayAgenda({});
    loadResult({});
    try {
      const agenda = await calendarService.getMonthAgenda(
        `year=${year}&month=${month + 1}`,
        user
      );
      setMonthAgenda({ month: month + 1, agenda });
    } catch (error) {
      loadError({
        origin: "back-end",
        msg: "Възникна грешка при зареждане на данни",
      });
    }
  };

  const checkDayAgenda = () => {
    if (monthAgenda.agenda) {
      const dayHolidays = monthAgenda.agenda.holidays.filter(
        (x) => x.day === pickedDay
      );

      const dayNotes = monthAgenda.agenda.notes
        .filter((x) => x.day === pickedDay)
        .sort((a, b) => a.hour - b.hour || a.minutes - b.minutes);

      const agenda = {
        holidays: dayHolidays,
        notes: dayNotes,
      };
      setDayAgenda(agenda);
    }
  };

  const changePickedDay = (day) => setPickedDay(day);

  const delNoteFromAgendaState = (noteId, noteType) => {
    let notes, holidays;

    if (noteType === "customNote") {
      notes = monthAgenda.agenda.notes.reduce((notes, note) => {
        if (note._id !== noteId) {
          notes.push(Object.assign({}, note));
        }
        return notes;
      }, []);

      holidays = monthAgenda.agenda.holidays.reduce((holidays, holiday) => {
        holidays.push({ ...holiday });
        return holidays;
      }, []);
    }

    if (noteType === "calendarNote") {
      holidays = monthAgenda.agenda.holidays.reduce((holidays, holiday) => {
        if (holiday._id !== noteId) {
          holidays.push(Object.assign({}, holiday));
        }
        return holidays;
      }, []);

      notes = monthAgenda.agenda.notes.reduce((notes, note) => {
        holidays.push({ ...note });
        return notes;
      }, []);
    }

    const agenda = {
      holidays,
      notes,
    };

    setMonthAgenda((state) => ({
      ...state,
      agenda,
    }));
  };

  const editNoteFromAgendaState = (noteId, resultNote, noteType) => {
    let notes, holidays;

    if (noteType === "customNote") {
      if (resultNote.year === year && resultNote.month === month + 1) {
        notes = monthAgenda.agenda.notes.reduce((notes, note) => {
          if (note._id == noteId) {
            notes.push(Object.assign({}, resultNote));
          } else {
            notes.push(Object.assign({}, note));
          }
          return notes;
        }, []);
        holidays = monthAgenda.agenda.holidays.reduce((holidays, holiday) => {
          holidays.push({ ...holiday });
          return holidays;
        }, []);
      } else {
        notes = monthAgenda.agenda.notes.reduce((notes, note) => {
          if (note._id !== noteId) {
            notes.push(Object.assign({}, note));
          }
          return notes;
        }, []);
        holidays = monthAgenda.agenda.holidays.reduce((holidays, holiday) => {
          holidays.push({ ...holiday });
          return holidays;
        }, []);
      }
    }

    if (noteType === "calendarNote") {
      if (resultNote.month === month + 1) {
        holidays = monthAgenda.agenda.holidays.reduce((holidays, holiday) => {
          if (holiday._id == noteId) {
            holidays.push(Object.assign({}, resultNote));
          } else {
            holidays.push(Object.assign({}, holiday));
          }
          return holidays;
        }, []);
        notes = monthAgenda.agenda.notes.reduce((notes, note) => {
          notes.push({ ...note });
          return notes;
        }, []);
      } else {
        holidays = monthAgenda.agenda.holidays.reduce((holidays, holiday) => {
          if (holiday._id !== noteId) {
            holidays.push(Object.assign({}, holiday));
          }
          return holidays;
        }, []);
        notes = monthAgenda.agenda.notes.reduce((notes, note) => {
          notes.push({ ...note });
          return notes;
        }, []);
      }
    }
    const agenda = {
      holidays,
      notes,
    };

    setMonthAgenda((state) => ({
      ...state,
      agenda,
    }));
  };

  const addNoteInAgendaState = (note, noteType) => {
    if (noteType === "customNote") {
      if (note.year === year && note.month === month + 1) {
        setMonthAgenda((state) => ({
          ...state,
          agenda: {
            ...state.agenda,
            notes: [...state.agenda.notes, note],
          },
        }));
      } else {
        completeLoading();
      }
    }
    if (noteType === "calendarNote") {
      if (note.month === month + 1) {
        setMonthAgenda((state) => ({
          ...state,
          agenda: {
            ...state.agenda,
            holidays: [...state.agenda.holidays, note],
          },
        }));
      } else {
        completeLoading();
      }
    }
  };

  const changeCalendarClass = (classString) => {
    setCalendarClass(classString);
  }

  return (
    <div className={calendarClass}>
      <Routes>
        <Route
          path="/"
          element={
            Boolean(Object.keys(monthAgenda).length) && (
              <Notes
                editNoteFromAgendaState={editNoteFromAgendaState}
                delNoteFromAgendaState={delNoteFromAgendaState}
                dayAgenda={dayAgenda}
                changeCalendarClass={changeCalendarClass}
              />
            )
          }
        />
        <Route
          path="/search"
          element={
            Boolean(Object.keys(monthAgenda).length) && (
              <Notes
                editNoteFromAgendaState={editNoteFromAgendaState}
                delNoteFromAgendaState={delNoteFromAgendaState}
                dayAgenda={dayAgenda}
              />
            )
          }
        />
        <Route
          path={`/create-note`}
          element={
            <CreateNote
              updateNotes={addNoteInAgendaState}
              year={year}
              month={month}
              pickedDay={pickedDay}
              changeCalendarClass={changeCalendarClass}
            />
          }
        />
        <Route
          path="/create-holiday"
          element={
            <CreateHoliday
              updateNotes={addNoteInAgendaState}
              year={year}
              month={month}
              pickedDay={pickedDay}
            />
          }
        />
        <Route
          path="/edit-custom-note/:noteId"
          element={
            <EditNote
              updateNotes={editNoteFromAgendaState}
              year={year}
              month={month}
              pickedDay={pickedDay}
              changeCalendarClass={changeCalendarClass}
            />
          }
        />
        <Route
          path="/edit-calendar-note/:noteId"
          element={
            <EditCalNote
              updateNotes={editNoteFromAgendaState}
              year={year}
              month={month}
              pickedDay={pickedDay}
            />
          }
        />
        <Route path="/*" element={<Navigate to="/calendar" />} />
      </Routes>

      {Boolean(Object.keys(monthAgenda).length) && (
        <Calendar
          monthAgenda={monthAgenda}
          pickedDay={pickedDay}
          year={year}
          month={month}
          today={today}
          changePickedDay={changePickedDay}
          changeMonth={changeMonth}
        />
      )}
    </div>
  );
}

export default CalendarAgenda;
function solve(asd, asdf) {
}
