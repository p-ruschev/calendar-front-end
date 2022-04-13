import { React } from "react";
import { Link, useNavigate } from "react-router-dom";

import Search from "../../../Search/Search.js";
import "./LoggedMenu.css";
import { useAuth } from "../../../../contexts/AuthContext";

function LoggedMenu({ pathname, loadResult }) {
  const { user, logout } = useAuth();

  return (
    <div className="sub-menu">
      {pathname.includes("calendar") ? (
        <Search loadResult={loadResult} />
      ) : null}
      <div className="logged-buttons">
        <div className="profile">{user.email}</div>
        <div className="logout" onClick={() => logout()}>
          Изход
        </div>
      </div>
    </div>
  );
}

export default LoggedMenu;
