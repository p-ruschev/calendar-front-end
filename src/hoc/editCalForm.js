import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export const editCalForm = (Component) => {
  const WrapperComponent = (props) => {
    const { noteId } = useParams();

    return <Component {...props} noteId={noteId} />;
  };
  return WrapperComponent;
};
