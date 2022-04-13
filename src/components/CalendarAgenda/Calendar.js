import { useState, useEffect } from "react";
import { useNavigate, Routes, Route, useSearchParams } from "react-router-dom";

import "./CalendarAgenda.css";

import { MONTHS, DAYS } from "../../utils/constants.js";
import { useHeader } from "../../contexts/HeaderContext.js";

function Calendar({
  year,
  month,
  monthAgenda,
  today,
  changePickedDay,
  changeMonth,
}) {
  const [weeks, setWeeks] = useState([]);
  const { loadResult, searchResult } = useHeader();

  useEffect(() => {
    populateWeeks();
  }, [monthAgenda]);

  useEffect(() => {
    if (searchResult.notes) {
      const clearedWeeks = [];
      weeks.forEach((w) => {
        const newW = [];
        w.forEach((d) => {
          const newD = {};
          if (d.month.includes("picked")) {
            Object.assign(newD, {
              month: d.month.replace(" picked", ""),
              day: d.day,
            });
          } else {
            Object.assign(newD, d);
          }
          newW.push(newD);
        });
        clearedWeeks.push(newW);
      });
      setWeeks(clearedWeeks);
    }
  }, [searchResult]);

  function previousMonth() {
    let m = month;
    let y = year;
    m--;
    if (m < 0) {
      m = 11;
      y--;
    }
    changeMonth(m, y);
  }

  function nextMonth() {
    let m = month;
    let y = year;
    m++;
    if (m > 11) {
      m = 0;
      y++;
    }
    changeMonth(m, y);
  }

  function pickDate(e) {
    //const month = pickedDate.m;
    loadResult({});
    const day = e.target.getAttribute("day");
    if (e.target.classList.contains("this-month")) {
      const clearedWeeks = [];
      weeks.forEach((w) => {
        const newW = [];
        w.forEach((d) => {
          const newD = {};
          if (d.month.includes("picked")) {
            Object.assign(newD, {
              month: d.month.replace(" picked", ""),
              day: d.day,
            });
          } else {
            Object.assign(newD, d);
          }
          if (d.month.includes("this-month") && d.day == day && !d.month.includes('picked')) {
            Object.assign(newD, { month: d.month + " picked", day: d.day });
          }
          newW.push(newD);
        });
        clearedWeeks.push(newW);
      });

      setWeeks(clearedWeeks);
      changePickedDay(Number(e.target.getAttribute("day")));
    }
  }

  function populateWeeks() {
    const days = [];
    let week = [];
    const structuredDays = [];
    const firstDay = new Date(year, month, 1).getDay();
    const currentDay = new Date().getDate();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const otherMonthsDays = 42 - lastDay - firstDay + 1;
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    if (firstDay === 0) {
      for (let i = prevMonthLastDay; i > prevMonthLastDay - 6; i--) {
        days.unshift({ month: "calendar-day other-month", day: i });
      }
      for (let i = 1; i <= lastDay; i++) {
        if (i === today.d && year === today.y && month === today.m) {
          days.push({ month: "calendar-day this-month current-day", day: i });
        } else {
          days.push({ month: "calendar-day this-month", day: i });
        }
      }
      for (let i = 1; i <= otherMonthsDays; i++) {
        days.push({ month: "calendar-day other-month", day: i });
      }
    } else if (firstDay === 1) {
      for (let i = prevMonthLastDay; i > prevMonthLastDay - 7; i--) {
        days.unshift({ month: "calendar-day other-month", day: i });
      }
      for (let i = 1; i <= lastDay; i++) {
        if (i === today.d && year === today.y && month === today.m) {
          days.push({ month: "calendar-day this-month current-day", day: i });
        } else {
          days.push({ month: "calendar-day this-month", day: i });
        }
      }
      for (let i = 1; i <= otherMonthsDays; i++) {
        days.push({ month: "calendar-day other-month", day: i });
      }
    } else {
      for (let i = prevMonthLastDay; i > prevMonthLastDay - firstDay + 1; i--) {
        days.unshift({ month: "calendar-day other-month", day: i });
      }
      for (let i = 1; i <= lastDay; i++) {
        if (i === today.d && year === today.y && month === today.m) {
          days.push({ month: "calendar-day this-month current-day", day: i });
        } else {
          days.push({ month: "calendar-day this-month", day: i });
        }
      }
      for (let i = 1; i <= otherMonthsDays; i++) {
        days.push({ month: "calendar-day other-month", day: i });
      }
    }
    for (let i = 0; i < 42; i++) {
      week.push(days[i]);
      if ((i + 1) % 7 === 0) {
        structuredDays.push(week);
        week = [];
      }
    }
    setWeeks(structuredDays);
  }

  function checkCalPreview(type, d) {
    if (type === "holidays") {
      const todaysHolidays = monthAgenda.agenda?.holidays.filter(
        (x) => x.day == d.day
      );
      if (todaysHolidays?.length > 0 && d.month.includes("this-month")) {
        return todaysHolidays.length;
      } else {
        return "";
      }
    }
    if (type === "notes") {
      const todaysNotes = monthAgenda.agenda?.notes.filter(
        (x) => x.day == d.day
      );
      if (todaysNotes?.length > 0 && d.month.includes("this-month")) {
        return todaysNotes.length;
      } else {
        return "";
      }
    }
  }

  return (
    <>
      <div className="calendar-head">
        <span className="cal-btn-l" onClick={previousMonth}>
          &lt;
        </span>
        <div className="month-year">
          {MONTHS[month]}&nbsp;&nbsp;{year}
        </div>
        <span className="cal-btn-r" onClick={nextMonth}>
          &gt;
        </span>
      </div>
      <div className="calendar-day-names">
        {DAYS.map((t, i) => (
          <div key={i} className="calendar-day-name">
            {t}
          </div>
        ))}
      </div>
      <div className="calendar-days" onTouchStart={pickDate} onMouseUp={pickDate}>
        {weeks.map((w, i) => (
          <div key={i} className="calendar-week">
            {w.map((d, i) => (
              <div key={i} className={d.month} day={d.day}>
                <div className="day-number">{d.day}</div>
                <div className="calendar-previews">
                  <div className="holiday-preview">
                    {checkCalPreview("holidays", d)}
                  </div>
                  <div className="notes-preview">
                    {checkCalPreview("notes", d)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Calendar;
