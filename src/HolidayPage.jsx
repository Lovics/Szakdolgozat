import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './HolidayPage.css';
import { useNavigate } from "react-router-dom";

const HolidayPage = () => {
  // Állapotok a kijelölt dátumhoz, megjelenítéséhez és a választott típushoz
  const [selectedRange, setSelectedRange] = useState([null, null]); // Dátumtartomány
  const [showTypeModal, setShowTypeModal] = useState(false);        // Típusválasztó 
  const [selectedType, setSelectedType] = useState("");             // Kiválasztott szabadságtípus
  const navigate = useNavigate();

  // A dátumtartomány (formázás: yyyy-mm-dd)
  const normalizeRange = (range) => {
    if (Array.isArray(range)) {
      const [start, end] = range;
      const normalizedStart = `${start.getFullYear()}-${(start.getMonth() + 1).toString().padStart(2, '0')}-${start.getDate().toString().padStart(2, '0')}`;
      const normalizedEnd = end
        ? `${end.getFullYear()}-${(end.getMonth() + 1).toString().padStart(2, '0')}-${end.getDate().toString().padStart(2, '0')}`
        : normalizedStart; // Ha csak egy nap van kijelölve
      return [normalizedStart, normalizedEnd];
    }
    return [null, null];
  };

  // Új kérelem mentése vagy véglegesítése localStorage-be
  const saveRequest = (isFinal = false) => {
    const [start, end] = normalizeRange(selectedRange);

    const newRequest = {
      id: `TVL-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`, // Egyedi azonosító
      type: selectedType,
      start,
      end,
      days: Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)) + 1, // Napok száma
      allapot: isFinal ? "Véglegesített" : "Mentett", // Kérelem állapota
      reviewer: "Kis Pista" //elbíráló
    };

    const existingRequests = JSON.parse(localStorage.getItem("requests")) || [];
    localStorage.setItem("requests", JSON.stringify([...existingRequests, newRequest]));
  };

  // Beküldés gombra kattintás 
  const handleSubmit = () => {
    const [start] = normalizeRange(selectedRange);
    if (!start) {
      alert("Kérlek jelölj ki egy kezdő- és végdátumot!");
      return;
    }
    setShowTypeModal(true);
  };

  // Véglegesítés gombra kattintás
  const handleFinalSubmit = () => {
    saveRequest(true);             // Mentés véglegesítve
    alert("A kérelmed véglegesítve!");
    setShowTypeModal(false);      
    setSelectedType("");          
    navigate("/requests");        
  };

  // Mentés (nem végleges)
  const handleSave = () => {
    saveRequest(false);
    alert("A kérelem elmentve!");
    setShowTypeModal(false);
    setSelectedType("");
  };

  return (
    <div className="holiday-container">
      <h1 className="holiday-heading">Távollét Igénylése</h1>

      <div className="calendar-wrapper">
        {/* React Calendar komponens – dátumtartomány kijelölése */}
        <Calendar
          selectRange={true}
          onChange={setSelectedRange}
          value={selectedRange}
          locale="hu-HU"
          className="full-calendar"
        />

        {/* Gombok a kérelem beküldéséhez vagy megtekintéshez */}
        <button className="submit-button" onClick={handleSubmit}>
          Igény beküldése
        </button>

        <button
          className="view-requests-button"
          onClick={() => navigate("/requests")}
        >
          Beküldött kérelmek
        </button>
      </div>

      {/*  szabadságtípus kiválasztás */}
      {showTypeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowTypeModal(false)}>×</button>
            <h2>Távollét típusa</h2>

            {/* Szabadságtípus kiválasztó legördülő */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">-- Válassz típust --</option>
              <option value="F">Fizetett szabadság</option>
              <option value="E">Fizetett előző évi szabadság</option>
              <option value="T">Tanulmányi szabadság</option>
              <option value="J">Jutalomszabadság</option>
              <option value="I">Fizetés nélküli igazolt távollét</option>
              <option value="B">Betegszabadság</option>
              <option value="H">Igazolatlan távollét</option>
              <option value="A">Apanap</option>
              <option value="O">Home office</option>
            </select>

           
            <div className="modal-actions">
              <button className="save-button" onClick={handleSave} disabled={!selectedType}>
                Mentés
              </button>
              <button className="confirm-button" onClick={handleFinalSubmit} disabled={!selectedType}>
                Véglegesítés
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HolidayPage;
