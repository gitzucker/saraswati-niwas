"use client";

import { useEffect, useState } from "react";
import styles from "./TallyForm.module.css";
import Button from "./Button";

export default function TallyForm({
  formId,
  popup = false,
  buttonText = "Enquire Now",
  className = "",
  inlineHeight = "600px",
  onOpen,
  ...props
}) {
  const [tallyLoaded, setTallyLoaded] = useState(false);

  useEffect(() => {
    // Load Tally embed script if not already loaded
    if (popup) {
      const scriptId = "tally-js";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://tally.so/widgets/embed.js";
        script.async = true;
        script.onload = () => setTallyLoaded(true);
        document.body.appendChild(script);
      } else {
        setTallyLoaded(true);
      }
    }
  }, [popup]);

  // Fallback designed mock form if no formId is provided
  if (!formId) {
    if (popup) {
      const openWhatsApp = () => {
        window.open("https://wa.me/919211934081?text=Hi,%20I%20am%20interested%20in%20booking%20a%20room%20at%20Saraswati%20Niwas.", "_blank");
      };
      return (
        <Button onClick={openWhatsApp} className={className} {...props}>
          {buttonText}
        </Button>
      );
    }

    return (
      <div className={`${styles.mockForm} ${className}`}>
        <h3>Quick Enquiry</h3>
        <p>Send your query and our branch warden will contact you.</p>
        <form onSubmit={(e) => { e.preventDefault(); alert("Enquiry submitted successfully! We'll call you shortly."); }} className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" required placeholder="Aarav Sharma" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" required placeholder="+91 92119 34081" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="hostel">Preferred Branch</label>
            <select id="hostel">
              <option>B1 Branch (Boys)</option>
              <option>B10 Branch (Boys)</option>
              <option>B16 Branch (Boys)</option>
              <option>B17 Branch (Girls)</option>
              <option>AR1 Branch (Boys)</option>
              <option>AR2 Branch (Girls)</option>
            </select>
          </div>
          <Button type="submit" variant="primary" fullWidth>Submit Enquiry</Button>
        </form>
      </div>
    );
  }

  // Popup mode
  if (popup) {
    const openPopup = () => {
      if (typeof window !== "undefined" && window.Tally) {
        window.Tally.openPopup(formId, {
          layout: "modal",
          width: 540,
          emoji: {
            text: "🏨",
            animation: "wave"
          }
        });
        if (onOpen) onOpen();
      } else {
        // Fallback popup if script failed to load
        window.open(`https://tally.so/r/${formId}`, "_blank");
      }
    };

    return (
      <Button onClick={openPopup} className={className} {...props}>
        {buttonText}
      </Button>
    );
  }

  // Inline mode (Iframe)
  return (
    <div className={`${styles.iframeContainer} ${className}`} style={{ height: inlineHeight }}>
      <iframe
        src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
        loading="lazy"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Hostel Booking Enquiry"
        className={styles.iframe}
      />
    </div>
  );
}
