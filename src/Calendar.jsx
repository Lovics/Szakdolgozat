import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

function CalendarSection() {
  const [date, setDate] = useState(new Date()); // Jelenleg kiválasztott dátum
  const [markedDates, setMarkedDates] = useState({}); // Megjelölt napok színkódokkal
  const [showYearlyView, setShowYearlyView] = useState(false); // Éves nézet állapota (nincs jelenleg használva)

  // Betölti a szabadságokat a localStorage-ből és színkódolja a napokat
  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    const newMarkedDates = {};

    storedRequests.forEach((req) => {
      const start = new Date(req.start);
      const end = new Date(req.end);
      const current = new Date(start);

      // A megadott intervallum minden napját bejárjuk
      while (current <= end) {
        const dateKey = current.toDateString(); // Kulcs a színezéshez (pl. "Mon May 06 2025")
        let color = "";

        // Szabadságtípushoz tartozó szín hozzárendelése
        switch (req.type) {
          case "F": color = "turquoise"; break;
          case "E": color = "lightblue"; break;
          case "T": color = "purple"; break;
          case "J": color = "orange"; break;
          case "I": color = "gray"; break;
          case "B": color = "green"; break;
          case "H": color = "black"; break;
          case "A": color = "yellow"; break;
          case "O": color = "red"; break;
          default: break;
        }

        newMarkedDates[dateKey] = color;
        current.setDate(current.getDate() + 1); // Következő napra lépés
      }
    });

    setMarkedDates(newMarkedDates);
  }, []);

  return (
    <>
      <div className="calendar-container">
        <div className="calendar-content">
          <div className="calendar-header">
            <h3>Közeledő szabadságok</h3>
            {/* (Jövőbeli funkció) Éves nézet megnyitása */}
            <button className="year-view-btn" onClick={() => setShowYearlyView(true)}>
              Éves nézet
            </button>
          </div>

          {/* Naptár megjelenítése + színezés beállítása */}
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={({ date }) => markedDates[date.toDateString()] || ""}
          />
        </div>

        {/* Szabadságtípusok színmagyarázata (jelmagyarázat) */}
        <div className="calendar-legend">
          <div className="legend-item"><span className="color-box turquoise"></span> - Fizetett szabadság</div>
          <div className="legend-item"><span className="color-box lightblue"></span> - Előző évi fizetett szabadság</div>
          <div className="legend-item"><span className="color-box purple"></span> - Tanulmányi szabadság</div>
          <div className="legend-item"><span className="color-box orange"></span> - Jutalomszabadság</div>
          <div className="legend-item"><span className="color-box gray"></span> - Fizetés nélküli igazolt távollét</div>
          <div className="legend-item"><span className="color-box green"></span> - Betegszabadság</div>
          <div className="legend-item"><span className="color-box black"></span> - Igazolatlan távollét</div>
          <div className="legend-item"><span className="color-box yellow"></span> - Apanap</div>
          <div className="legend-item"><span className="color-box red"></span> - Home office</div>
        </div>
      </div>
    </>
  );
}

export default CalendarSection;

