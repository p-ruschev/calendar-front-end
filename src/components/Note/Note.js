import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Modal from "../Modal/Modal.js";
import * as calendarService from "../../services/calendarService.js";
import { useHeader } from "../../contexts/HeaderContext.js";
import { useError } from "../../contexts/ErrorContext.js";
import { ReactComponent as DeleteIcon } from "./assets/delete.svg";
import { ReactComponent as EditIcon } from "./assets/edit.svg";
import "./Note.css";

function Note({
  editNoteFromAgendaState,
  delNoteFromAgendaState,
  changeCalendarClass,
  note,
  noteType,
  userRole,
  user,
}) {
  const [openDescription, setOpenDescription] = useState(false);
  const [openDelModal, setOpenDelModal] = useState(false);

  const { startLoading } = useHeader();
  const { loadError } = useError();
  const navigate = useNavigate();

  async function handleDel() {
    startLoading();
    setOpenDelModal(false);
    const noteId = note._id;
    let result = {};
    try {
      if (noteType === "customNote") {
        result = await calendarService.deleteCustomNote(noteId, user);
      } else if (noteType === "calendarNote") {
        result = await calendarService.deleteCalendarNote(noteId, user);
      }
      if (result.deletion === true) {
        delNoteFromAgendaState(noteId, noteType);
      }
    } catch (error) {
      loadError({ origin: "back-end", msg: "Възникна грешка при изтриване" });
    }
  }

  return (
    <div className="note-container">
      {openDelModal && (
        <Modal
          acceptModal={handleDel}
          rejectModal={() => setOpenDelModal(false)}
        />
      )}
      <div
        onClick={() => setOpenDescription(!openDescription)}
        className="title-container"
      >
        {noteType === "customNote" &&
        note.hour !== "" &&
        note.minutes !== "" ? (
          <div className="title-time">
            {`${(note.hour <= 9 && note.hour.length < 2) ? "0" + note.hour : note.hour} : ${
              (note.minutes <= 9 && note.minutes.length < 2) ? "0" + note.minutes : note.minutes
            }`}
          </div>
        ) : null}
        {noteType === "calendarNote" && note.search && (
          <div className="search-date-info">{`${note.month}/${note.day}`}</div>
        )}
        {noteType === "customNote" && note.search && (
          <div className="search-date-info">{`${note.year}/${note.month}/${note.day}`}</div>
        )}
        <div
          className="title-title"
          onClick={() => setOpenDescription(!openDescription)}
        >
          {note.title}
        </div>
        {noteType === "customNote" ? (
          <div className="title-buttons">
            <Link
              onClick={() => changeCalendarClass('calendar calendar-mobile')}
              className="title-edit"
              to={`/calendar/edit-custom-note/${note._id}`}
            >
              <EditIcon className="note-icon-edit" />
            </Link>
            <div className="title-delete" onClick={() => setOpenDelModal(true)}>
              <DeleteIcon className="note-icon-delete" />
            </div>
          </div>
        ) : null}
        {userRole === "admin" && noteType === "calendarNote" ? (
          <div className="title-buttons">
            <div className="title-delete" onClick={() => setOpenDelModal(true)}>
              &#128473;
            </div>
          </div>
        ) : null}
      </div>
      {openDescription && (
        <div className="note-description">{note.description}</div>
      )}
    </div>
  );
}

export default Note;
