import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Holiday.css";

function Holiday({ title, description }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowDescription(!showDescription)}
        className="holiday-title"
      >
        {title}
      </div>
      <div className="holiday-description">
        {showDescription && <span>{description}</span>}
      </div>
    </>
  );
}

export default Holiday;
