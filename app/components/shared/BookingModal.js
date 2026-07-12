"use client";

import { useState } from "react";
import { X } from "lucide-react";
import styles from "./BookingModal.module.css";
import Button from "./Button";
import { supabase } from "../../lib/supabase";

export default function BookingModal({
  isOpen,
  onClose,
  propertyName,
  preSelectedOption = "visit"
}) {
  const [option, setOption] = useState(preSelectedOption);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Safely try inserting to Supabase if it's configured and not using placeholders
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const isConfigured = 
        supabaseUrl && 
        supabaseUrl !== "https://placeholder.supabase.co" && 
        supabaseAnonKey && 
        supabaseAnonKey !== "placeholderAnonKey";

      if (isConfigured) {
        try {
          const { error } = await supabase
            .from('bookings')
            .insert([
              { 
                name, 
                phone, 
                email, 
                intent: option, 
                property_name: propertyName || "Saraswati Niwas" 
              }
            ]);
            
          if (error) {
            console.error("Supabase error (non-blocking):", error);
          }
        } catch (dbError) {
          console.error("Database connection failed (non-blocking):", dbError);
        }
      } else {
        console.warn("Supabase is not configured (using placeholder). Skipping database write.");
      }
      
      // Format the WhatsApp message
      const adminPhone = "919211934081";
      const bookingType = option === "visit" ? "Hostel Visit" : "Call Back Request";
      const property = propertyName || "Saraswati Niwas";
      const message = `*New ${bookingType}*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Property:* ${property}\n\nI would like to ${option === "visit" ? "schedule a visit" : "request a call back"}. Please contact me.`;
      const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
      
      // Reset form
      setName("");
      setPhone("");
      setEmail("");
      onClose();
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("There was an error redirecting to WhatsApp. Please try again or contact support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        <h3>Book Your Stay at {propertyName || "Saraswati Niwas"}</h3>
        <p>Please provide your details below and choose how you would like us to assist you.</p>

        <form onSubmit={handleSubmit} className={styles.formGrid}>
          
          <div className={styles.formGroup}>
            <label>I want to:</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="bookingType" 
                  value="visit" 
                  checked={option === "visit"} 
                  onChange={() => setOption("visit")}
                />
                Schedule a Visit
              </label>
              <label className={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="bookingType" 
                  value="call" 
                  checked={option === "call"} 
                  onChange={() => setOption("call")}
                />
                Request a Call Back
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              required 
              placeholder="e.g. Aarav Sharma" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              required 
              placeholder="e.g. +91 92119 34081" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              required 
              placeholder="e.g. aarav@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button type="submit" variant="primary" fullWidth loading={isSubmitting}>
            {option === "visit" ? "Schedule Visit" : "Request Call Back"}
          </Button>
        </form>
      </div>
    </div>
  );
}
