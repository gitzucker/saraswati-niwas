"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./CityExplorer.module.css";
import ScrollReveal from "../shared/ScrollReveal";
import { ArrowUpRight } from "lucide-react";

export default function CityExplorer() {
  const localities = [
    {
      id: "kp3",
      name: "Knowledge Park 3",
      slug: "knowledge-park-3",
      beds: "250+ Beds",
      image: "/images/cities/knowledge-park.png"
    },
    {
      id: "kp2",
      name: "Knowledge Park 2",
      slug: "knowledge-park-2",
      beds: "100+ Beds",
      image: "/images/properties/common-area.png"
    }
  ];

  return (
    <section className={`${styles.section} section`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <ScrollReveal animation="fadeUp">
            <span className={styles.tagline}>Select Location</span>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={100}>
            <h2 className={styles.title}>Explore Localities in Greater Noida</h2>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={200}>
            <p className={styles.description}>
              We are strategically located near major universities, business centers, markets, and metro connections.
            </p>
          </ScrollReveal>
        </div>

        <div className={styles.grid}>
          {localities.map((loc, index) => (
            <ScrollReveal
              key={loc.id}
              animation="fadeUp"
              delay={index * 120}
              className={styles.itemReveal}
            >
              <Link href={`/hostels?area=${encodeURIComponent(loc.name)}`} className={styles.card}>
                <div className={styles.imageContainer}>
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className={styles.overlay} />
                  <div className={styles.content}>
                    <div className={styles.titleRow}>
                      <h3>{loc.name}</h3>
                      <div className={styles.arrowIcon}>
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                    <span className={styles.bedsLabel}>{loc.beds}</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
