"use client";

import styles from "./HeroBanner.module.css";
import SearchBar from "../shared/SearchBar";
import { GlobeInteractive } from "@/components/ui/cobe-globe-interactive";
import Button from "../shared/Button";
import ScrollReveal from "../shared/ScrollReveal";
import { ArrowRight, MapPin, Shield } from "lucide-react";

export default function HeroBanner() {
  const splineScene = process.env.NEXT_PUBLIC_SPLINE_HERO_SCENE_URL;

  return (
    <section className={styles.heroSection}>
      {/* Real Building Background with Motion */}
      <div className={styles.heroBgImage} />
      <div className={styles.heroBgOverlay} />

      {/* Dynamic Background Gradients */}
      <div className={styles.bgGlowLeft} />
      <div className={styles.bgGlowRight} />

      <div className="container">
        <div className={styles.heroGrid}>
          {/* Hero Left Content */}
          <div className={styles.heroContent}>
            <ScrollReveal animation="fadeUp" delay={0}>
              <div className={styles.badge}>
                <Shield size={14} className={styles.badgeIcon} />
                <span>3-Tier Security & Hygienic Food Guarantee</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={150}>
              <h1 className={styles.headline}>
                Enjoy <span className="gradient-text">full-utility</span> stays for <br />
                <span className="gradient-text">smart living</span> in Greater Noida.
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={300}>
              <p className={styles.subheadline}>
                Saraswati Niwas offers premium fully-managed student hostels and accommodations situated near major colleges in Knowledge Park 2 and Knowledge Park 3.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={450} className={styles.searchReveal}>
              <div className={styles.searchContainer}>
                <SearchBar />
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={600}>
              <div className={styles.quickStats}>
                <div className={styles.statItem}>
                  <strong>500+</strong>
                  <span>Beds Available</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <strong>4+</strong>
                  <span>Prime Localities</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <strong>4.8★</strong>
                  <span>Avg Resident Rating</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Hero Right Visuals (Interactive 3D Globe showing Greater Noida Hostels) */}
          <div className={styles.heroVisual}>
            <ScrollReveal animation="scaleUp" delay={300}>
              <div className={styles.splineContainer}>
                <div className={styles.globeBase} />
                <div className={styles.globePole} />
                <GlobeInteractive
                  className={`${styles.splineWrapper} ${styles.floatingGlobe}`}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
