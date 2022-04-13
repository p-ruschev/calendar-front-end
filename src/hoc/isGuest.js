import { useLocation, Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext.js";

export const isGuest = (Component) => {
  const WrapperComponent = (props) => {
    const { isAuthenicated } = useAuth();
    const { pathname } = useLocation();

    return !isAuthenicated ? (
      <Component {...props} pathname={pathname} />
    ) : (
      <Navigate to="/" />
    );
  };
  return WrapperComponent;
};
