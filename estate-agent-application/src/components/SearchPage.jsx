import React from "react";
import { useState } from "react";
import properties from "../data/properties.json";
import "./SearchPage.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import "rc-slider/assets/index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slider from "rc-slider";

export default function SearchPage({ favourites, setFavourites }) {
  //form states
  const [type, setType] = useState(null);
  const [bedroomsMin, setBedroomsMin] = useState(1);
  const [bedroomsMax, setBedroomsMax] = useState(10);
  const [priceRange, setPriceRange] = useState([100000, 1000000]);
  const [postcode, setPostcode] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  //results state
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const typeOptions = [
    { value: "", label: "Any" },
    { value: "House", label: "House" },
    { value: "Flat", label: "Flat" },
  ];

  const handleSearch = () => {
    let results = properties.properties;

    //filter by type
    if (type && type.value) {
      results = results.filter((p) => p.type === type.value);
    }

    //filter by bedrooms
    results = results.filter(
      (p) => p.bedrooms >= bedroomsMin && p.bedrooms <= bedroomsMax
    );

    //filter by price
    results = results.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    //filter by postcode
    if (postcode.trim()) {
      results = results.filter((p) =>
        p.postcode.toUpperCase().startsWith(postcode.trim().toUpperCase())
      );
    }

    //filter by date
    if (dateFrom) {
      results = results.filter((p) => {
        const propDate = new Date(p.added.year, p.added.month - 1, p.added.day);
        return propDate >= dateFrom;
      });
    }

    if (dateTo) {
      results = results.filter((p) => {
        const propDate = new Date(p.added.year, p.added.month - 1, p.added.day);
        return propDate <= dateTo;
      });
    }

    setSearchResults(results);
    setHasSearched(true);
  };

  const handleReset = () => {
    setType(null);
    setBedroomsMin(1);
    setBedroomsMax(10);
    setPriceRange([10000, 1000000]);
    setPostcode("");
    setDateFrom(null);
    setDateTo(null);
    setSearchResults([]);
    setHasSearched(false);
  };

  const toggleFavourite = (property) => {
  const isFav = favourites.some((fav) => fav.id === property.id);

  if (isFav) {
    // Remove it
    setFavourites(favourites.filter((fav) => fav.id !== property.id));
  } else {
    // Add it
    setFavourites([...favourites, property]);
  }
};

const removeFromFavourites = (propertyId) => {
  setFavourites(favourites.filter((fav) => fav.id !== propertyId));
};

const clearFavourites = () => {
  setFavourites([]);
};

  const handleDragStart = (e, property) => {
    e.dataTransfer.setData("property", JSON.stringify(property));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const property = JSON.parse(e.dataTransfer.getData("property"));
    toggleFavourite(property);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveDrop = (e) => {
    e.preventDefault();
    const property = JSON.parse(e.dataTransfer.getData("property"));
    removeFromFavourites(property.id);
  };

  return (
    <div className="page-container">
      <div className="main-content">
        <div className="search-container">
          <h1 className="title">Search Properties</h1>

          {/*Select property type*/}
          <div className="form-grid">
            <div className="form-group">
              <label>Property Type</label>
              <Select
                value={type}
                onChange={setType}
                options={typeOptions}
                placeholder="Select Type"
                isClearable
              />
            </div>

            <div className="form-group">
              <label>
                Bedrooms: {bedroomsMin} - {bedroomsMax}
              </label>
              <Slider
                range
                min={1}
                max={10}
                value={[bedroomsMin, bedroomsMax]}
                onChange={(values) => {
                  setBedroomsMin(values[0]);
                  setBedroomsMax(values[1]);
                }}
              />
            </div>

            <div className="form-group">
              <label>
                Price Range: {priceRange[0].toLocaleString()} -{" "}
                {priceRange[1].toLocaleString()}{" "}
              </label>
              <Slider
                range
                min={100000}
                max={1000000}
                step={10000}
                value={priceRange}
                onChange={setPriceRange}
              />
            </div>

            <div className="form-group">
              <label>Postcode</label>
              <input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="Enter postcode"
              />
            </div>

            <div className="form-group">
              <label>Available From</label>
              <DatePicker
                selected={dateFrom}
                onChange={setDateFrom}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select date"
                isClearable
              />
            </div>

            <div className="form-group">
              <label>Available To</label>
              <DatePicker
                selected={dateTo}
                onChange={setDateTo}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select date"
                isClearable
              />
            </div>

            <div className="button-group">
              <button className="search-btn" onClick={handleSearch}>
                Search
              </button>
              <button className="reset-btn" onClick={handleReset}>
                Reset Filters
              </button>
            </div>
          </div>

          {/*Search results*/}
          {hasSearched && (
            <div className="results-container">
              <h2 className="results-title">
                {searchResults.length}{" "}
                {searchResults.length === 1 ? "Property" : "Properties"} Found
              </h2>
              <div className="results-grid">
                {searchResults.map((property) => (
                  <div
                    key={property.id}
                    className="property-card"
                    draggable
                    onDragStart={(e) => handleDragStart(e, property)}
                  >
                    <Link
                      to={`/property/${property.id}`}
                      className="property-link"
                    >
                      <img
                        src={property.picture}
                        alt={property.location}
                        className="property-image"
                      />
                      <div className="property-info">
                        <h3 className="property-price">
                          {property.price.toLocaleString()}
                        </h3>
                        <p className="property-location">{property.location}</p>
                        <p className="property-details">
                          {property.bedrooms} bed {property.type} .{" "}
                          {property.tenure}
                        </p>
                        <p className="property-description">
                          {property.description}
                        </p>
                      </div>
                    </Link>
                    <button
                      className="fav-btn"
                      onClick={() => toggleFavourite(property)}
                    >
                      {favourites.some((fav) => fav.id === property.id)
                        ? "💚 Saved"
                        : "🤍 Save"}
                    </button>
                  </div>
                ))}
              </div>
              {searchResults.length === 0 && (
                <p className="no-results">
                  No properties match your search criteria
                </p>
              )}
            </div>
          )}
        </div>

        {/*Favourites Sidebar*/}
        <aside
          className="favourites-sidebar"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="favourites-header">
            <h2>Favourites</h2>
            {favourites.length > 0 && (
              <button className="clear-btn" onClick={clearFavourites}>
                Clear All
              </button>
            )}
          </div>
          <div
            className="favourites-dropzone"
            onDrop={handleRemoveDrop}
            onDragOver={handleDragOver}
          >
            {favourites.length === 0 ? (
              <p className="empty-message">
                Drag properties here or click the heart button
              </p>
            ) : (
              <div className="favourites-list">
                {favourites.map((property) => (
                  <div
                    key={property.id}
                    className="favourite-item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, property)}
                  >
                    <Link to={`/property/${property.id}`}>
                      <img src={property.picture} alt={property.location} />
                      <div className="fav-info">
                        <p className="fav-price">
                          £{property.price.toLocaleString()}
                        </p>
                        <p className="fav-location">{property.postcode}</p>
                      </div>
                    </Link>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromFavourites(property.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
