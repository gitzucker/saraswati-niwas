"use client";

import styles from "./AmenitiesShowcase.module.css";
import ScrollReveal from "../shared/ScrollReveal";
import {
  Wifi,
  Wind,
  Utensils,
  ShieldCheck,
  Shirt,
  Zap,
  Dumbbell,
  BookOpen,
  Tv,
  Cctv,
  Library,
  Users,
  Trees,
  ParkingCircle,
  HeartHandshake
} from "lucide-react";

export default function AmenitiesShowcase() {
  const amenities = [
    { id: 1, name: "High-Speed WiFi", icon: Wifi, desc: "200 Mbps unlimited connectivity in all zones." },
    { id: 2, name: "Air Conditioning", icon: Wind, desc: "Climate-controlled energy efficient split ACs." },
    { id: 3, name: "Hygienic 4-Meals", icon: Utensils, desc: "Fresh Indian meals prepared in segregated kitchens." },
    { id: 4, name: "3-Tier Security", icon: ShieldCheck, desc: "Biometric gates + round-the-clock patrol." },
    { id: 5, name: "Weekly Laundry", icon: Shirt, desc: "Washing, drying and ironing services included." },
    { id: 6, name: "Power Backup", icon: Zap, desc: "24/7 generator backup ensures zero study lag." },
    { id: 7, name: "In-House Gym", icon: Dumbbell, desc: "Equipped weights & cardio stations." },
    { id: 8, name: "Quiet Study Rooms", icon: BookOpen, desc: "Soundproof spaces with study desks." },
    { id: 9, name: "Recreation Hub", icon: Tv, desc: "Pool table, TV, board games and lounge." },
    { id: 10, name: "CCTV Surveillance", icon: Cctv, desc: "Continuous monitoring for student safety." },
    { id: 11, name: "Reference Library", icon: Library, desc: "A quiet space stocked with academic books and journals." },
    { id: 12, name: "Parents Lounge", icon: Users, desc: "A cozy visiting area for parents and family guests." },
    { id: 13, name: "Outdoor Playground", icon: Trees, desc: "Green open spaces for sports, walks, and fresh air." },
    { id: 14, name: "Secure Parking", icon: ParkingCircle, desc: "Dedicated parking zones for student vehicles." },
    { id: 15, name: "Counselling Room", icon: HeartHandshake, desc: "A private space for mental wellness and guidance." }
  ];

  return (
    <section className={`${styles.section} section`}>
      <div className={styles.bgOverlay} />
      <div className="container">
        <div className={styles.sectionHeader}>
          <ScrollReveal animation="fadeUp">
            <span className={styles.tagline}>Next-Gen Facilities</span>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={100}>
            <h2 className={styles.title}>All-Inclusive <span className="gradient-text">Signature Amenities</span></h2>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={200}>
            <p className={styles.description}>
              We provide everything you need to study, work, and relax. No hidden bills, no maintenance chores.
            </p>
          </ScrollReveal>
        </div>

        <div className={styles.grid}>
          {amenities.map((amenity, index) => {
            const Icon = amenity.icon;
            return (
              <ScrollReveal
                key={amenity.id}
                animation="fadeUp"
                delay={index * 80}
                className={styles.itemReveal}
              >
                <div className={styles.amenityCard}>
                  <div className={styles.iconCircle}>
                    <Icon size={24} />
                  </div>
                  <h3>{amenity.name}</h3>
                  <p>{amenity.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
