"use client";

import styles from "./HostelQuotes.module.css";
import ScrollReveal from "../shared/ScrollReveal";
import { Quote, Heart, Users, Sparkles } from "lucide-react";

export default function HostelQuotes() {
  const quotes = [
    {
      id: "q1",
      icon: Users,
      text: "Hostel life isn't just about a place to sleep; it’s where strangers become family, late-night chats become lifetime memories, and study sessions turn into success.",
      author: "Student Community Vibe",
      highlight: "strangers become family"
    },
    {
      id: "q2",
      icon: Sparkles,
      text: "Late-night chai, shared dreams, and endless laughter in secure study halls. This is where your independence builds your path to greatness.",
      author: "Independent Student Spirit",
      highlight: "path to greatness"
    },
    {
      id: "q3",
      icon: Heart,
      text: "Fueling your academic journey with a peaceful space that feels like home, food that warms the heart, and friends that double the joy.",
      author: "Comfort & Joy Balance",
      highlight: "feels like home"
    }
  ];

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.bgOverlay} />
      <div className="container">
        
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <ScrollReveal animation="fadeUp">
            <span className={styles.tagline}>Hostel Life Stories</span>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={100}>
            <h2 className={styles.title}>Inspiring <span className="gradient-text">Student Journeys</span></h2>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={200}>
            <p className={styles.subtitle}>
              Hear the heart of student living. Discover how Saraswati Niwas cultivates the perfect environment to study, build friendships, and grow.
            </p>
          </ScrollReveal>
        </div>

        {/* Quotes Cards Grid */}
        <div className={styles.grid}>
          {quotes.map((q, index) => {
            const Icon = q.icon;
            // Highlight specific parts of the quote creatively
            const parts = q.text.split(q.highlight);
            
            return (
              <ScrollReveal
                key={q.id}
                animation="fadeUp"
                delay={index * 150}
                className={styles.cardReveal}
              >
                <div className={styles.quoteCard}>
                  {/* Decorative background quote icon */}
                  <div className={styles.quoteIconDecoration}>
                    <Quote size={80} />
                  </div>
                  
                  {/* Icon Circle */}
                  <div className={styles.iconCircle}>
                    <Icon size={22} />
                  </div>

                  {/* Quote Text */}
                  <p className={styles.quoteText}>
                    "{parts[0]}
                    <span className={styles.quoteHighlight}>{q.highlight}</span>
                    {parts[1]}"
                  </p>

                  {/* Divider line */}
                  <div className={styles.cardDivider} />

                  {/* Author / Tag */}
                  <span className={styles.quoteAuthor}>— {q.author}</span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
