import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Munkabajaras.css";

const Munkabajaras = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="munkabajaras-container">
      <h1 className="munkabajaras-heading">Munkábajárás rögzítése</h1>
      <p>Válassza ki azokat a napokat, amikor autóval utazott:</p>

      <div className="calendar-wrapper">
        <Calendar 
          onChange={setDate} 
          value={date} 
          selectRange={true}
          className="full-calendar"
        />

        <button className="berlet-btn">Bérlet hozzáadása</button>
        <button className="save-btn">Rögzítés</button>
      </div>
    </div>
  );
};

export default Munkabajaras;
