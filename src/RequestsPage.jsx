import React, { useEffect, useState } from "react";
import "./RequestsPage.css";

// Szabadságtípus kódokhoz tartozó  megnevezések
const szabadsagTipusok = {
  F: "Fizetett szabadság",
  E: "Fizetett előző évi szabadság",
  T: "Tanulmányi szabadság",
  J: "Jutalomszabadság",
  I: "Fizetés nélküli igazolt távollét",
  B: "Betegszabadság",
  H: "Igazolatlan távollét",
  A: "Apanap",
  O: "Home office"
};

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);          // Beküldött kérelmek listája
  const [selectedRequest, setSelectedRequest] = useState(null); // Kattintással kiválasztott kérelem 

  // Kérelmek betöltése a localStorage-ből
  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(storedRequests);
  }, []);

  // Egy kérelem adott kérelem megnyitása
  const handleRequestClick = (request) => {
    setSelectedRequest(request);
  };

  // Mentett kérelem véglegesítése
  const handleFinalize = () => {
    const updatedRequests = requests.map((req) =>
      req.id === selectedRequest.id ? { ...req, allapot: "Véglegesített" } : req
    );
    localStorage.setItem("requests", JSON.stringify(updatedRequests));
    setRequests(updatedRequests);
    setSelectedRequest(null); 
  };

  // Mentett kérelem törlése
  const handleDelete = () => {
    const updatedRequests = requests.filter((req) => req.id !== selectedRequest.id);
    localStorage.setItem("requests", JSON.stringify(updatedRequests));
    setRequests(updatedRequests);
    setSelectedRequest(null); 
  };

  
  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="requests-container">
      <h1>Beküldött kérelmek</h1>

      {/* Táblázat fejléce */}
      <div className="requests-header">
        <span>Azonosító</span>
        <span>Típus</span>
        <span>Kezdet</span>
        <span>Vég</span>
        <span>Napok száma</span>
        <span>Állapot</span>
      </div>

      {/* Kérelmek sorai */}
      {requests.map((request) => (
        <div
          className="request-item"
          key={request.id}
          onClick={() => handleRequestClick(request)}
          style={{ cursor: "pointer" }}
        >
          <span>{request.id}</span>
          <span>{szabadsagTipusok[request.type] || request.type}</span>
          <span>{request.start}</span>
          <span>{request.end}</span>
          <span>{request.days}</span>
          <span>{request.allapot}</span>
        </div>
      ))}

      
      {selectedRequest && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>×</button>

            <h2>{szabadsagTipusok[selectedRequest.type] || selectedRequest.type}</h2>

           
            <p>
              {selectedRequest.start} → {selectedRequest.end} ({selectedRequest.days} nap)
            </p>

            {selectedRequest.allapot === "Mentett" ? (
              <div className="button-group">
                <button className="confirm-button" onClick={handleFinalize}>
                  Véglegesítés
                </button>
                <button className="delete-button" onClick={handleDelete}>
                  Törlés
                </button>
              </div>
            ) : (
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <p><strong>Státusz:</strong> Elfogadásra vár</p>
                <p><strong>Elbíráló:</strong> Kis Pista</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestsPage;
