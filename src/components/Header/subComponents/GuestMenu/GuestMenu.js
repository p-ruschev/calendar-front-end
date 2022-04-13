import { NavLink } from "react-router-dom";

function GuestMenu() {
  return (
    <div className="guest-menu">
      <NavLink
        className={(navData) => (navData.isActive ? "active-link" : "")}
        to="/register"
      >
        Регистрация
      </NavLink>
      <NavLink
        className={(navData) => (navData.isActive ? "active-link" : "")}
        to="/login"
      >
        Вход
      </NavLink>
    </div>
  );
}

export default GuestMenu;
