import { isAuth } from "../../hoc/isAuth.js";
import { editForm } from "../../hoc/editForm.js";
import NoteBlank from "./NoteBlank.js";

const EditNote = editForm(isAuth(NoteBlank));

export default EditNote;
