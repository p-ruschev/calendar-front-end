import * as requests from "../utils/requests.js";

const host = "https://calendar-back-end.onrender.com";

requests.settings.host = host;

export const login = requests.login;
export const register = requests.register;
export const logout = requests.logout;
