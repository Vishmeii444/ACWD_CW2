import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import properties from "../data/properties.json";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./PropertyPage.css";

export default function PropertyPage({ favourites, setFavourites }) {
  const { id } = useParams();
  const property = properties.properties.find((p) => p.id === id);

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setCurrentImage(0);
  }, [id]);

  if (!property) {
    return (
      <div className="not-found">
        <h2>Property Not Found</h2>
        <Link to="/" className="back-link">
          ← Back to Search
        </Link>
      </div>
    );
  }

  const addToFavourites = () => {
    if (!favourites.find((fav) => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  const isFavourite = favourites.some((fav) => fav.id === property.id);

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  // Google Maps embed URL
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
    property.location
  )}`;

  return (
    <div className="property-details-container">
      <Link to="/" className="back-link">
        ← Back to Search
      </Link>

      <div className="property-header">
        <h1 className="detail-price">£{property.price.toLocaleString()}</h1>
        <button
          className={`fav-button ${isFavourite ? "active" : ""}`}
          onClick={addToFavourites}
        >
          {isFavourite ? "❤️ Saved" : "🤍 Save"}
        </button>
      </div>

      <p className="detail-location">{property.location}</p>
      <p className="detail-type">
        {property.bedrooms} Bedroom {property.type} · {property.tenure}
      </p>

      {/* Image Gallery */}
      <div className="gallery-section">
        <div className="main-image-container">
          <button className="nav-btn prev-btn" onClick={prevImage}>
            ‹
          </button>

          {property.images.map((img, index) => (
            <img
              key={`img-${index}`}
              src={img}
              alt={`Property view ${index + 1}`}
              className="main-image"
              style={{
                opacity: index === currentImage ? 1 : 0,
                pointerEvents: index === currentImage ? 'auto' : 'none'
              }}
              onError={(e) => {
                e.target.src = "images/fallback.jpg";
              }}
            />
          ))}

          <button className="nav-btn next-btn" onClick={nextImage}>
            ›
          </button>
          <div className="image-counter">
            {currentImage + 1} / {property.images.length}
          </div>
        </div>

        <div className="thumbnail-container">
          {property.images.map((img, index) => (
            <img
              key={`thumb-${index}`}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${index === currentImage ? "active" : ""}`}
              onClick={() => setCurrentImage(index)}
              onError={(e) => {
                e.target.src = "images/fallback.jpg";
              }}
            />
          ))}
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs className="property-tabs">
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        {/* Description */}
        <TabPanel>
          <div className="tab-content">
            <h2>Property Description</h2>
            <p className="short-desc">{property.description}</p>

            <h3>Full Details</h3>
            <p className="long-desc">{property.description}</p>
            <div className="property-features">
              <h3>Key Features</h3>
              <ul>
                <li>{property.bedrooms} Bedrooms</li>
                <li>{property.type}</li>
                <li>{property.tenure}</li>
                <li>Located in {property.location}</li>
              </ul>
            </div>
          </div>
        </TabPanel>

        {/* Floor Plan */}
        <TabPanel>
          <div className="tab-content">
            <h2>Floor Plan</h2>
            {property.floorplan ? (
              <img
                src={property.floorplan}
                alt="Floor plan"
                className="floorplan-image"
              />
            ) : (
              <p>No floor plan available</p>
            )}
          </div>
        </TabPanel>

        {/* Map */}
        <TabPanel>
          <div className="tab-content">
            <h2>Location Map</h2>
            <p className="map-address">{property.location}</p>
            <div className="map-placeholder">
              <p> Map View</p>
              <p className="map-note">
                Google Maps would display here with property location
              </p>
              <p className="map-instructions">
                To enable: Replace YOUR_API_KEY in the code with your Google
                Maps API key
              </p>
            </div>
            {/* Uncomment when you have an API key:
            <iframe
              src={mapUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            */}
          </div>
        </TabPanel>
      </Tabs>

      <div className="contact-section">
        <h2>Interested in this property?</h2>
        <p>Contact us to arrange a viewing</p>
        <button className="contact-btn">Contact Agent</button>
      </div>
    </div>
  );
}
