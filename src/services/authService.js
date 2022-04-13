import * as requests from "../utils/requests.js";

const host = "https://calendar-notes-node.herokuapp.com";

requests.settings.host = host;

export const login = requests.login;
export const register = requests.register;
export const logout = requests.logout;
