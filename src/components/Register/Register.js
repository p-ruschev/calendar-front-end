import { isGuest } from "../../hoc/isGuest.js";
import AuthForm from "../AuthForm/AuthForm.js";

const Register = isGuest(AuthForm);

export default Register;
