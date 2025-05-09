import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "./Dashboard";
import CalendarSection from "./Calendar";
import RequestsTable from "./Requests";
import Profile from "./Profile";
import Munkabajaras from "./Munkabajaras";
import HolidayPage from "./HolidayPage";
import RequestsPage from "./RequestsPage";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Header />
                  <Dashboard />
                  <div className="content">
                    <CalendarSection />
                    <RequestsTable />
                  </div>
                </div>
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/munkabajaras" element={<Munkabajaras />} />
            <Route path="/holiday" element={<HolidayPage />} />
            <Route path="/requests" element={<RequestsPage />} />
            <Route path="*" element={<h2>Az oldal nem található</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
