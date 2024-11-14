// src/components/CitySearch.js

import React, { useState, useMemo, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [infoText, setInfoText] = useState("");

  const suggestions = useMemo(() => {
    return allLocations
      ? allLocations.filter((location) =>
          location.toUpperCase().includes(query.toUpperCase())
        )
      : [];
  }, [allLocations, query]);

  useEffect(() => {
    if (suggestions.length === 0 && query !== "") {
      setInfoText("We cannot find the city you are looking for. Please try another city.");
    } else {
      setInfoText("");
    }
    if (typeof setInfoAlert === 'function') {
      setInfoAlert(infoText);
    }
  }, [suggestions, query, setInfoAlert, infoText]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);
    setShowSuggestions(true);
  };

  const handleItemClicked = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setCurrentCity(suggestion);
    setInfoText("");
  };

  const handleAllCitiesClicked = () => {
    setQuery("");
    setShowSuggestions(false);
    setCurrentCity("all");
    setInfoText("");
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for click events on suggestions
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onBlur={handleBlur}
        onChange={handleInputChanged}
      />
      {query && (
        <button onClick={handleAllCitiesClicked} aria-label="Clear selection">
          Clear
        </button>
      )}
      {showSuggestions && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li onClick={() => handleItemClicked(suggestion)} key={suggestion}>
              {suggestion}
            </li>
          ))}
          <li onClick={handleAllCitiesClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
