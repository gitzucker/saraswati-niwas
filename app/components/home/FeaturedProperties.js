"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./FeaturedProperties.module.css";
import ScrollReveal from "../shared/ScrollReveal";
import Button from "../shared/Button";
import { Star, MapPin, ArrowRight, ShieldCheck, Heart } from "lucide-react";

export default function FeaturedProperties() {
  // Static mock properties list (using official branches)
  const properties = [
    {
      id: "prop-b1",
      slug: "saraswati-niwas-b1-branch",
      name: "Saraswati Niwas - B1 Branch",
      location: "Alpha 2, Greater Noida",
      rating: 4.8,
      reviews: 124,
      gender: "male",
      genderLabel: "Boys Only",
      image: "/images/properties/room-interior.png",
      amenities: ["WiFi", "AC", "Laundry", "Food"]
    },
    {
      id: "prop-b17",
      slug: "saraswati-niwas-b17-girls-branch",
      name: "Saraswati Niwas - B17 Branch (Girls)",
      location: "Knowledge Park 3, Greater Noida",
      rating: 4.9,
      reviews: 142,
      gender: "female",
      genderLabel: "Girls Only",
      image: "/images/properties/study-room.png",
      amenities: ["WiFi", "AC", "Security", "Food"]
    },
    {
      id: "prop-b10",
      slug: "saraswati-niwas-b10-branch",
      name: "Saraswati Niwas - B10 Branch",
      location: "Knowledge Park 3, Greater Noida",
      rating: 4.7,
      reviews: 92,
      gender: "male",
      genderLabel: "Boys Only",
      image: "/images/properties/common-area.png",
      amenities: ["WiFi", "AC", "Gym", "Food"]
    }
  ];

  return (
    <section className={`${styles.section} section`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <ScrollReveal animation="fadeUp">
              <span className={styles.tagline}>Popular Stays</span>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={100}>
              <h2 className={styles.title}>Featured Hostels in <span className="gradient-text">Greater Noida</span></h2>
            </ScrollReveal>
          </div>
          <div className={styles.headerRight}>
            <ScrollReveal animation="fadeUp" delay={200}>
              <Button href="/hostels" variant="outline">
                <span>View All Properties</span>
                <ArrowRight size={18} />
              </Button>
            </ScrollReveal>
          </div>
        </div>

        <div className={styles.grid}>
          {properties.map((property, index) => (
            <ScrollReveal
              key={property.id}
              animation="fadeUp"
              delay={index * 150}
              className={styles.cardReveal}
            >
              <div className={styles.card}>
                <Link href={`/hostels/${property.slug}`} className={styles.imageLink}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={property.image}
                      alt={property.name}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className={styles.overlayTags}>
                      <span className={`${styles.genderBadge} ${styles[property.gender]}`}>
                        {property.genderLabel}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className={styles.cardBody}>
                  <div className={styles.metaRow}>
                    <div className={styles.location}>
                      <MapPin size={14} className={styles.locIcon} />
                      <span>{property.location}</span>
                    </div>
                    <div className={styles.rating}>
                      <Star size={14} fill="var(--yellow)" stroke="var(--yellow)" />
                      <span>{property.rating}</span>
                      <span className={styles.reviewsCount}>({property.reviews})</span>
                    </div>
                  </div>

                  <Link href={`/hostels/${property.slug}`}>
                    <h3 className={styles.propertyName}>{property.name}</h3>
                  </Link>

                  <div className={styles.amenities}>
                    {property.amenities.map((amenity, i) => (
                      <span key={i} className={styles.amenityTag}>
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className={styles.cardDivider} />

                  <div className={styles.footerRow}>
                    <Button
                      href={`/hostels/${property.slug}`}
                      variant="primary"
                      fullWidth
                      className={styles.bookBtn}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
