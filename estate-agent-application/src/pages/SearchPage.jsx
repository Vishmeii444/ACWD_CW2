import { useState } from "react";

export default function SearchPage() {
  const [type, setType] = useState("");
  const [bedroomsMin, setBedroomsMin] = useState(1);
  const [bedroomsMax, setBedroomsMax] = useState(5);
  const [priceMin, setPriceMin] = useState(100000);
  const [priceMax, setPriceMax] = useState(500000);
  const [postcode, setPostcode] = useState("");
  const [date, setDate] = useState("");

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
