import React, { useState } from "react";

export default function Event({ event }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li className="event">
      {/* <div testID="event-summary">{event.summary} </div> */}
      {showDetails && (
        <div data-testid="event-description">{event.description}</div>
      )}
      <button data-testid="details-button" onClick={toggleDetails}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
    </li>
  );
}
