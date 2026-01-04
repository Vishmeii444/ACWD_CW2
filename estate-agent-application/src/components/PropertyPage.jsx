import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import properties from "../data/properties.json";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./PropertyPage.css";

export default function PropertyPage({ favourites, setFavourites }) {
  const { id } = useParams();
  const property = properties.properties.find((p) => p.id === id);

  const [currentImage, setCurrentImage] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const imageCache = useRef(new Map());

  // Preload all images
  useEffect(() => {
    if (!property) return;

    property.images.forEach((src) => {
      if (!imageCache.current.has(src)) {
        const img = new Image();
        img.onload = () => {
          setLoadedImages((prev) => new Set([...prev, src]));
        };
        img.src = src;
        imageCache.current.set(src, img);
      }
    });
  }, [property]);

  // Reset current image when property changes
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

  const toggleFavourite = () => {
  if (isFavourite) {
    // Remove from favourites
    setFavourites(favourites.filter((fav) => fav.id !== property.id));
  } else {
    // Add to favourites
    setFavourites([...favourites, property]);
  }
};


  const isFavourite = favourites.some((fav) => fav.id === property.id);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="property-details-container">
      <Link to="/" className="back-link">
        ← Back to Search
      </Link>

      <div className="property-header">
        <h1 className="detail-price">£{property.price.toLocaleString()}</h1>
        <button
          className={`fav-button ${isFavourite ? "active" : ""}`}
          onClick={toggleFavourite}
        >
          {isFavourite ? "💚 Saved" : "🤍 Save"}
        </button>
      </div>

      <p className="detail-location">{property.location}</p>
      <p className="detail-type">
        {property.bedrooms} Bedroom {property.type} · {property.tenure}
      </p>

      {/* Image Gallery */}
      <div className="gallery-section">
        <div className="main-image-container">
          <button
            className="nav-btn prev-btn"
            onClick={prevImage}
            aria-label="Previous image"
            type="button"
          >
            ‹
          </button>

          {/* Render all images with opacity control */}
          <div className="images-stack">
            {property.images.map((img, index) => (
              <img
                key={`gallery-${property.id}-${index}`}
                src={img}
                alt={`${property.location} - view ${index + 1}`}
                className="main-image"
                style={{
                  opacity: index === currentImage ? 1 : 0,
                  pointerEvents: index === currentImage ? "auto" : "none",
                  visibility: loadedImages.has(img) ? "visible" : "hidden",
                }}
                loading={index === 0 ? "eager" : "lazy"}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ))}
          </div>

          <button
            className="nav-btn next-btn"
            onClick={nextImage}
            aria-label="Next image"
            type="button"
          >
            ›
          </button>

          <div className="image-counter">
            {currentImage + 1} / {property.images.length}
          </div>
        </div>

        <div className="thumbnail-container">
          {property.images.map((img, index) => (
            <img
              key={`thumb-${property.id}-${index}`}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${index === currentImage ? "active" : ""}`}
              onClick={() => setCurrentImage(index)}
              loading="lazy"
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
            <iframe
              className="map-frame"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                property.location
              )}&output=embed`}
            ></iframe>
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
