"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { getProperties } from "../lib/cms";
import { Map, Grid, Filter, RefreshCw, Star, MapPin } from "lucide-react";
import Button from "../components/shared/Button";
import { Map as MaplibreMap, MapMarker, MarkerContent, MarkerPopup } from "../../components/ui/mapcn-map-marker";
import ScrollReveal from "../components/shared/ScrollReveal";
import Image from "next/image";
import Link from "next/link";

function HostelsContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or map

  // Filter States
  const [selectedArea, setSelectedArea] = useState(searchParams.get("area") || "");
  const [selectedGender, setSelectedGender] = useState(searchParams.get("gender") || "");
  const [selectedAmenity, setSelectedAmenity] = useState("");

  useEffect(() => {
    getProperties().then((data) => {
      setProperties(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = properties;

    if (selectedArea) {
      result = result.filter(p => p.area.toLowerCase() === selectedArea.toLowerCase());
    }
    if (selectedGender) {
      result = result.filter(p => p.gender.toLowerCase() === selectedGender.toLowerCase());
    }
    if (selectedAmenity) {
      result = result.filter(p => p.amenities.includes(selectedAmenity));
    }

    setFilteredProperties(result);
  }, [properties, selectedArea, selectedGender, selectedAmenity]);

  const resetFilters = () => {
    setSelectedArea("");
    setSelectedGender("");
    setSelectedAmenity("");
  };

  const getGenderLabel = (g) => {
    if (g === "female") return "Girls Only";
    if (g === "male") return "Boys Only";
    return "Co-Living";
  };

  return (
    <div className={styles.pageContainer}>
      <div className="container">
        {/* Banner Section */}
        <div className={styles.heroBanner}>
          <h1 className={styles.headline}>Available Rooms in Greater Noida</h1>
          <p className={styles.subheadline}>Find fully-managed, premium hostels near colleges and corporate hubs.</p>
        </div>

        {/* Search controls row */}
        <div className={styles.controlsRow}>
          <div className={styles.resultsCount}>
            Showing <strong>{filteredProperties.length}</strong> stays
          </div>
          
          <div className={styles.viewToggles}>
            <button 
              className={`${styles.toggleBtn} ${viewMode === "grid" ? styles.activeToggle : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid size={16} />
              <span>Grid View</span>
            </button>
            <button 
              className={`${styles.toggleBtn} ${viewMode === "map" ? styles.activeToggle : ""}`}
              onClick={() => setViewMode("map")}
            >
              <Map size={16} />
              <span>Map View</span>
            </button>
          </div>
        </div>

        {/* Content body split */}
        <div className={styles.contentLayout}>
          
          {/* Filters Sidebar */}
          <aside className={styles.filterSidebar}>
            <div className={styles.sidebarHeader}>
              <div className={styles.sidebarTitle}>
                <Filter size={18} />
                <span>Filters</span>
              </div>
              <button onClick={resetFilters} className={styles.resetBtn}>
                <RefreshCw size={12} />
                <span>Reset All</span>
              </button>
            </div>

            <div className={styles.filterGroup}>
              <label>Locality</label>
              <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
                <option value="">All Localities</option>
                <option value="Knowledge Park 3">Knowledge Park 3</option>
                <option value="Knowledge Park 2">Knowledge Park 2</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Hostel Type</label>
              <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
                <option value="">All Categories</option>
                <option value="male">Boys Hostel</option>
                <option value="female">Girls Hostel</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Amenities</label>
              <select value={selectedAmenity} onChange={(e) => setSelectedAmenity(e.target.value)}>
                <option value="">Any Amenity</option>
                <option value="WiFi">High-Speed WiFi</option>
                <option value="AC">Air Conditioning</option>
                <option value="Food">Meals Included</option>
                <option value="Gym">Fitness Gym</option>
                <option value="Security">24/7 Security</option>
                <option value="Study Room">Quiet Study Room</option>
              </select>
            </div>
          </aside>

          {/* Listings Body */}
          <main className={styles.listingsBody}>
            {loading ? (
              <div className={styles.loaderContainer}>
                <div className={styles.spinner} />
                <p>Loading hostels...</p>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className={styles.emptyState}>
                <h3>No Hostels Found</h3>
                <p>Try clearing some filters or searching in a different locality.</p>
                <Button onClick={resetFilters} variant="primary">Reset All Filters</Button>
              </div>
            ) : viewMode === "map" ? (
              <ScrollReveal animation="fadeIn" duration={400}>
                <div className={styles.mapContainer}>
                  <MaplibreMap 
                    center={[77.5100, 28.4700]} 
                    zoom={12.5}
                    className="w-full h-full"
                  >
                    {filteredProperties.map(p => (
                      <MapMarker 
                        key={p.id}
                        longitude={p.coordinates.lng}
                        latitude={p.coordinates.lat}
                      >
                        <MarkerContent>
                          <div className={styles.markerPin}>
                            <MapPin size={16} fill="currentColor" />
                          </div>
                        </MarkerContent>
                        <MarkerPopup closeButton>
                          <div className={styles.popupCard}>
                            <div className={styles.popupImageContainer}>
                              <img src={p.images[0]} alt={p.name} className={styles.popupImage} />
                              <span className={`${styles.popupGenderBadge} ${styles[p.gender]}`}>
                                {getGenderLabel(p.gender)}
                              </span>
                            </div>
                            <h4 className={styles.popupName}>{p.name}</h4>
                            <p className={styles.popupDesc}>{p.description}</p>
                            <Link href={`/hostels/${p.slug}`} className={styles.popupLink}>
                              <Button style={{ width: "100%", padding: "8px 0", fontSize: "0.75rem" }}>
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </MarkerPopup>
                      </MapMarker>
                    ))}
                  </MaplibreMap>
                </div>
              </ScrollReveal>
            ) : (
              <div className={styles.grid}>
                {filteredProperties.map((p, index) => (
                  <ScrollReveal 
                    key={p.id} 
                    animation="fadeUp" 
                    delay={index * 80}
                    className={styles.cardReveal}
                  >
                    <div className={styles.card}>
                      <div className={styles.imageContainer}>
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          className={styles.image}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <span className={`${styles.genderBadge} ${styles[p.gender]}`}>
                          {getGenderLabel(p.gender)}
                        </span>
                      </div>
                      
                      <div className={styles.cardBody}>
                        <div className={styles.metaRow}>
                          <div className={styles.location}>
                            <MapPin size={14} className={styles.locIcon} />
                            <span>{p.location}</span>
                          </div>
                          <div className={styles.rating}>
                            <Star size={14} fill="var(--yellow)" stroke="var(--yellow)" />
                            <span>{p.rating}</span>
                          </div>
                        </div>

                        <h3 className={styles.propertyName}>{p.name}</h3>
                        <p className={styles.description}>{p.description}</p>

                        <div className={styles.amenities}>
                          {p.amenities.slice(0, 4).map((amenity, i) => (
                            <span key={i} className={styles.amenityTag}>{amenity}</span>
                          ))}
                          {p.amenities.length > 4 && (
                            <span className={styles.moreTag}>+{p.amenities.length - 4} more</span>
                          )}
                        </div>

                        <div className={styles.cardFooter} style={{ justifyContent: "flex-end" }}>
                          <Link href={`/hostels/${p.slug}`} className={styles.exploreLink}>
                            <span>View Room</span>
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}

export default function HostelsPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '4px solid #EDE9FF', borderTopColor: '#6C63FF', animation: 'spin 1s linear infinite' }} />
      </div>
    }>
      <HostelsContent />
    </Suspense>
  );
}

const ArrowRight = ({ size, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);
