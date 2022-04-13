import { isGuest } from "../../hoc/isGuest.js";
import AuthForm from "../AuthForm/AuthForm.js";

const Login = isGuest(AuthForm);

export default Login;
