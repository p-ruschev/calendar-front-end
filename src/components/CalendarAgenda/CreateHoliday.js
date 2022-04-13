import { isAdmin } from "../../hoc/isAdmin.js";
import NoteBlank from "./NoteBlank.js";

const CreateHoliday = isAdmin(NoteBlank);

export default CreateHoliday;
