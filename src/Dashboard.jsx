import React from "react";
import { useNavigate } from "react-router-dom";

// Szabadságtípusok kártyaadatai
const szabadsagok = [
  {
    nev: "Fizetett szabadság",
    kod: "F",
    elerheto: 2,
    felhasznalt: 1,
    szin: "turquoise"
  },
  {
    nev: "Beteg szabadság",
    kod: "B",
    elerheto: 0,
    felhasznalt: 0,
    szin: "green"
  },
  {
    nev: "Home office",
    kod: "O",
    elerheto: 0,
    felhasznalt: 0,
    szin: "red"
  }
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <section className="dashboard">
      <div className="summary-card">
        <h2>Üdv, Mihályi Balázs</h2>
        <p>Önnek még <strong>16 nap</strong> szabadsága van erre az évre!</p>
        <div className="button-group">
          <button className="btn" onClick={() => navigate("/holiday")}>
            + Új kérelem
          </button>
          <button className="btn" onClick={() => navigate("/requests")}>
            Kérelmek megtekintése
          </button>
        </div>
      </div>

      <div className="status-cards">
        {szabadsagok.map((tipus) => {
          const arany = tipus.elerheto + tipus.felhasznalt > 0
            ? (tipus.felhasznalt / (tipus.elerheto + tipus.felhasznalt)) * 100
            : 0;

          return (
            <div
              className="card"
              key={tipus.kod}
              style={{ border: `2px solid ${tipus.szin}` }}
            >
              <h3>{tipus.nev}</h3>
              <p className="status-text">
                {tipus.elerheto} elérhető | {tipus.felhasznalt} felhasználva
              </p>
              <div className="progress-bar">
                <div
                  style={{
                    width: `${arany}%`,
                    backgroundColor: tipus.szin
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Dashboard;
