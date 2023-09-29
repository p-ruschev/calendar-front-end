import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from "../services/authService.js";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { useError } from "./ErrorContext.js";

export const AuthContext = createContext();

const initialState = {
  _id: "",
  email: "",
  accessToken: "",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", initialState);
  const [authError, setAuthError] = useState("");
  const { loadError } = useError();

  const navigate = useNavigate();

  const login = async (email, password) => {
    authService
      .login(email, password)
      .then((authData) => {
        setUser(authData);
        navigate("/");
      })
      .catch((err) => {
        loadError({
          origin: "client",
          msg: "Грешна парола или имейл",
        });
      });
  };
  const register = async (email, password) => {
    authService
      .register(email, password)
      .then((authData) => {
        setUser(authData);
      })
      .catch((err) => {
        loadError({
          origin: "client",
          msg: "Профилът вече съществува",
        });
      });
  };
  const logout = async () => {
    authService
      .logout()
      .then((res) => {
        setUser(initialState);
        navigate("/");
      })
      .catch((err) => {
        loadError({
          origin: "back-end",
          msg: "Възникна грешка при отписване",
        });
      });
  };

  const isAuthenicated = Boolean(user.email);
  const isAdmin = Boolean(user.role === "admin");

  return (
    <AuthContext.Provider
      value={{
        authError,
        user,
        login,
        register,
        logout,
        isAdmin,
        isAuthenicated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authState = useContext(AuthContext);

  return authState;
};
