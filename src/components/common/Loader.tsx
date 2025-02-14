import React from "react";
import "../../styles/Loader.css";

const Loader: React.FC = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <span className="material-icons-round">autorenew</span>
      </div>
    </div>
  );
};

export default Loader;
