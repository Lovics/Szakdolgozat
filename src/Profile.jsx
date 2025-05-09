import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-wrapper">
      
      {/* Fejléc külön */}
      <div className="profile-header">
        <h1>Személyes adatok</h1>
      </div>

      {/* Adatok kártya */}
      <div className="profile-card">
        <div className="profile-grid">
          <span className="label">Törzsszám:</span>
          <span>8400056819</span>

          <span className="label">Funkcióterület:</span>
          <span></span>

          <span className="label">Funkcióterület hosszú megnevezése:</span>
          <span></span>

          <span className="label">Adóazonosító jel:</span>
          <span>2138412746</span>

          <span className="label">Tajszám:</span>
          <span>65431245731</span>

          <span className="label">Állandó lakcím:</span>
          <span>9700, Szombathely, Hollósy Simon utca 19/a</span>

          <span className="label">Tartozkódási hely:</span>
          <span>9700, Szombathely, Hollósy Simon utca 19/a</span>

          <span className="label">Melyik lakcím legyen az elszámolás alapja:</span>
          <span>Tartozkódási hely</span>
        </div>
      </div>
      
    </div>
  );
};

export default Profile;
