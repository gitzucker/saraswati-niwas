"use client";

import styles from "./CTABanner.module.css";
import ScrollReveal from "../shared/ScrollReveal";
import TallyForm from "../shared/TallyForm";
import { Sparkles, Calendar, PhoneCall } from "lucide-react";

export default function CTABanner() {
  const tallyFormId = process.env.NEXT_PUBLIC_TALLY_CONTACT_FORM_ID;

  return (
    <section className={styles.ctaSection}>
      {/* Background Orbs */}
      <div className={styles.glowOrb1} />
      <div className={styles.glowOrb2} />

      <div className="container">
        <div className={styles.grid}>
          {/* Left info content */}
          <div className={styles.infoContent}>
            <ScrollReveal animation="fadeUp">
              <div className={styles.sparkleBadge}>
                <Sparkles size={14} />
                <span>Limited Beds Left for 2026 Batch</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={100}>
              <h2 className={styles.title}>Ready to Find Your Home Away From Home?</h2>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={200}>
              <p className={styles.desc}>
                Fill out the quick form to book an physical visit or lock in your preferred room rate. Our Greater Noida wardens will guide you through the check-in documentation.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={300}>
              <div className={styles.quickContact}>
                <div className={styles.contactItem}>
                  <div className={styles.iconCircle}>
                    <Calendar size={20} />
                  </div>
                  <div className={styles.contactText}>
                    <strong>Instant Visit Scheduling</strong>
                    <span>Pick a date & inspect same-day</span>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.iconCircle}>
                    <PhoneCall size={20} />
                  </div>
                  <div className={styles.contactText}>
                    <strong>Direct Hotline Support</strong>
                    <span>Call warden at +91 92119 34081</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right embedded form */}
          <div className={styles.formContainer}>
            <ScrollReveal animation="scaleUp" delay={200}>
              <TallyForm formId={tallyFormId} className={styles.formCard} />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
