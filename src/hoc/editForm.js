import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

//import { useAuth } from "../contexts/AuthContext.js"

export const editForm = (Component) => {
  const WrapperComponent = (props) => {
    const { noteId } = useParams();

    return <Component {...props} noteId={noteId} />;
  };
  return WrapperComponent;
};
