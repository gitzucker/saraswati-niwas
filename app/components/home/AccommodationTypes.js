"use client";

import Image from "next/image";
import styles from "./AccommodationTypes.module.css";
import ScrollReveal from "../shared/ScrollReveal";
import Button from "../shared/Button";
import { ArrowRight, UserCheck, Heart, Users } from "lucide-react";

export default function AccommodationTypes() {
  const types = [
    {
      id: "boys",
      title: "Boys Hostels",
      description: "Secure, structured stays near major colleges with dedicated study spaces, fitness equipment, and recreational areas.",
      badge: "Male Only",
      image: "/images/properties/room-interior.png",
      icon: UserCheck,
      color: "blue",
      link: "/hostels?gender=male"
    },
    {
      id: "girls",
      title: "Girls Hostels",
      description: "Ultra-secure student spaces equipped with biometric gates, full-time wardens, study rooms, and robust CCTV networks.",
      badge: "Female Only",
      image: "/images/properties/study-room.png",
      icon: Heart,
      color: "coral",
      link: "/hostels?gender=female"
    }
  ];

  return (
    <section className={`${styles.section} section`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <ScrollReveal animation="fadeUp">
            <span className={styles.tagline}>Tailored To Your Lifestyle</span>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={100}>
            <h2 className={styles.title}>Stay Categories at <span className="gradient-text">Saraswati Niwas</span></h2>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={200}>
            <p className={styles.description}>
              We offer specialized accommodations suited for students, working professionals, and long-term tourists visiting Greater Noida.
            </p>
          </ScrollReveal>
        </div>

        <div className={styles.grid}>
          {types.map((type, index) => {
            const Icon = type.icon;
            return (
              <ScrollReveal
                key={type.id}
                animation="fadeUp"
                delay={index * 150}
                className={styles.cardReveal}
              >
                <div className={`${styles.card} ${styles[`card-${type.color}`]}`}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={type.image}
                      alt={type.title}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className={styles.badge}>{type.badge}</span>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.iconCircle}>
                      <Icon size={24} />
                    </div>
                    <h3>{type.title}</h3>
                    <p>{type.description}</p>
                    <Button
                      href={type.link}
                      variant="outline"
                      fullWidth
                      className={styles.cardBtn}
                    >
                      <span>Explore Rooms</span>
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
