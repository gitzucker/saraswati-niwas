"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Button from "../components/shared/Button";
import ScrollReveal from "../components/shared/ScrollReveal";
import { 
  Calculator, 
  MapPin, 
  Scale, 
  Calendar, 
  Bus, 
  Gift, 
  CheckCircle, 
  Star, 
  Shield, 
  Check, 
  AlertCircle,
  Clock,
  Compass,
  ArrowRight,
  Wifi,
  Dumbbell
} from "lucide-react";

// 1. Commute timelines details
const CAMPUS_COMMUTE_DATA = {
  glbajaj: {
    name: "GL Bajaj Institute",
    shuttle: "4 mins",
    auto: "6 mins",
    metro: "Knowledge Park II (0.4 km)",
    walking: "5 mins"
  },
  iimt: {
    name: "IIMT Group of Colleges",
    shuttle: "3 mins",
    auto: "5 mins",
    metro: "Knowledge Park II (0.6 km)",
    walking: "7 mins"
  },
  sharda: {
    name: "Sharda University",
    shuttle: "8 mins",
    auto: "10 mins",
    metro: "Knowledge Park II (1.2 km)",
    walking: "15 mins"
  },
  galgotias: {
    name: "Galgotias University",
    shuttle: "10 mins",
    auto: "12 mins",
    metro: "Knowledge Park II (1.8 km)",
    walking: "22 mins"
  },
  gbu: {
    name: "Gautam Buddha University",
    shuttle: "15 mins",
    auto: "18 mins",
    metro: "Delta 1 Metro (3.2 km)",
    walking: "45 mins"
  }
};

// 2. Stays details
const PROPERTIES_COMPARE_DATA = [
  {
    name: "B1 Branch",
    locality: "Knowledge Park 2",
    occupancy: "Single, Double",
    metro: "KP II Metro (0.3 km)",
    rating: 4.8,
    amenities: ["AC/Non-AC", "High-speed Wi-Fi", "Laundry Setup", "4 Meals Mess", "Biometrics"]
  },
  {
    name: "B10 Branch",
    locality: "Knowledge Park 3",
    occupancy: "Single, Double",
    metro: "KP II Metro (0.4 km)",
    rating: 4.7,
    amenities: ["AC Setup", "Wi-Fi Fiber", "Study Rooms", "Mess Meals", "Gym Access"]
  },
  {
    name: "B16 Branch",
    locality: "Knowledge Park 3",
    occupancy: "Double, Triple",
    metro: "KP II Metro (0.5 km)",
    rating: 4.6,
    amenities: ["Wi-Fi Fiber", "Weekly Laundry", "Food Mess", "CCTV Security", "Lounge"]
  },
  {
    name: "B17 Branch (Girls)",
    locality: "Knowledge Park 3",
    occupancy: "Single, Double, Triple",
    metro: "KP II Metro (0.3 km)",
    rating: 4.9,
    amenities: ["Biometrics", "AC Rooms", "Study Lounge", "Full Mess", "Full-time Warden"]
  },
  {
    name: "AR1 Branch",
    locality: "Knowledge Park 3",
    occupancy: "Double, Triple",
    metro: "KP II Metro (0.6 km)",
    rating: 4.7,
    amenities: ["AC Setup", "Wi-Fi Fiber", "Mess Food", "Power Backup", "Biometrics"]
  },
  {
    name: "AR2 Branch (Girls)",
    locality: "Knowledge Park 3",
    occupancy: "Single, Double",
    metro: "KP II Metro (0.5 km)",
    rating: 4.8,
    amenities: ["AC Setup", "Biometrics", "Laundry", "Nutritious Mess", "Study Desks"]
  }
];

// 3. Timetables
const SHUTTLE_SCHEDULES = [
  {
    route: "Route A (Morning Express)",
    stops: "Saraswati Niwas KP2 → GL Bajaj → IIMT → Sharda University",
    timings: "08:15 AM, 08:45 AM, 09:15 AM",
    frequency: "Every 30 Mins"
  },
  {
    route: "Route B (Galgotias Special)",
    stops: "Saraswati Niwas Pari Chowk → Knowledge Park 2 → Galgotias Campus",
    timings: "08:00 AM, 08:30 AM, 09:00 AM",
    frequency: "Every 30 Mins"
  },
  {
    route: "Route C (Return Batch - Afternoon)",
    stops: "Sharda Univ → Galgotias → GL Bajaj → All Saraswati Branches",
    timings: "02:30 PM, 04:30 PM, 05:30 PM",
    frequency: "Scheduled"
  },
  {
    route: "Route D (Late Evening Return)",
    stops: "Knowledge Park Colleges → Pari Chowk → Knowledge Park 2 Branches",
    timings: "06:30 PM, 07:30 PM",
    frequency: "Daily"
  }
];

