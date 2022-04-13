import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext.js";

export const isAuth = (Component) => {
  const WrapperComponent = (props) => {
    const { isAuthenicated, user } = useAuth();

    return isAuthenicated ? (
      <Component {...props} noteType="customNote" user={user} />
    ) : (
      <Navigate to="/login" />
    );
  };
  return WrapperComponent;
};
