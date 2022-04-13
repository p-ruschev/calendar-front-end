import { useAuth } from "../contexts/AuthContext.js";

export const customNote = (Component) => {
  const WrapperComponent = (props) => {
    const { user } = useAuth();

    const noteType = "customNote";

    return <Component {...props} user={user} noteType={noteType} />;
  };
  return WrapperComponent;
};