const BASE_RENTS = {
  single: 6500,
  double: 4800,
  triple: 3800
};

export default function ExploreHub() {
  const [activeTab, setActiveTab] = useState("commute");

  // State: Rent Calculator
  const [occupancy, setOccupancy] = useState("double");
  const [addons, setAddons] = useState({
    ac: false,
    internet: false,
    gym: false,
    meals: false
  });

  // State: Commute Finder
  const [selectedCollege, setSelectedCollege] = useState("glbajaj");

  // State: Schedule Visit
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [visitBranch, setVisitBranch] = useState("kp2");
  const [visitForm, setVisitForm] = useState({ name: "", email: "", phone: "" });
  const [visitSuccess, setVisitSuccess] = useState(false);

  // State: Refer & Earn
  const [referForm, setReferForm] = useState({ friendName: "", friendEmail: "", friendCollege: "GL Bajaj" });
  const [generatedCode, setGeneratedCode] = useState("");
  const [isScratched, setIsScratched] = useState(false);

  // Helper: Card mouse 3D tilt effect
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const rx = -(y / (box.height / 2)) * 12; // tilt max 12deg
    const ry = (x / (box.width / 2)) * 12;
    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  const handleAddonToggle = (key) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateTotalRent = () => {
    let rent = BASE_RENTS[occupancy];
    if (addons.ac) rent += 1500;
    if (addons.internet) rent += 300;
    if (addons.gym) rent += 500;
    if (addons.meals) rent += 1000;
    return rent;
  };

  // Helper: Days list builder
  const getCalendarDays = () => {
    const today = new Date();
    const days = [];
    for (let i = 1; i <= 14; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      days.push(nextDate);
    }
    return days;
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !visitForm.name || !visitForm.phone) {
      alert("Please select a date, time slot, and fill your contact details.");
      return;
    }
    setVisitSuccess(true);
  };

  const handleReferSubmit = (e) => {
    e.preventDefault();
    if (!referForm.friendName || !referForm.friendEmail) {
      alert("Please enter your friend's details.");
      return;
    }
    const cleanName = referForm.friendName.toUpperCase().replace(/\s+/g, "");
    setGeneratedCode(`SN-REF-${cleanName}-${Math.floor(100 + Math.random() * 900)}`);
    setIsScratched(false); // Reset scratch ticket state
  };

  return (
    <div className={styles.pageContainer}>
      {/* Modal Dialog */}
      {visitSuccess && (
        <>
          <div className={styles.modalBackdrop} onClick={() => setVisitSuccess(false)} />
          <div className={styles.successModal}>
            <div className={styles.successIcon}>
              <CheckCircle size={56} fill="currentColor" stroke="#ffffff" />
            </div>
            <h3>Free Visit Booked!</h3>
            <p>
              Hi {visitForm.name}, your tour of Saraswati Niwas has been scheduled for <strong>{selectedDate?.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</strong> at <strong>{selectedTime}</strong>. 
              <br /><br />
              Directions and coordinate details have been sent to <strong>{visitForm.phone}</strong>. See you there!
            </p>
            <Button onClick={() => {
              setVisitSuccess(false);
              setVisitForm({ name: "", email: "", phone: "" });
              setSelectedDate(null);
              setSelectedTime("");
            }}>Awesome, Close</Button>
          </div>
        </>
      )}

      <div className="container">
        {/* Header */}
        <div className={styles.hubHeader}>
          <ScrollReveal animation="fadeUp">
            <span className={styles.tagline}>Interactive Tools</span>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={100}>
            <h1 className={styles.title}>Explore Student Hub</h1>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={200}>
            <p className={styles.description}>
              Use our interactive calculators, campus travel maps, and scheduling widgets to plan your stay at Greater Noida's best co-living network.
            </p>
          </ScrollReveal>
        </div>

        {/* Unified Dashboard Grid */}
        <div className={styles.dashboard}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <span className={styles.sidebarTitle}>Navigation Menu</span>
            <button 
              onClick={() => setActiveTab("commute")}
              className={`${styles.tabBtn} ${activeTab === "commute" ? styles.activeTabBtn : ""}`}
            >
              <MapPin size={18} />
              <span>Campus Commute</span>
            </button>
            <button 
              onClick={() => setActiveTab("compare")}
              className={`${styles.tabBtn} ${activeTab === "compare" ? styles.activeTabBtn : ""}`}
            >
              <Scale size={18} />
              <span>Compare Stays</span>
            </button>
            <button 
              onClick={() => setActiveTab("scheduler")}
              className={`${styles.tabBtn} ${activeTab === "scheduler" ? styles.activeTabBtn : ""}`}
            >
              <Calendar size={18} />
              <span>Schedule a Visit</span>
            </button>
            <button 
              onClick={() => setActiveTab("shuttle")}
              className={`${styles.tabBtn} ${activeTab === "shuttle" ? styles.activeTabBtn : ""}`}
            >
              <Bus size={18} />
              <span>Shuttle Routes</span>
            </button>
            <button 
              onClick={() => setActiveTab("referral")}
              className={`${styles.tabBtn} ${activeTab === "referral" ? styles.activeTabBtn : ""}`}
            >
              <Gift size={18} />
              <span>Refer & Earn</span>
            </button>
          </aside>

          {/* Tab Panel Content Area */}
          <main className={styles.contentArea}>


            {/* TAB 2: COMMUTE FINDER */}
            {activeTab === "commute" && (
              <div>
                <div className={styles.tabHeader}>
                  <h2 className={styles.tabTitle}>Interactive Campus Distance Finder</h2>
                  <p className={styles.tabDescription}>Select your college in Greater Noida to instantly check travel times and commute timelines from Saraswati Niwas.</p>
                </div>

                <div className={styles.formGroup} style={{ maxWidth: "480px" }}>
                  <label>Select Your University / Institute</label>
                  <select 
                    value={selectedCollege} 
                    onChange={(e) => setSelectedCollege(e.target.value)}
                    className={styles.select}
                  >
                    <option value="glbajaj">GL Bajaj Institute of Technology & Management</option>
                    <option value="iimt">IIMT Group of Colleges</option>
                    <option value="sharda">Sharda University</option>
                    <option value="galgotias">Galgotias University</option>
                    <option value="gbu">Gautam Buddha University (GBU)</option>
                  </select>
                </div>

                {/* 3D Road Commute Timeline */}
                <div className={styles.commuteCard}>
                  <div className={styles.commuteTitle}>
                    <Compass size={20} className={styles.commuteIcon} />
                    <span>Transit timeline to {CAMPUS_COMMUTE_DATA[selectedCollege].name}</span>
                  </div>

                  <div className={styles.roadTimeline}>
                    <div className={styles.roadNode}>
                      <span className={styles.roadVehicle}>🚌</span>
                      <div className={styles.roadDetails}>
                        <strong>{CAMPUS_COMMUTE_DATA[selectedCollege].shuttle}</strong>
                        <span>Hostel Shuttle Service</span>
                      </div>
                    </div>

                    <div className={styles.roadNode}>
                      <span className={styles.roadVehicle}>🛺</span>
                      <div className={styles.roadDetails}>
                        <strong>{CAMPUS_COMMUTE_DATA[selectedCollege].auto}</strong>
                        <span>Auto-Rickshaw Ride</span>
                      </div>
                    </div>

                    <div className={styles.roadNode}>
                      <span className={styles.roadVehicle}>🏃</span>
                      <div className={styles.roadDetails}>
                        <strong>{CAMPUS_COMMUTE_DATA[selectedCollege].walking}</strong>
                        <span>Walking Time</span>
                      </div>
                    </div>

                    <div className={styles.roadNode}>
                      <span className={styles.roadVehicle}>🚇</span>
                      <div className={styles.roadDetails}>
                        <strong>{CAMPUS_COMMUTE_DATA[selectedCollege].metro}</strong>
                        <span>Nearest Metro Station connectivity</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: COMPARE STAYS */}
            {activeTab === "compare" && (
              <div>
                <div className={styles.tabHeader}>
                  <h2 className={styles.tabTitle}>Compare Stays Side-by-Side</h2>
                  <p className={styles.tabDescription}>Analyze and compare our 4 Greater Noida branches side-by-side to choose the best branch for your needs.</p>
                </div>

                <div className={styles.compareTableWrapper}>
                  <table className={styles.compareTable}>
                    <thead>
                      <tr>
                        <th className={styles.tablePropName}>Metric</th>
                        {PROPERTIES_COMPARE_DATA.map((p, idx) => (
                          <th key={idx}>{p.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={styles.tablePropName}>Locality</td>
                        {PROPERTIES_COMPARE_DATA.map((p, idx) => (
                          <td key={idx} style={{ fontWeight: 700 }}>{p.locality}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className={styles.tablePropName}>Room Occupancy</td>
                        {PROPERTIES_COMPARE_DATA.map((p, idx) => (
                          <td key={idx}>{p.occupancy}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className={styles.tablePropName}>Nearest Metro</td>
                        {PROPERTIES_COMPARE_DATA.map((p, idx) => (
                          <td key={idx} style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{p.metro}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className={styles.tablePropName}>Rating</td>
                        {PROPERTIES_COMPARE_DATA.map((p, idx) => (
                          <td key={idx}>
                            <div className={styles.starRating}>
                              <Star size={12} fill="currentColor" />
                              <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>{p.rating}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className={styles.tablePropName}>Key Amenities</td>
                        {PROPERTIES_COMPARE_DATA.map((p, idx) => (
                          <td key={idx} style={{ fontSize: "0.8rem" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                              {p.amenities.slice(0, 3).map((a, i) => (
                                <span key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                  <Check size={12} style={{ color: "#25D366" }} /> {a}
                                </span>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: SCHEDULE VISIT */}
            {activeTab === "scheduler" && (
              <div>
                <div className={styles.tabHeader}>
                  <h2 className={styles.tabTitle}>Schedule a Visit</h2>
                  <p className={styles.tabDescription}>Book a free tour of any Saraswati Niwas branch. Select a date, choose a time slot, and our warden will coordinate with you.</p>
                </div>

                <form onSubmit={handleScheduleSubmit} className={styles.calendarContainer}>
                  {/* Calendar Dates Grid */}
                  <div>
                    <div className={styles.formGroup}>
                      <label>Select Target Branch</label>
                      <select 
                        value={visitBranch} 
                        onChange={(e) => setVisitBranch(e.target.value)}
                        className={styles.select}
                      >
                        <option value="kp2">Saraswati Niwas - Knowledge Park 2 (Near Sharda/GL Bajaj)</option>
                        <option value="kp3">Saraswati Niwas - Knowledge Park 3 (B10/B16/B17/AR1/AR2)</option>
                        <option value="iimt">Saraswati Niwas - Near IIMT</option>
                        <option value="parichowk">Saraswati Niwas - Pari Chowk</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Select Date (Next 14 Days)</label>
                      <div className={styles.calendarGrid}>
                        {getCalendarDays().map((date, idx) => {
                          const isSelected = selectedDate?.toDateString() === date.toDateString();
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setSelectedDate(date)}
                              className={`${styles.calDay} ${isSelected ? styles.calDayActive : ""}`}
                            >
                              <span style={{ display: "block", fontSize: "0.55rem", opacity: 0.7, textTransform: "uppercase" }}>
                                {date.toLocaleDateString("en-IN", { weekday: "short" })}
                              </span>
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Booking Slots Forms */}
                  <div>
                    <div className={styles.formGroup}>
                      <label>Select Time Slot</label>
                      <div className={styles.timeSlotsGrid}>
                        {["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM"].map((time) => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`${styles.timeBtn} ${isSelected ? styles.timeBtnActive : ""}`}
                            >
                              <Clock size={12} style={{ display: "inline", marginRight: "4px" }} />
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Your Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter full name" 
                        required 
                        value={visitForm.name} 
                        onChange={(e) => setVisitForm(prev => ({ ...prev, name: e.target.value }))}
                        className={styles.input} 
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>WhatsApp Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="Enter 10-digit phone number" 
                        required 
                        value={visitForm.phone}
                        onChange={(e) => setVisitForm(prev => ({ ...prev, phone: e.target.value }))}
                        className={styles.input} 
                      />
                    </div>

                    <Button type="submit" style={{ width: "100%", marginTop: "12px" }}>
                      Book Free Tour Schedule
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 5: SHUTTLE SCHEDULE */}
            {activeTab === "shuttle" && (
              <div>
                <div className={styles.tabHeader}>
                  <h2 className={styles.tabTitle}>Hostel Shuttle Routes</h2>
                  <p className={styles.tabDescription}>Timetable of our daily shuttle services drop-and-pickup routes from hostels to Greater Noida college campuses.</p>
                </div>

                <div className={styles.shuttleTimetable}>
                  {SHUTTLE_SCHEDULES.map((s, idx) => (
                    <div key={idx} className={styles.shuttleRouteRow}>
                      <div className={styles.routeInfo}>
                        <h4>{s.route}</h4>
                        <p>{s.stops}</p>
                      </div>
                      <div className={styles.routeTimings}>
                        <Clock size={12} style={{ display: "inline", marginRight: "6px" }} />
                        {s.timings}
                      </div>
                      <div className={styles.routeFrequency}>
                        {s.frequency}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: REFER & EARN */}
            {activeTab === "referral" && (
              <div>
                <div className={styles.tabHeader}>
                  <h2 className={styles.tabTitle}>Refer & Earn Program</h2>
                  <p className={styles.tabDescription}>Refer a friend to any Saraswati Niwas hostel. When they book a stay, both you and your friend get ₹1,000 off on rent!</p>
                </div>

                <div className={styles.referContainer}>
                  {/* Form */}
                  <form onSubmit={handleReferSubmit} className={styles.referralForm}>
                    <div className={styles.formGroup}>
                      <label>Friend's Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter friend's name" 
                        required
                        value={referForm.friendName}
                        onChange={(e) => setReferForm(prev => ({ ...prev, friendName: e.target.value }))}
                        className={styles.input} 
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Friend's Email Address</label>
                      <input 
                        type="email" 
                        placeholder="friend@college.edu" 
                        required
                        value={referForm.friendEmail}
                        onChange={(e) => setReferForm(prev => ({ ...prev, friendEmail: e.target.value }))}
                        className={styles.input} 
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Friend's College</label>
                      <select 
                        value={referForm.friendCollege}
                        onChange={(e) => setReferForm(prev => ({ ...prev, friendCollege: e.target.value }))}
                        className={styles.select}
                      >
                        <option value="GL Bajaj">GL Bajaj Institute</option>
                        <option value="Sharda">Sharda University</option>
                        <option value="Galgotias">Galgotias University</option>
                        <option value="IIMT">IIMT Group</option>
                        <option value="Other">Other Institute</option>
                      </select>
                    </div>

                    <Button type="submit" style={{ marginTop: "12px" }}>
                      Generate Referral Code
                    </Button>
                  </form>

                  {/* 3D Gold Scratch Coupon Ticket */}
                  <div 
                    className={`${styles.promoCodeCard} ${styles.tiltCard}`}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    {generatedCode ? (
                      <>
                        <h4>Referral Ticket 🎁</h4>
                        <p style={{ fontSize: "0.8rem", opacity: 0.8, margin: "8px 0 16px 0" }}>Hover or tap below to scratch and reveal your code!</p>
                        
                        <div 
                          className={`${styles.scratchCard} ${isScratched ? styles.scratchCardRevealed : ""}`}
                          onClick={() => setIsScratched(true)}
                          onMouseEnter={() => setIsScratched(true)}
                        >
                          <div className={styles.scratchOverlay}>
                            <span>👋 SCRATCH HERE</span>
                          </div>
                          <div className={styles.codeBox}>
                            {generatedCode}
                          </div>
                        </div>

                        <Button 
                          onClick={() => {
                            if (!isScratched) {
                              alert("Please scratch the card to reveal the code first!");
                              return;
                            }
                            navigator.clipboard.writeText(generatedCode);
                            alert("Referral code copied to clipboard!");
                          }}
                          style={{ background: "#ffffff", color: "#1A1A2E", border: "none", marginTop: "24px", width: "100%" }}
                        >
                          Copy Referral Code
                        </Button>
                      </>
                    ) : (
                      <>
                        <Gift size={44} style={{ marginBottom: "16px", color: "#E5C158" }} />
                        <h4>Unlock ₹1,000 Rent Discount</h4>
                        <p style={{ maxWidth: "240px", fontSize: "0.85rem", opacity: 0.85, lineHeight: 1.5 }}>Fill out the form with your friend's details to generate a golden scratch ticket!</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
