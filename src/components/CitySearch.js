import { useEffect, useState } from "react";

export default function CitySearch ({ allLocations }) {
  const [showSuggestions, setShowSuggestions] = useState(false); //set to false for default value, no show unless input field is in focus"
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations
      ? allLocations.filter((location) => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
      : [];
    setQuery(value);
    setSuggestions(filteredLocations);
  };

//use stringified value of allLocations prop as dependency
  useEffect(()=>{
    setSuggestions(allLocations);
  }, ['${allLocations}']);

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a City"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ? 
      <ul className="suggestions">
        {suggestions.map((suggestion)=>{
            return <li key={suggestion}>{suggestion}</li>
        })}
        <li key='See all cities'>
            <b>See all cities</b>
        </li>
      </ul> : null}
    </div>
  );
};

