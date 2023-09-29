import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CustomNote from "../CustomNote/CustomNote.js";
import CalendarNote from "../CalendarNote/CalendarNote.js";
import { useAuth } from "../../contexts/AuthContext.js";
import "./Notes.css";

function Notes({ editNoteFromAgendaState, delNoteFromAgendaState, dayAgenda, changeCalendarClass }) {

  useEffect(() => {
    changeCalendarClass('calendar');
  }, []);

  const { user } = useAuth();

  return (
    <div className="calendar-notes">
      {dayAgenda.holidays?.length > 0 && (
        <>
          <h3>календарни събития</h3>
          {dayAgenda.holidays.map((holiday, i) => (
            <CalendarNote
              key={holiday._id}
              editNoteFromAgendaState={editNoteFromAgendaState}
              delNoteFromAgendaState={delNoteFromAgendaState}
              note={holiday}
            />
          ))}
        </>
      )}
      {dayAgenda.notes?.length > 0 && (
        <>
          <h3>дневни бележки</h3>
          {dayAgenda.notes.map((note, i) => (
            <CustomNote
              key={note._id}
              editNoteFromAgendaState={editNoteFromAgendaState}
              delNoteFromAgendaState={delNoteFromAgendaState}
              changeCalendarClass={changeCalendarClass}
              note={note}
            />
          ))}
        </>
      )}
      {user.token ? (
        <Link onClick={() => changeCalendarClass('calendar calendar-mobile')} className="add-note" to={`/calendar/create-note`}>+</Link>
      ) : null}
      {user.role === "admin" ? (
        <Link className="add-calendar-note" to={`/calendar/create-holiday`}>
          +
        </Link>
      ) : null}
    </div>
  );
}

export default Notes;
