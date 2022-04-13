import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext.js";

export const isAdmin = (Component) => {
  const WrapperComponent = (props) => {
    const { isAdmin, user } = useAuth();

    return isAdmin ? (
      <Component
        {...props}
        isAdmin={isAdmin}
        noteType="calendarNote"
        user={user}
      />
    ) : (
      <Navigate to="/" />
    );
  };
  return WrapperComponent;
};
