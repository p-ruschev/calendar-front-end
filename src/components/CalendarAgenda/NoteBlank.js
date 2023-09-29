import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as calendarService from "../../services/calendarService.js";
import { useHeader } from "../../contexts/HeaderContext.js";
import { useError } from "../../contexts/ErrorContext.js";
import "./NoteBlank.css";

function NoteBlank({
  updateNotes,
  pickedDay,
  month,
  year,
  noteId,
  isAdmin,
  user,
  noteType,
  changeCalendarClass,
}) {

  const [note, setNote] = useState({
    title: "",
    description: "",
    year,
    month,
    day: pickedDay,
    hour: "",
    minutes: "",
  });

  const [lastDay, setLastDay] = useState(0);
  const [firstDay, setFirstDay] = useState(0);
  const [titleLabel, setTitleLabel] = useState("заглавие");
  const [descriptionLabel, setDescriptionLabel] = useState("описание");
  const [titleLabelClass, setTitleLabelClass] = useState("note-form-title");
  const [descriptionLabelClass, setDescriptionLabelClass] = useState(
    "note-form-description"
  );

  const navigate = useNavigate();
  const { startLoading } = useHeader();
  const { loadError } = useError();

  useEffect(() => {
    if (!noteId) {
      setNote((state) => ({
        ...state,
        year,
        month: month + 1,
        day: pickedDay,
      }));
    } else {
      if (isAdmin) {
        (async () => {
          try {
            const n = await calendarService.getOneCalNote(noteId, user);
            setNote((state) => ({
              ...state,
              title: n.title,
              description: n.description,
              month: n.month,
              day: n.day,
            }));
          } catch (error) {
            loadError({
              origin: "back-end",
              msg: "Възникна грешка при зареждане на данни",
            });
          }
        })();
      } else {
        (async () => {
          try {
            const n = await calendarService.getOneNote(noteId, user);
            setNote((state) => ({
              ...n,
            }));
          } catch (error) {
            loadError({
              origin: "back-end",
              msg: "Възникна грешка при зареждане на данни",
            });
          }
        })();
      }
    }
    setLastDay(new Date(note.year, note.month, 0).getDate());
    setFirstDay(new Date(note.year, note.month, 1).getDate());
  }, [pickedDay]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkDate = new Date(note.year, note.month - 1, note.day);
    const correctDate = checkDate.getMonth() + 1 === Number(note.month);
    if (
      note.year !== "" &&
      note.month !== "" &&
      note.day !== "" &&
      correctDate &&
      note.title.length >= 4 &&
      ((note.title.length <= 20 && !isAdmin) || isAdmin)
    ) {
      startLoading();
      const data = { ...note };
      try {
        if (noteId) {
          if (isAdmin) {
            const result = await calendarService.updateCalNote(
              { ...note, creator: user._id },
              noteId,
              user
            );
            updateNotes(noteId, result.note, noteType);
          } else {
            const result = await calendarService.updateNote(
              { ...note, owner: user._id },
              noteId,
              user
            );
            updateNotes(noteId, result.note, noteType);
          }
        } else {
          if (isAdmin) {
            const result = await calendarService.createHoliday(
              { ...note },
              user
            );
            updateNotes(result, noteType);
          } else {
            const result = await calendarService.createNote(data, user);
            updateNotes(result, noteType);
          }
        }
      } catch (error) {
        loadError({
          origin: "back-end",
          msg: "Възникна грешка при обработка на данните",
        });
      }
      navigate("/calendar");
      changeCalendarClass('calendar');
    } else {
      if (!correctDate) {
        loadError({
          origin: "back-end",
          msg: "Въведената дата не е правилна",
        });
      } else {
        loadError({
          origin: "back-end",
          msg: "Невалидни заглавие или описание",
        });
      }
    }
  };

  const onChangeMonth = (e) => {
    let valueMonth = e.target.value;
    if (valueMonth > 12) {
      valueMonth = 1;
    }
    if (valueMonth <= 0) {
      valueMonth = "";
    }
    setNote((state) => ({
      ...state,
      month: valueMonth,
    }));
    setLastDay(
      new Date(note.year, valueMonth == 12 ? 1 : valueMonth, 0).getDate()
    );
    setFirstDay(
      new Date(note.year, valueMonth == 12 ? 1 : valueMonth, 1).getDate()
    );
  };

  const onChangeTitle = (e) => {
    if (e.target.value.length < 4) {
      setTitleLabel("кратко заглавие");
      setTitleLabelClass("note-form-title incorrect");
    } else if (e.target.value.length > 20 && !isAdmin) {
      setTitleLabel("твърдо дълго заглавие");
      setTitleLabelClass("note-form-title incorrect");
    } else {
      setTitleLabel("заглавие");
      setTitleLabelClass("note-form-title");
    }
    setNote((state) => ({
      ...state,
      title: e.target.value,
    }));
  };
  const onChangeDescription = (e) => {
    if (e.target.value.length < 4) {
      setDescriptionLabel("кратко описание");
      setDescriptionLabelClass("note-form-description incorrect");
    } else {
      setDescriptionLabel("описание");
      setDescriptionLabelClass("note-form-description");
    }
    setNote((state) => ({
      ...state,
      description: e.target.value,
    }));
  };

  const onChangeYear = (e) => {
    let valueYear = e.target.value;
    if (!isNaN(valueYear)) {
      if (valueYear.length <= 4) {
        setNote((state) => ({
          ...state,
          year: valueYear,
        }));
      }
      setLastDay(
        new Date(valueYear, note.month == 12 ? 1 : note.month, 0).getDate()
      );
      setFirstDay(
        new Date(valueYear, note.month == 12 ? 1 : note.month, 1).getDate()
      );
    }
  };

  const onChangeDay = (e) => {
    let valueDay = e.target.value;
    if (!isNaN(valueDay)) {
      if (valueDay <= 0) {
        valueDay = "";
      }
      if (valueDay > lastDay) {
        valueDay = firstDay;
      }
      setNote((state) => ({
        ...state,
        day: valueDay,
      }));
    }
  };

  const onChangeHour = (e) => {
    let valueHour = e.target.value;
    if (!isNaN(valueHour) && valueHour.length <= 2) {
      if (valueHour < 0) {
        valueHour = "";
      }
      if (valueHour > 23) {
        valueHour = 0;
      }
      setNote((state) => ({
        ...state,
        hour: valueHour,
      }));
    }
  };
  const onChangeMinutes = (e) => {
    let valueMinutes = e.target.value;
    if (!isNaN(valueMinutes) && valueMinutes.length <= 2) {
      if (valueMinutes < 0) {
        valueMinutes = "";
      }
      if (valueMinutes > 59) {
        valueMinutes = 0;
      }
      setNote((state) => ({
        ...state,
        minutes: valueMinutes,
      }));
    }
  };

  return (
    <div className="calendar-notes note-blank-container">
      <form onSubmit={handleSubmit}>
        <div className={titleLabelClass}>
          <label htmlFor="note-blank-title">{titleLabel}</label>
          <br />
          <input
            onChange={onChangeTitle}
            type="text"
            className="note-blank-text"
            id="note-blank-title"
            placeholder=""
            name="title"
            value={note.title}
          />
        </div>
        <div className={descriptionLabelClass}>
          <label htmlFor="note-blank-description">{descriptionLabel}</label>
          <textarea
            onChange={onChangeDescription}
            className="note-blank-textarea"
            id="note-blank-description"
            placeholder=""
            rows="12"
            name="description"
            value={note.description}
          ></textarea>
        </div>
        <div className="note-blank-numbers">
          <div>
            <label htmlFor="note-blank-year">година</label>
            <br />
            <input
              onChange={onChangeYear}
              type="text"
              className="note-blank-number"
              id="note-blank-year"
              placeholder=""
              name="year"
              value={note.year}
            />
          </div>
          <div>
            <label htmlFor="note-blank-month">месец</label>
            <br />
            <input
              onChange={onChangeMonth}
              type="text"
              className="note-blank-number"
              id="note-blank-month"
              placeholder=""
              name="month"
              value={note.month}
            />
          </div>
          <div>
            <label htmlFor="note-blank-day">ден</label>
            <br />
            <input
              onChange={onChangeDay}
              type="text"
              className="note-blank-number"
              id="note-blank-day"
              placeholder=""
              name="day"
              value={note.day}
            />
          </div>
          {!isAdmin ? (
            <>
              <div>
                <label htmlFor="note-blank-hour">час</label>
                <br />
                <input
                  onChange={onChangeHour}
                  type="text"
                  className="note-blank-number"
                  id="note-blank-hour"
                  placeholder=""
                  name="hour"
                  value={note.hour}
                />
              </div>
              <div>
                <label htmlFor="note-blank-minutes">минути</label>
                <br />
                <input
                  onChange={onChangeMinutes}
                  type="text"
                  className="note-blank-number"
                  id="note-blank-minutes"
                  placeholder=""
                  name="minutes"
                  value={note.minutes}
                />
            </div>
            </>
          ) : null}
        </div>
        <div className="note-form-buttons">
          <input
            className="back-btn"
            value={"Отказ"}
            onClick={() => {
              navigate("/calendar");
              changeCalendarClass('calendar');
            }}
          />
          <input
            className="create-btn"
            type="submit"
            value="Запис"
          />
        </div>
      </form>
    </div>
  );
}

export default NoteBlank;
