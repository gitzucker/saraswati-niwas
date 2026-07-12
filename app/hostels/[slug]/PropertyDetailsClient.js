"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { 
  Star, MapPin, CheckCircle, PhoneCall, Heart, Shield, Sparkles, 
  Clock, Coffee, BookOpen, Compass, ShieldAlert, GraduationCap, Utensils
} from "lucide-react";
import Button from "../../components/shared/Button";
import SplineWrapper from "../../components/shared/SplineWrapper";
import GoogleMapWrapper from "../../components/shared/GoogleMapWrapper";
import BookingModal from "../../components/shared/BookingModal";
import Image from "next/image";
import Link from "next/link";

export default function PropertyDetailsClient({ property }) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingIntent, setBookingIntent] = useState("visit");

  // Geolocation states
  const [userLocation, setUserLocation] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState("");


  const genderLabel = property.gender === "female" ? "Girls Only" : property.gender === "male" ? "Boys Only" : "Co-Living";

  // Calculate live location route distance and estimated travel times
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    setGeoLoading(true);
    setGeoError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const uLat = position.coords.latitude;
        const uLng = position.coords.longitude;
        setUserLocation({ lat: uLat, lng: uLng });

        // Calculate Haversine distance
        const r = 6371; // Earth radius in km
        const dLat = ((property.coordinates.lat - uLat) * Math.PI) / 180;
        const dLng = ((property.coordinates.lng - uLng) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((uLat * Math.PI) / 180) *
            Math.cos((property.coordinates.lat * Math.PI) / 180) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = r * c; // distance in km

        // Speed estimations
        const drivingSpeed = 30; // 30 km/h in Noida traffic
        const walkingSpeed = 4.5; // 4.5 km/h walking speed
        
        const driveTimeMin = Math.round((distance / drivingSpeed) * 60);
        const walkTimeMin = Math.round((distance / walkingSpeed) * 60);

        setRouteInfo({
          distance: distance.toFixed(2),
          driveTime: driveTimeMin > 60 ? `${Math.floor(driveTimeMin / 60)}h ${driveTimeMin % 60}m` : `${driveTimeMin} mins`,
          walkTime: walkTimeMin > 60 ? `${Math.floor(walkTimeMin / 60)}h ${walkTimeMin % 60}m` : `${walkTimeMin} mins`,
          googleUrl: `https://www.google.com/maps/dir/?api=1&origin=${uLat},${uLng}&destination=${property.coordinates.lat},${property.coordinates.lng}&travelmode=driving`
        });
        setGeoLoading(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setGeoError("Location access denied or unavailable. Please enable device GPS/location permissions.");
        setGeoLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Provide fallback structure in case property fields are missing
  const longDesc = property.longDescription || [property.description];
  const messMenu = property.messMenu || {
    "Monday": "Breakfast: Poha, Tea | Lunch: Rajma, Rice, Roti | Dinner: Aloo Gobi, Dal Tadka, Roti, Kheer",
    "Tuesday": "Breakfast: Stuffed Paratha, Curd | Lunch: Kadhi Pakoda, Roti, Rice | Dinner: Mix Veg, Dal, Roti",
    "Wednesday": "Breakfast: Idli Sambhar | Lunch: Chole Bhature | Dinner: Paneer Masala, Dal Makhani, Roti",
    "Thursday": "Breakfast: Bread Butter, Omelette/Sprouts | Lunch: Seasonal Veg, Dal, Rice | Dinner: Veg Pulao, Curd",
    "Friday": "Breakfast: Puri Bhaji | Lunch: Dal Fry, Rice, Roti | Dinner: Shahi Paneer, Roti, Sweet Veg",
    "Saturday": "Breakfast: Pav Bhaji | Lunch: Khichdi, Roti, Papad | Dinner: Kofta Curry, Dal, Rice, Roti",
    "Sunday": "Breakfast: Special Chilla, Coffee | Lunch: Veg Biryani, Raita | Dinner: Dal Makhani, Paneer, Naan, Gulab Jamun"
  };
  const collegeDistances = property.collegeDistances || [
    { name: "GL Bajaj Institute of Technology", distance: "0.8 km", time: "8 mins walk" },
    { name: "IIMT College of Engineering", distance: "0.5 km", time: "5 mins walk" },
    { name: "Sharda University", distance: "2.1 km", time: "5 mins drive" },
    { name: "Galgotias University", distance: "2.8 km", time: "7 mins drive" }
  ];
  const rules = property.rules || [
    "Gates close strictly at 10:30 PM. Late entries require warden authorization.",
    "Parent/Guardian entry is permitted in the reception and lounge between 10:00 AM - 7:00 PM.",
    "Overnight guests/friends are not allowed in student rooms.",
    "Loud music/disturbances are prohibited in the quiet study zones.",
    "Smoking, alcohol, and prohibited substances are strictly banned."
  ];

  return (
    <div className={styles.pageContainer}>
      <div className="container">
        
        {/* Gallery Section */}
        <div className={styles.galleryGrid}>
          <div className={styles.mainImage}>
            <Image
              src={property.images[activeImage]}
              alt={property.name}
              fill
              className={styles.image}
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <span className={`${styles.genderBadge} ${styles[property.gender]}`}>{genderLabel}</span>
          </div>
          <div className={styles.thumbnails}>
            {property.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`${styles.thumbBtn} ${activeImage === i ? styles.activeThumb : ""}`}
              >
                <Image
                  src={img}
                  alt={`${property.name} ${i + 1}`}
                  fill
                  className={styles.thumbImage}
                  sizes="150px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Content Layout */}
        <div className={styles.contentGrid}>
          
          {/* Main Left Section */}
          <div className={styles.mainContent}>
            
            {/* Header info */}
            <div className={styles.propertyHeader}>
              <div className={styles.location}>
                <MapPin size={16} />
                <span>{property.location}</span>
              </div>
              <h1 className={styles.propertyName}>{property.name}</h1>
              
              <div className={styles.ratingRow}>
                <div className={styles.stars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(property.rating) ? "var(--yellow)" : "transparent"} stroke="var(--yellow)" />
                  ))}
                  <strong>{property.rating}</strong>
                </div>
                <div className={styles.dividerDot} />
                <span>{property.reviews} Verified Reviews</span>
              </div>
            </div>

            {/* Custom Tab System for detailed info */}
            <div className={styles.tabsHeader}>
              <button 
                className={`${styles.tabBtn} ${activeTab === "overview" ? styles.activeTab : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                <BookOpen size={16} /> Overview
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === "mess" ? styles.activeTab : ""}`}
                onClick={() => setActiveTab("mess")}
              >
                <Utensils size={16} /> Mess & Food
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === "colleges" ? styles.activeTab : ""}`}
                onClick={() => setActiveTab("colleges")}
              >
                <GraduationCap size={16} /> College Proximity
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === "guidelines" ? styles.activeTab : ""}`}
                onClick={() => setActiveTab("guidelines")}
              >
                <ShieldAlert size={16} /> Rules & Guidelines
              </button>
            </div>

            {/* Tab Contents */}
            <div className={styles.tabContentPanel}>
              {activeTab === "overview" && (
                <div className={styles.overviewTabContent}>
                  <h3>About This Residence</h3>
                  {longDesc.map((paragraph, idx) => (
                    <p key={idx} className={styles.longDescText}>{paragraph}</p>
                  ))}
                  
                  <h4 style={{ marginTop: "24px", marginBottom: "12px", fontFamily: "var(--font-heading)" }}>Key Residence Highlights</h4>
                  <ul className={styles.bulletList}>
                    {property.facilitiesDetails ? property.facilitiesDetails.map((facility, idx) => (
                      <li key={idx}>✓ {facility}</li>
                    )) : (
                      <>
                        <li>✓ Fully furnished rooms with high-grade study table, wardrobe, and ergonomic chair setup.</li>
                        <li>✓ 200 Mbps unlimited optical-fiber Wi-Fi network access.</li>
                        <li>✓ Geyser and continuous hot water supply in all washrooms.</li>
                        <li>✓ Daily professional housekeeping and weekly room deep sanitation.</li>
                      </>
                    )}
                  </ul>
                </div>
              )}

              {activeTab === "mess" && (
                <div className={styles.messTabContent}>
                  <h3>Hygiene Mess Dining</h3>
                  <p className={styles.tabIntroText}>We serve 4 fresh, home-cooked vegetarian meals daily prepared under professional guidelines.</p>
                  
                  <div className={styles.menuGrid}>
                    {Object.entries(messMenu).map(([day, meal], idx) => (
                      <div key={idx} className={styles.menuDayCard}>
                        <strong>{day} Menu</strong>
                        <p>{meal}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "colleges" && (
                <div className={styles.collegesTabContent}>
                  <h3>Proximity to Universities</h3>
                  <p className={styles.tabIntroText}>This branch is situated close to major institutions in Greater Noida, providing easy walking and shuttle connections.</p>
                  
                  <div className={styles.collegeList}>
                    {collegeDistances.map((college, idx) => (
                      <div key={idx} className={styles.collegeItem}>
                        <GraduationCap className={styles.collegeIcon} size={20} />
                        <div className={styles.collegeInfo}>
                          <strong>{college.name}</strong>
                          <span>📍 {college.distance} ({college.time})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "guidelines" && (
                <div className={styles.rulesTabContent}>
                  <h3>Residence Policies</h3>
                  <p className={styles.tabIntroText}>To ensure a safe, clean, and highly productive study environment, residents must adhere to the following rules:</p>
                  
                  <ul className={styles.rulesList}>
                    {rules.map((rule, idx) => (
                      <li key={idx}>
                        <span className={styles.ruleBadge}>{idx + 1}</span>
                        <p>{rule}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Room Plans Table (Booking Option) */}
            <div className={styles.sectionBlock}>
              <h3>Select Sharing & Book Room</h3>
              <p className={styles.tourText}>Select your preferred occupancy layout. Safe booking options are secured directly via WhatsApp and Warden callbacks.</p>
              <div className={styles.tableContainer}>
                <table className={styles.roomTable}>
                  <thead>
                    <tr>
                      <th>Sharing Type</th>
                      <th>Availability</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {property.rooms.map((room, i) => (
                      <tr key={i}>
                        <td><strong>{room.type}</strong></td>
                        <td>
                          <span className={`${styles.statusBadge} ${room.available ? styles.available : styles.filled}`}>
                            {room.available ? "Available" : "Filled"}
                          </span>
                        </td>
                        <td>
                          <Button 
                            onClick={() => { setBookingIntent("visit"); setBookingModalOpen(true); }}
                            disabled={!room.available}
                            variant={room.available ? "primary" : "outline"}
                            size="sm"
                          >
                            Book Stay
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Live Location Router & Distance Locator (Requesting user location access) */}
            <div className={styles.sectionBlock}>
              <div className={styles.tourHeader}>
                <h3>Live Distance & Route Finder</h3>
                <span className={styles.gpsBadge}><Compass size={12} /> GPS Tracker</span>
              </div>
              <p className={styles.tourText}>Allow GPS/location access to calculate your live distance, travel duration, and route map directions to this hostel.</p>
              
              <div className={styles.routeContainer}>
                {routeInfo ? (
                  <div className={styles.routeSuccess}>
                    <div className={styles.routeStats}>
                      <div className={styles.statBox}>
                        <span className={styles.statVal}>{routeInfo.distance} km</span>
                        <span className={styles.statLbl}>Live Distance</span>
                      </div>
                      <div className={styles.statBox}>
                        <span className={styles.statVal}>🚗 {routeInfo.driveTime}</span>
                        <span className={styles.statLbl}>Driving Time</span>
                      </div>
                      <div className={styles.statBox}>
                        <span className={styles.statVal}>🏃 {routeInfo.walkTime}</span>
                        <span className={styles.statLbl}>Walking Time</span>
                      </div>
                    </div>
                    <div className={styles.routeActions}>
                      <Button onClick={handleLocateMe} variant="outline" size="sm">Recalculate Route</Button>
                      <Button href={routeInfo.googleUrl} target="_blank" variant="primary" size="sm">
                        Start Turn-by-Turn Map
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.routePrompt}>
                    <p>Grant location permission to find your live distance and travel duration to this branch.</p>
                    {geoError && <p className={styles.geoError}>{geoError}</p>}
                    <Button onClick={handleLocateMe} loading={geoLoading} variant="primary">
                      {geoLoading ? "Accessing Location..." : "Locate Me & Calculate Route"}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Static visual representation of Noida Map */}
            <div className={styles.sectionBlock}>
              <h3>Location Map</h3>
              <p className={styles.tourText}>Located close to major university centers, markets, and metro links.</p>
              <div className={styles.mapContainer}>
                <GoogleMapWrapper 
                  center={property.coordinates}
                  zoom={15}
                  markers={[{
                    id: property.id,
                    name: property.name,
                    lat: property.coordinates.lat,
                    lng: property.coordinates.lng,
                    desc: property.location
                  }]}
                  height="320px"
                />
              </div>
            </div>

          </div>

          {/* Sticky booking side banner */}
          <aside className={styles.stickySidebar}>
            <div className={styles.pricingCard}>
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 850, color: "var(--text-primary)", margin: 0, fontFamily: "var(--font-heading)" }}>Book Your Stay</h4>
                <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", margin: "4px 0 0 0", fontFamily: "var(--font-body)" }}>Schedule a physical visit or make an instant warden enquiry.</p>
              </div>

              <div className={styles.trustBanner}>
                <Shield size={16} />
                <span>Zero Brokerage fee • Single month deposit</span>
              </div>

              <div className={styles.bookingActions}>
                <Button 
                  onClick={() => { setBookingIntent("visit"); setBookingModalOpen(true); }}
                  variant="primary" 
                  fullWidth 
                  className={styles.sidebarBtn}
                >
                  Schedule physical Visit
                </Button>
                
                <Button 
                  onClick={() => { setBookingIntent("call"); setBookingModalOpen(true); }}
                  variant="outline" 
                  fullWidth 
                  className={styles.sidebarBtn}
                >
                  <PhoneCall size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }} />
                  Request a Call Back
                </Button>
              </div>

              <div className={styles.perks}>
                <div className={styles.perkItem}>
                  <span className={styles.check}>✓</span>
                  <span>Unlimited 200Mbps WiFi</span>
                </div>
                <div className={styles.perkItem}>
                  <span className={styles.check}>✓</span>
                  <span>4 nutritious meals included</span>
                </div>
                <div className={styles.perkItem}>
                  <span className={styles.check}>✓</span>
                  <span>Weekly room laundry service</span>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
      
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setBookingModalOpen(false)} 
        propertyName={property.name} 
        preSelectedOption={bookingIntent}
      />
    </div>
  );
}
