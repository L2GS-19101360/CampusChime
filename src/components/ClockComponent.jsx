import React, { useState, useEffect } from "react";
import "./ClockComponentDesign.css"; // Make sure to adjust the import path based on your project structure

const ClockComponent = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const getMeridian = () => {
    const hours = date.getHours();
    return hours >= 12 ? "pm" : "am";
  };
  const currentDay = daysOfWeek[date.getDay()];

  // Format the date as "Month Day, Year"
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

  return (
    <div className="clock-container">
      <div className="days">
        {daysOfWeek.map((day, index) => (
          <div className="day" key={index}>
            <p className={`${day} ${currentDay === day ? "active" : ""}`}>
              {day}
            </p>{" "}
          </div>
        ))}
      </div>
      <div className="clock">
        {/* HOUR */}
        <div className="numbers">
          <p className={`hours light-on`}>{date.getHours()}</p>
          <p className="placeholder">88</p>
        </div>
        <div className="colon">
          <p>:</p>
        </div>
        {/* MINUTE */}
        <div className="numbers">
          <p className={`minutes light-on`}>{date.getMinutes()}</p>
          <p className="placeholder">88</p>
        </div>
        <div className="colon">
          <p>:</p>
        </div>
        {/* SECOND */}
        <div className="numbers">
          <p className={`seconds light-on`}>{date.getSeconds()}</p>
          <p className="placeholder">88</p>
        </div>
        {/* AM / PM */}
        <div className="am-pm">
          <div>
            <p
              className={`am light-on ${
                getMeridian() === "am" ? "active" : ""
              }`}
            >
              am
            </p>
          </div>
          <div>
            <p
              className={`pm light-on ${
                getMeridian() === "pm" ? "active" : ""
              }`}
            >
              pm
            </p>
          </div>
        </div>
      </div>
      <p
        className="light-on "
        style={{ color: "#0203dd", fontWeight: "bold",  }}
      >
        {formattedDate}
      </p>
    </div>
  );
};

export default ClockComponent;
