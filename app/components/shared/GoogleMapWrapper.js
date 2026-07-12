"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./GoogleMapWrapper.module.css";
import { MapPin, Phone, Info } from "lucide-react";

export default function GoogleMapWrapper({
  center = { lat: 28.4700, lng: 77.5100 }, // Greater Noida
  zoom = 14,
  markers = [],
  className = "",
  height = "400px"
}) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const [APIKey, setAPIKey] = useState(null);

  useEffect(() => {
    setAPIKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  }, []);

  // Standard Greater Noida markers if empty
  const defaultMarkers = markers.length > 0 ? markers : [
    { id: 1, name: "Saraswati Niwas - Knowledge Park 2 Residency", lat: 28.4650, lng: 77.5000, desc: "Knowledge Park 2, near Metro Station" },
    { id: 2, name: "Saraswati Niwas - Knowledge Hub (Girls)", lat: 28.4700, lng: 77.5100, desc: "Knowledge Park 2, near GL Bajaj" },
    { id: 3, name: "Saraswati Niwas - IIMT Campus View", lat: 28.4744, lng: 77.5040, desc: "Near IIMT College" },
    { id: 4, name: "Saraswati Niwas - Pari Chowk Gateway", lat: 28.4595, lng: 77.5070, desc: "Near Pari Chowk intersection" }
  ];

  // If no API Key is set or it has placeholder value, render a beautiful custom interactive dashboard map.
  // This dashboard map shows locations sidebar and highlights coordinates on click. It is highly elevated.
  if (!APIKey || APIKey === "YOUR_GOOGLE_MAPS_API_KEY") {
    return (
      <div className={`${styles.container} ${className}`} style={{ height }}>
        <div className={styles.mapSidebar}>
          <h4>Branches in Greater Noida</h4>
          <p className={styles.helpText}>Click a branch to pinpoint on the interactive grid.</p>
          <div className={styles.markerList}>
            {defaultMarkers.map((marker) => (
              <button
                key={marker.id}
                onClick={() => setActiveMarker(marker)}
                className={`${styles.markerButton} ${activeMarker?.id === marker.id ? styles.activeMarker : ""}`}
              >
                <MapPin size={16} className={styles.pinIcon} />
                <div className={styles.markerInfo}>
                  <strong>{marker.name}</strong>
                  <span>{marker.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.gridMap}>
          {/* Custom vector representation of Greater Noida map */}
          <div className={styles.mapGridLines}>
            {defaultMarkers.map((marker) => {
              // Map lat/lng coordinates to absolute percentage for mockup layout
              const mapWidth = 0.03; // delta range
              const mapHeight = 0.03; // delta range
              const leftPercent = ((marker.lng - 77.49) / mapWidth) * 100;
              const topPercent = (1 - (marker.lat - 28.45) / mapHeight) * 100;

              return (
                <button
                  key={marker.id}
                  onClick={() => setActiveMarker(marker)}
                  className={`${styles.gridPin} ${activeMarker?.id === marker.id ? styles.activeGridPin : ""}`}
                  style={{
                    left: `${Math.max(10, Math.min(leftPercent, 90))}%`,
                    top: `${Math.max(10, Math.min(topPercent, 90))}%`
                  }}
                  title={marker.name}
                >
                  <MapPin size={24} fill="currentColor" />
                </button>
              );
            })}
            
            {activeMarker ? (
              <div className={styles.mapPopup}>
                <h5>{activeMarker.name}</h5>
                <p>{activeMarker.desc}</p>
                <div className={styles.popupMeta}>
                  <span>Coordinates: {activeMarker.lat.toFixed(4)}°N, {activeMarker.lng.toFixed(4)}°E</span>
                </div>
              </div>
            ) : (
              <div className={styles.mapHint}>
                <Info size={18} />
                <span>Select a branch to see location card</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If real API key exists, we can lazy load the Google Maps API and display the map.
  return (
    <div className={`${styles.gmap} ${className}`} style={{ height }}>
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: "24px" }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/search?key=${APIKey}&q=Saraswati+Niwas+Hostel+Greater+Noida`}
      />
    </div>
  );
}
