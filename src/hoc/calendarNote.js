import { useAuth } from "../contexts/AuthContext.js";

export const calendarNote = (Component) => {
  const WrapperComponent = (props) => {
    const { user } = useAuth();

    return (
      <Component
        {...props}
        user={user}
        noteType="calendarNote"
        userRole={user.role}
      />
    );
  };
  return WrapperComponent;
};
