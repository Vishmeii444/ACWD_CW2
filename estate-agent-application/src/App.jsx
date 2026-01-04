import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import PropertyPage from "./components/PropertyPage";

export default function App() {
  const [favourites, setFavourites] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SearchPage favourites={favourites} 
            setFavourites={setFavourites} />
          }
        />
        <Route
          path="/property/:id"
          element={
            <PropertyPage
              favourites={favourites}
              setFavourites={setFavourites}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
