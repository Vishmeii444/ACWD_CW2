import { useState } from "react";
import properties from "../data/properties.json";
import"./SearchPage.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import Slide from "rc-slider";
import "rc-slider/assets/index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

export default function SearchPage({favourites, setFavourites}) {
  const [type, setType] = useState(null);
  const [bedroomsMin, setBedroomsMin] = useState(1);
  const [bedroomsMax, setBedroomsMax] = useState(10);
  const [priceRange, setPriceRange] = useState([100000, 1000000]);
  const [postcode, setPostcode] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const handleSearch = () => {
    console.log("Search filters: ");
    console.log({
      type,
      bedroomsMin,
      bedroomsMax,
      priceMin,
      priceMax,
      postcode,
      date,
    });
  };

  return (
    <div className="search-container">
      <h1 className="titel">Search Properties</h1>

      <div className="form-grid">
        <div class="form-group">
          <label>Property Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select type</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        <div className="form-group">
          <label>Bedrooms (Min)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={bedroomsMin}
            onChange={(e) => setBedroomsMin(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Bedrooms (Max)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={bedroomsMax}
            onChange={(e) => setBedroomsMax(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Min Price </label>
          <input
            type="number"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Max Price </label>
          <input
            type="number"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Postcode</label>
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Available From</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
