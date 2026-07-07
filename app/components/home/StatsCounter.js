"use client";

import styles from "./StatsCounter.module.css";
import ScrollReveal from "../shared/ScrollReveal";
import AnimatedCounter from "../shared/AnimatedCounter";
import { Home, MapPin, Users, ShieldAlert } from "lucide-react";

export default function StatsCounter() {
  const stats = [
    { id: 1, end: 3500, suffix: "+", label: "Happy Students Served", icon: Users, color: "violet" },
    { id: 2, end: 5, suffix: "+", label: "Hostel Locations", icon: MapPin, color: "coral" },
    { id: 3, end: 100, suffix: "%", label: "Security & Safety", icon: ShieldAlert, color: "yellow" },
    { id: 4, end: 24, suffix: "/7", label: "Warden Support", icon: Home, color: "teal" }
  ];

  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className={styles.grid}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal
                key={stat.id}
                animation="fadeUp"
                delay={index * 100}
                className={styles.revealWrapper}
              >
                <div className={`${styles.statCard} ${styles[`card-${stat.color}`]}`}>
                  <div className={styles.iconCircle}>
                    <Icon size={24} />
                  </div>
                  <div className={styles.numberWrapper}>
                    <AnimatedCounter
                      end={stat.end}
                      suffix={stat.suffix}
                      duration={1500}
                      className={styles.counterValue}
                    />
                  </div>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
