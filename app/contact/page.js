"use client";

import styles from "./page.module.css";
import ScrollReveal from "../components/shared/ScrollReveal";
import TallyForm from "../components/shared/TallyForm";
import GoogleMapWrapper from "../components/shared/GoogleMapWrapper";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const tallyContactFormId = process.env.NEXT_PUBLIC_TALLY_CONTACT_FORM_ID;

  const contactDetails = [
    {
      id: 1,
      title: "Call Us",
      value: "+91 92119 34081",
      desc: "Talk to our central support team.",
      icon: Phone,
      color: "violet"
    },
    {
      id: 2,
      title: "Email Support",
      value: "support@saraswatiniwas.com",
      desc: "Send us your queries anytime.",
      icon: Mail,
      color: "coral"
    },
    {
      id: 3,
      title: "Office Address",
      value: "Knowledge Park 2, Greater Noida",
      desc: "Near GL Bajaj College Campus.",
      icon: MapPin,
      color: "teal"
    },
    {
      id: 4,
      title: "Visiting Hours",
      value: "9:00 AM - 8:00 PM",
      desc: "Daily (including Sunday visits).",
      icon: Clock,
      color: "yellow"
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <div className="container">
        
        {/* Header */}
        <div className={styles.sectionHeader}>
          <ScrollReveal animation="fadeUp">
            <span className={styles.tagline}>Reach Out</span>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={100}>
            <h1 className={styles.title}>Contact Saraswati Niwas</h1>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={200}>
            <p className={styles.description}>
              Have an inquiry? Reach out to us via form, direct call, or visit our central branch in Knowledge Park 2.
            </p>
          </ScrollReveal>
        </div>

        {/* Contact Info Cards */}
        <div className={styles.infoGrid}>
          {contactDetails.map((item, i) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.id} animation="fadeUp" delay={i * 100}>
                <div className={`${styles.infoCard} ${styles[`card-${item.color}`]}`}>
                  <div className={styles.iconCircle}>
                    <Icon size={22} />
                  </div>
                  <h3>{item.title}</h3>
                  <strong>{item.value}</strong>
                  <p>{item.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Form + Map Split */}
        <div className={styles.splitGrid}>
          
          {/* Form */}
          <div className={styles.formContainer}>
            <ScrollReveal animation="slideLeft">
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <MessageCircle size={20} className={styles.formIcon} />
                  <h3>Send a Message</h3>
                </div>
                <p className={styles.formText}>Fill out this form and our admissions team will get back to you within 2 hours.</p>
                <TallyForm formId={tallyContactFormId} />
              </div>
            </ScrollReveal>
          </div>

          {/* Map */}
          <div className={styles.mapContainer}>
            <ScrollReveal animation="slideRight">
              <div className={styles.mapCard}>
                <div className={styles.mapHeader}>
                  <MapPin size={20} className={styles.mapIcon} />
                  <h3>Locate Our Branches</h3>
                </div>
                <div className={styles.mapWrapper}>
                  <GoogleMapWrapper height="100%" />
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </div>
  );
}
