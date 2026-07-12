"use client";

import styles from "./HowItWorks.module.css";
import ScrollReveal from "../shared/ScrollReveal";
import LottieWrapper from "../shared/LottieWrapper";
import { Search, Calendar, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Discover Your Stay",
      description: "Search hostels and PGs in Greater Noida. Filter by budget, occupancy, locality, and preferred amenities.",
      icon: Search,
      color: "violet",
      lottiePlaceholder: null
    },
    {
      id: 2,
      title: "Schedule Free Visit",
      description: "Book an inspection visit online. Our local wardens will show you around the rooms, dining spaces, and common areas.",
      icon: Calendar,
      color: "coral",
      lottiePlaceholder: null
    },
    {
      id: 3,
      title: "Book & Check-In",
      description: "Reserve your bed with a single-month security deposit. Sign a digital agreement and move in hassle-free.",
      icon: CheckCircle,
      color: "teal",
      lottiePlaceholder: null
    }
  ];

  return (
    <section className={`${styles.section} section`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <ScrollReveal animation="fadeUp">
            <span className={styles.tagline}>Simple Process</span>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={100}>
            <h2 className={styles.title}>How Booking Works</h2>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={200}>
            <p className={styles.description}>
              Reserve your elevated space at Saraswati Niwas in 3 simple steps without any third-party broker fees.
            </p>
          </ScrollReveal>
        </div>

        <div className={styles.grid}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <ScrollReveal
                key={step.id}
                animation="fadeUp"
                delay={index * 200}
                className={styles.stepReveal}
              >
                <div className={styles.stepCard}>
                  {/* Step Connector Line for desktop */}
                  {index < steps.length - 1 && <div className={styles.connector} />}

                  <div className={`${styles.iconContainer} ${styles[`icon-${step.color}`]}`}>
                    <div className={styles.stepNumber}>{step.id}</div>
                    {step.lottiePlaceholder ? (
                      <LottieWrapper animationData={step.lottiePlaceholder} className={styles.lottie} />
                    ) : (
                      <Icon size={40} className={styles.fallbackIcon} />
                    )}
                  </div>

                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
