import { React } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import Search from "../../../Search/Search.js";
import "./LoggedMenu.css";
import { useAuth } from "../../../../contexts/AuthContext";

function LoggedMenu({ pathname, loadResult }) {
  const { user, logout } = useAuth();

  return (
    <div className="sub-menu">
      {pathname.includes("calendar") && !pathname.includes("create") ? (
        <Search loadResult={loadResult} />
      ) : null}
      <div className="logged-buttons">
        <div className="profile">{user.email}</div>
      <NavLink to="" onClick={() => logout()}>Изход</NavLink>
      </div>
    </div>
  );
}

export default LoggedMenu;
