import { isAuth } from "../../hoc/isAuth.js";
import NoteBlank from "./NoteBlank.js";

const CreateNote = isAuth(NoteBlank);

export default CreateNote;
