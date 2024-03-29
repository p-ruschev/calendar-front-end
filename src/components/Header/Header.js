import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

import GuestMenu from "./subComponents/GuestMenu/GuestMenu";
import LoggedMenu from "./subComponents/LoggedMenu/LoggedMenu";
import { useAuth } from "../../contexts/AuthContext";
import { useHeader } from "../../contexts/HeaderContext";
import { useError } from "../../contexts/ErrorContext";
import "./Header.css";

function Header() {
  const { user } = useAuth();
  const { error, clearError } = useError();
  const { load, loadResult, errorLoading, navStyleSearch } = useHeader();
  const { pathname } = useLocation();

  useEffect(() => {
    if (error.origin === "back-end") {
      errorLoading();
      setTimeout(() => {
        clearError();
      }, 3000);
    }
  }, [error]);

  return (
    <div className="header">
      <div className="navbar">
        <div className={navStyleSearch}>
          <Link to="/calendar">Календар</Link>
          {pathname.includes("calendar") || pathname.includes("about") ? (
            <Link to="/">Начало</Link>
          ) : (
            <Link to="/about">Автор</Link>
          )}
        </div>
        {error.origin === "back-end" && (
          <div className="header-error-msg">{error.msg}</div>
        )}
        {Boolean(user.email) ? (
          <LoggedMenu pathname={pathname} loadResult={loadResult} />
        ) : (
          <GuestMenu />
        )}
      </div>
      <div className={load}></div>
    </div>
  );
}

export default Header;
