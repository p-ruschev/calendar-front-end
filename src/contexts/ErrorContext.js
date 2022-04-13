import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ErrorContext = createContext();

const initialState = {
  origin: "",
  msg: "",
};

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(initialState);

  const navigate = useNavigate();

  const clearError = () => {
    setError(initialState);
  };

  const loadError = (errorObj) => {
    setError(errorObj);
  };

  return (
    <ErrorContext.Provider value={{ clearError, error, loadError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const errorState = useContext(ErrorContext);

  return errorState;
};
