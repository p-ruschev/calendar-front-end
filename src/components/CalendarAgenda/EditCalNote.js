import { isAdmin } from "../../hoc/isAdmin.js";
import { editCalForm } from "../../hoc/editCalForm.js";
import NoteBlank from "./NoteBlank.js";

const EditCalNote = editCalForm(isAdmin(NoteBlank));

export default EditCalNote;
