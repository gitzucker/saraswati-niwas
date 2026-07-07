"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getTeam } from "../lib/cms";
import ScrollReveal from "../components/shared/ScrollReveal";
import Image from "next/image";
import { Heart, Target, Lightbulb, Users, Compass } from "lucide-react";

export default function AboutPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeam().then(data => {
      setTeam(data);
      setLoading(false);
    });
  }, []);

  const values = [
    { id: 1, title: "Zero Brokerage", desc: "No hidden charges or middleman commissions, keeping stays highly affordable.", icon: Heart, color: "violet" },
    { id: 2, title: "Utmost Safety", desc: "Equipped with round-the-clock guards, CCTV monitors, and biometric gates.", icon: Target, color: "coral" },
    { id: 3, title: "Quality Dining", desc: "Fresh vegetable and meat choices prepared in segregated kitchens.", icon: Lightbulb, color: "yellow" },
    { id: 4, title: "Active Community", desc: "Engaging student events, pool tables, board games, and study circles.", icon: Compass, color: "teal" }
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Hero Banner */}
      <section className={styles.heroSection}>
        <div className={styles.heroGlow} />
        <div className="container">
          <div className={styles.heroContent}>
            <ScrollReveal animation="fadeUp">
              <span className={styles.tagline}>About Saraswati Niwas</span>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={100}>
              <h1 className={styles.title}>Redefining <span className="gradient-text">Student Living</span> in Greater Noida</h1>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={200}>
              <p className={styles.subtext}>
                We are more than just a hostel. We provide spaces designed to nurture academic excellence, foster lasting friendships, and ensure peace of mind for parents.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section">
        <div className="container">
          <div className={styles.storyGrid}>
            <ScrollReveal animation="slideLeft">
              <div className={styles.storyImageContainer}>
                <Image
                  src="/images/properties/common-area.png"
                  alt="Saraswati Niwas Common Lounge"
                  fill
                  className={styles.storyImage}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <div className={styles.storyText}>
              <ScrollReveal animation="slideRight">
                <span className={styles.subLabel}>Our Journey</span>
                <h2>How <span className="gradient-text">Saraswati Niwas</span> Began</h2>
                <p>
                  Founded with a simple mission to solve the accommodation challenges faced by students migrating to Greater Noida's educational zones. We realized that students were forced to compromise on either safety, food quality, or internet speeds.
                </p>
                <p>
                  Saraswati Niwas was built to eliminate those compromises. By combining modern facilities with warm Indian hospitality, we created fully-managed accommodations near top colleges like Galgotias, Sharda, GL Bajaj, and IIMT.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`${styles.valuesSection} section`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.tagline}>Core Values</span>
            <h2>What Drives Us Daily</h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <ScrollReveal key={v.id} animation="fadeUp" delay={i * 100}>
                  <div className={`${styles.valueCard} ${styles[`card-${v.color}`]}`}>
                    <div className={styles.valueIcon}>
                      <Icon size={24} />
                    </div>
                    <h3>{v.title}</h3>
                    <p>{v.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.tagline}>The Team</span>
            <h2>People Behind Saraswati Niwas</h2>
            <p className={styles.headerDesc}>Our management, security, and kitchen wardens work daily to ensure a seamless stay.</p>
          </div>
          
          {loading ? (
            <div className={styles.loader}>
              <div className={styles.spinner} />
            </div>
          ) : (
            <div className={styles.teamGrid}>
              {team.map((member, i) => (
                <ScrollReveal key={member.id} animation="fadeUp" delay={i * 150}>
                  <div className={styles.teamCard}>
                    <div className={styles.teamAvatar}>
                      <img src={member.image} alt={member.name} />
                    </div>
                    <h3>{member.name}</h3>
                    <span className={styles.teamRole}>{member.role}</span>
                    <p className={member.teamBio}>{member.bio}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
