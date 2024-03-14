import React, { useState } from "react";

export default function Event({ event }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li className="event">
      <div className="event-summary">{event.summary} </div>
      {showDetails && (
        <div className="event-description">{event.description}</div>
      )}
      <button onClick={toggleDetails}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
    </li>
  );
}
