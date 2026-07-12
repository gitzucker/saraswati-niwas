"use client";

import { useState } from "react";
import styles from "./InteractiveMapSection.module.css";
import ScrollReveal from "../shared/ScrollReveal";
import Button from "../shared/Button";
import { MapPin, Star, Shield, ArrowRight, Info, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PROPERTIES = [
  {
    id: "prop-b1",
    slug: "saraswati-niwas-b1-branch",
    name: "Saraswati Niwas - B1 Branch",
    type: "boys",
    location: "Knowledge Park 2, Greater Noida",
    rating: 4.8,
    gender: "Boys Only",
    tagline: "Opposite Knowledge Park 2 Metro Station",
    description: "Fully furnished boys' hostel located in Knowledge Park 2. Featuring easy commute links, daily nutritious catering, and high-security student stays.",
    amenities: ["WiFi", "AC", "Laundry", "4 Meals Mess", "Biometric Access"],
    coordinates: { top: 40, left: 35 },
    image: "/images/properties/room-interior.png"
  },
  {
    id: "prop-b10",
    slug: "saraswati-niwas-b10-branch",
    name: "Saraswati Niwas - B10 Branch",
    type: "boys",
    location: "Knowledge Park 3, Greater Noida",
    rating: 4.7,
    gender: "Boys Only",
    tagline: "Prime KP3 Study Hub, near GL Bajaj College",
    description: "Premium boys' hostel situated in Knowledge Park 3. Featuring soundproof workspaces, high-speed fiber internet, and gym setups.",
    amenities: ["AC Setup", "Gym Access", "Laundry", "Mess", "Study Room"],
    coordinates: { top: 25, left: 65 },
    image: "/images/properties/common-area.png"
  },
  {
    id: "prop-b16",
    slug: "saraswati-niwas-b16-branch",
    name: "Saraswati Niwas - B16 Branch",
    type: "boys",
    location: "Knowledge Park 3, Greater Noida",
    rating: 4.6,
    gender: "Boys Only",
    tagline: "Vibrant Hub near Major Universities",
    description: "Modern student hostel providing top-grade maintenance services, weekly laundry, power backup, and a central recreation room.",
    amenities: ["WiFi", "Laundry", "Food mess", "CCTV Security", "Lounges"],
    coordinates: { top: 35, left: 52 },
    image: "/images/properties/dining-area.png"
  },
  {
    id: "prop-b17",
    slug: "saraswati-niwas-b17-girls-branch",
    name: "Saraswati Niwas - B17 Branch (Girls)",
    type: "girls",
    location: "Knowledge Park 3, Greater Noida",
    rating: 4.9,
    gender: "Girls Only",
    tagline: "Safe Zone near IIT, KCC and GL Bajaj",
    description: "Ultra-secure girls' hostel branch with full-time wardens, biometric security control gates, study lounge, and segregated dining services.",
    amenities: ["WiFi Boost", "AC", "Laundry", "Warden Guard", "Study Hall"],
    coordinates: { top: 30, left: 58 },
    image: "/images/properties/study-room.png"
  },
  {
    id: "prop-ar1",
    slug: "saraswati-niwas-ar1-branch",
    name: "Saraswati Niwas - AR1 Branch",
    type: "boys",
    location: "Knowledge Park 3, Greater Noida",
    rating: 4.7,
    gender: "Boys Only",
    tagline: "Plot 70 Namoli, quiet student study sector",
    description: "Furnished student stay in Knowledge Park 3 offering a serene studying environment, recreation hubs, and rotating daily mess options.",
    amenities: ["WiFi", "Laundry", "Mess Menu", "Power Backup", "Gym access"],
    coordinates: { top: 20, left: 72 },
    image: "/images/properties/room-interior.png"
  },
  {
    id: "prop-ar2",
    slug: "saraswati-niwas-ar2-branch",
    name: "Saraswati Niwas - AR2 Branch (Girls)",
    type: "girls",
    location: "Knowledge Park 3, Greater Noida",
    rating: 4.8,
    gender: "Girls Only",
    tagline: "Biometric Security & Soundproof Study Zones",
    description: "Well-managed girls' hostel providing continuous room servicing, professional security patrols, and high-speed online studying utilities.",
    amenities: ["Biometrics", "AC Setup", "Laundry", "Food Mess", "Study Desks"],
    coordinates: { top: 28, left: 62 },
    image: "/images/properties/study-room.png"
  }
];

export default function InteractiveMapSection() {
  const [selectedProp, setSelectedProp] = useState(PROPERTIES[0]);

  // Card mouse 3D tilt effect
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const rx = -(y / (box.height / 2)) * 12; // tilt max 12deg
    const ry = (x / (box.width / 2)) * 12;
    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <section className={styles.sectionContainer}>
      <div className="container">
        
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <ScrollReveal animation="fadeUp">
            <span className={styles.tagline}>Hostel Map Locator</span>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={100}>
            <h2 className={styles.title}>Locate Our Stays</h2>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={200}>
            <p className={styles.subtitle}>
              Saraswati Niwas branches are strategically situated near Greater Noida's top universities and metro lines. Click on the map to find your ideal home.
            </p>
          </ScrollReveal>
        </div>

        {/* Map Layout Frame */}
        <div className={styles.mapGrid}>
          
          {/* LEFT: Custom Interactive Vector Map Canvas */}
          <div className={styles.mapCanvasWrapper}>
            <div className={styles.mapHeader}>
              <span className={styles.mapStatus}>Interactive Map Mode</span>
              <p className={styles.mapHint}>Click on the orange pins to inspect details</p>
            </div>
            
            <div className={styles.vectorMap}>
              {/* Fake grid road lines representation */}
              <div className={`${styles.roadLine} ${styles.roadYamuna}`} />
              <div className={`${styles.roadLine} ${styles.roadMetroLine}`} />
              <div className={`${styles.roadLine} ${styles.roadKP2}`} />
              <div className={`${styles.roadLine} ${styles.roadKP}`} />
              
              {/* Pari Chowk intersection indicator */}
              <div className={styles.pariChowkCircle}>
                <span>Pari Chowk</span>
              </div>
              
              {/* Render hostel pin markers */}
              {PROPERTIES.map((p) => {
                const isActive = selectedProp?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProp(p)}
                    className={`${styles.mapPin} ${isActive ? styles.activeMapPin : ""}`}
                    style={{
                      top: `${p.coordinates.top}%`,
                      left: `${p.coordinates.left}%`
                    }}
                    title={p.name}
                  >
                    <MapPin size={28} fill="currentColor" />
                    <span className={styles.pinPulse} />
                    <div className={styles.miniLabel}>
                      {p.gender === "Girls Only" ? "♀️ Girls" : p.gender === "Boys Only" ? "♂️ Boys" : "🤝 Co-Ed"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Selected Hostel Detail Panel (with 3D Tilt Card) */}
          <div className={styles.detailPanel}>
            {selectedProp ? (
              <div 
                className={`${styles.hostelCard} ${styles.tiltCard}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Image Section */}
                <div className={styles.imageBox}>
                  <Image 
                    src={selectedProp.image} 
                    alt={selectedProp.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.roomImg}
                  />
                  <div className={styles.genderBadge} data-gender={selectedProp.type}>
                    {selectedProp.gender}
                  </div>
                </div>

                {/* Content Section */}
                <div className={styles.cardContent}>
                  <div className={styles.ratingRow}>
                    <div className={styles.ratingBadge}>
                      <Star size={12} fill="currentColor" />
                      <span>{selectedProp.rating}</span>
                    </div>
                  </div>

                  <h3 className={styles.hostelName}>{selectedProp.name}</h3>
                  <span className={styles.taglineText}>{selectedProp.tagline}</span>
                  <p className={styles.descriptionText}>{selectedProp.description}</p>

                  <div className={styles.amenitiesRow}>
                    {selectedProp.amenities.map((amenity, idx) => (
                      <span key={idx} className={styles.amenityBadge}>
                        <Check size={10} style={{ color: "#25D366", marginRight: "4px" }} />
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className={styles.ctaRow}>
                    <Link href={`/hostels/${selectedProp.slug}`} style={{ textDecoration: "none", flex: 1 }}>
                      <Button style={{ width: "100%" }}>
                        <span>Explore Bed Formats</span>
                        <ArrowRight size={14} style={{ marginLeft: "6px" }} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.emptyCard}>
                <Info size={36} color="var(--primary)" />
                <h4>Select a Location</h4>
                <p>Click on any marker on the map to view hostel details, rent pricing, and available bookings.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
