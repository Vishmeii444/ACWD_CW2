import { useState } from "react";

export default function SearchPage() {
  const [type, setType] = useState("");
  const [bedroomsMin, setBedroomsMin] = useState(1);
  const [bedroomsMax, setBedroomsMax] = useState(5);
  const [priceMin, setPriceMin] = useState(100000);
  const [priceMax, setPriceMax] = useState(500000);
  const [postcode, setPostcode] = useState("");
  const [date, setDate] = useState(null);

  const handleSearch = () => {
    console.log("Search filters: ");
    console.log({ type, bedroomsMin, bedroomsMax, priceMin, priceMax, postcode, date });
  };

  return (
    <div style={{padding: "20px"}}>
        <h1>Search Properties</h1>

        {/*Property Type*/}
        <label>
            Property Type:
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select type</option>
                <option value="House">House</option>
                <option value="Flat">Flat</option>
            </select>
        </label>
        <br></br>

        {/*Bedrooms*/}
        <label>
            Bedrooms (Min):
            <input
            type="number"
            min="1"
            max="10"
            value={bedroomsMin}
            onChange={(e) => setBedroomsMin(e.target.value)}
            />
        </label>

        <label>
            Bedrooms (Max):
            <input
            type="number"
            min="1"
            max="10"
            value={bedroomsMax}
            onChange={(e) => setBedroomsMax(e.target.value)}
            />
        </label>
        <br></br>

        {/*Price*/}
        <label>
            Min Price: 
            <input
            type="number"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            />
        </label>

        <label style={{marginLeft: "20px"}}>
            Max Price: 
            <input
            type="number"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            />
        </label>
        <br></br>

        {/*Date*/}
        <label>
            Available Form: 
            <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />
        </label>
        <br></br>

        {/*Search Button*/}
        <button onClick={handleSearch}>Search</button>
    </div>
  );
}