import * as requests from "../utils/requests.js";

const host = "https://calendar-back-end.onrender.com";

export const createHoliday = (data, user) => {
  return requests.post(host + "/calendar/create-holiday", data, user);
};
export const createNote = (data, user) => {
  return requests.post(host + "/calendar/create-note", data, user);
};

export const deleteCustomNote = (noteId, user) => {
  return requests.del(host + "/calendar/delete-custom-note/" + noteId, user);
};

export const deleteCalendarNote = (noteId, user) => {
  return requests.del(host + "/calendar/delete-calendar-note/" + noteId, user);
};

export const updateNote = (data, noteId, user) => {
  return requests.put(
    host + "/calendar/edit-custom-note/" + noteId,
    data,
    user
  );
};

export const updateCalNote = (data, noteId, user) => {
  return requests.put(
    host + "/calendar/edit-calendar-note/" + noteId,
    data,
    user
  );
};

export const getAll = () => {
  return requests.get(host + "/posters/all");
};
export const getMonthAgenda = (url, user) => {
  return requests.get(host + "/calendar?" + url, user);
};
export const getOneNote = async (noteId, user) => {
  const result = await requests.get(
    host + "/calendar/edit-custom-note/" + noteId,
    user
  );
  return result;
};
export const getOneCalNote = async (noteId, user) => {
  const result = await requests.get(
    host + "/calendar/edit-calendar-note/" + noteId,
    user
  );
  return result;
};
export const searchNotes = (title, year, month, day, user) => {
  return requests.get(
    host +
      "/calendar/search?title=" +
      title +
      "&year=" +
      year +
      "&month=" +
      month +
      "&day=" +
      day,
    user
  );
};
