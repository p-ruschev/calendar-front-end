import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import * as calendarService from "../../services/calendarService.js";
import { useAuth } from "../../contexts/AuthContext.js";
import { useHeader } from "../../contexts/HeaderContext.js";
import { ReactComponent as ZoomIcon } from "../assets/profile.svg";
import Result from "./Result.js";
import "./Search.css";

const currentDate = new Date();
let d = currentDate.getDate();
let m = currentDate.getMonth();
let y = currentDate.getFullYear();

function Search({ loadResult }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [lastDay, setLastDay] = useState(0);
  const [firstDay, setFirstDay] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams({});

  const { user } = useAuth();
  const { startLoading, mobileSearch } = useHeader();
  const navigate = useNavigate();

  useEffect(() => {
    setLastDay(new Date(y, m + 1 == 12 ? 1 : m + 1, 0).getDate());
    setFirstDay(new Date(y, m + 1 == 12 ? 1 : m + 1, 1).getDate());
  }, []);

  function onChangeTitle(e) {
    setTitle(e.target.value);
    setSearchParams({ title: e.target.value, day, month, year });
  }

  const onChangeYear = (e) => {
    if (!isNaN(e.target.value) && e.target.value.length <= 4) {
      setYear(e.target.value);
      y = e.target.value;
      setSearchParams({ title, year: e.target.value, month, day });
    }
  };
  const onChangeMonth = (e) => {
    let monthValue = e.target.value;
    if (monthValue === "" || monthValue === "0") {
      setMonth("");
    } else if (!isNaN(monthValue) && monthValue <= 12 && monthValue >= 1) {
      setMonth(
        monthValue < 10 ? ("0" + monthValue).slice(-2) : monthValue.slice(-2)
      );
      setLastDay(new Date(y, monthValue == 12 ? 1 : monthValue, 0).getDate());
      setFirstDay(
        new Date(year, monthValue == 12 ? 1 : monthValue, 1).getDate()
      );
      setSearchParams({ title, year, month: monthValue, day });
    } else {
      setMonth(0);
    }
  };

  const onChangeDay = (e) => {
    let valueDay = e.target.value;
    if (valueDay === "" || valueDay === "0") {
      setDay("");
    } else {
      if (!isNaN(valueDay) || valueDay.length === 2) {
        if (valueDay <= 0) {
          valueDay = lastDay;
        }
        if (valueDay > lastDay) {
          valueDay = firstDay;
        }
        setDay(valueDay < 10 ? ("0" + valueDay).slice(-2) : valueDay.slice(-2));
        setSearchParams({ title, year, month, day: valueDay });
      }
    }
  };
  async function handleSearch(e) {
    if (open === false) {
      setOpen(true);
      mobileSearch("left-nav mobile-search");
      navigate("/calendar/search");
    } else {
      if (title !== "" || year !== "" || month !== "" || day !== "") {
        startLoading();
        const result = await calendarService.searchNotes(
          title,
          year,
          month,
          day,
          user
        );
        loadResult(result);
        setTitle("");
        setYear("");
        setMonth("");
        setDay("");
        navigate("/calendar");
        mobileSearch("left-nav");
        setOpen(false);
      } else {
        navigate("/calendar");
        mobileSearch("left-nav");
        setOpen(false);
      }
    }
  }

  return (
    <div className="search">
      <label htmlFor="search-bar" onClick={handleSearch}>
        <ZoomIcon className="zoom-icon" />
      </label>
      {open && (
        <>
          <input
            id="search-bar"
            onKeyDown={(e) => (e.key === "Enter" ? handleSearch(e) : null)}
            onChange={onChangeTitle}
            value={title}
            placeholder="заглавие?"
            className="search-bar"
          />
          <input
            className="search-year"
            id="search-year"
            onKeyDown={(e) => (e.key === "Enter" ? handleSearch(e) : null)}
            onChange={onChangeYear}
            value={year}
            placeholder="гггг?"
            className="search-year"
          />
          <input
            className="search-month"
            id="search-month"
            onKeyDown={(e) => (e.key === "Enter" ? handleSearch(e) : null)}
            onChange={onChangeMonth}
            value={month}
            placeholder="мм?"
            className="search-month"
          />
          <input
            className="search-day"
            id="search-day"
            onKeyDown={(e) => (e.key === "Enter" ? handleSearch(e) : null)}
            onChange={onChangeDay}
            value={day}
            placeholder="дд?"
            className="search-day"
          />
        </>
      )}
    </div>
  );
}
export default Search;
