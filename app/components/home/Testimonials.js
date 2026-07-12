"use client";

import { useState, useEffect } from "react";
import ContributorsWall from "@/components/ui/contributors-section";
import { Star, Quote, Building2, MapPin } from "lucide-react";

const indianStudents = [
  {
    username: "Aarav Sharma",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop",
    college: "GL Bajaj Institute",
    location: "Knowledge Park 2",
    rating: 5,
    feedback: "Staying at Saraswati Niwas has been a fantastic experience. The high-speed internet is perfect for my exam prep, and the food feels just like home. The security staff is very polite and always on alert."
  },
  {
    username: "Ananya Patel",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop",
    college: "Sharda University",
    location: "Knowledge Park 2",
    rating: 5,
    feedback: "The girls' security and management here are top-notch. It is close to the metro station, which is super convenient for my daily commute. The rooms are clean, spacious, and very modern."
  },
  {
    username: "Rahul Verma",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop",
    college: "IIMT Group of Colleges",
    location: "Near IIMT",
    rating: 5,
    feedback: "As an IIMT student, the location couldn't be better. The gym facilities are excellent, and the dining area is a great place to hang out with friends. Worth every rupee!"
  },
  {
    username: "Aditi Iyer",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop",
    college: "Galgotias University",
    location: "Knowledge Park 2",
    rating: 5,
    feedback: "Super clean rooms and highly cooperative staff. They resolve any maintenance issues within hours. The laundry facility has been a lifesaver for me."
  },
  {
    username: "Rohan Das",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop",
    college: "Gautam Buddha University",
    location: "Pari Chowk",
    rating: 5,
    feedback: "The studies environment here is so peaceful! There are dedicated study rooms with stable Wi-Fi that really help during exam cycles. Absolutely love it."
  },
  {
    username: "Priya Nair",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop",
    college: "ITS Dental College",
    location: "Knowledge Park 2",
    rating: 5,
    feedback: "Great experience overall! The biometric access systems make me feel extremely safe as a female resident. Food quality is consistently healthy and delicious."
  },
  {
    username: "Vikram Malhotra",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop",
    college: "GL Bajaj Institute",
    location: "Knowledge Park 3",
    rating: 5,
    feedback: "Perfect stay for students. The staff takes care of housekeeping regularly. We get active recreation rooms with pool table, TT, and board games."
  },
  {
    username: "Sneha Gupta",
    avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop",
    college: "Galgotias University",
    location: "Near IIMT",
    rating: 4,
    feedback: "Excellent management. Renting and onboarding was extremely simple through the online booking system. Highly recommended for students new to Greater Noida."
  },
  {
    username: "Arjun Mehta",
    avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop",
    college: "Sharda University",
    location: "Pari Chowk",
    rating: 5,
    feedback: "Highly managed co-living standard. The rooms are spacious, well-ventilated, and the bathrooms are clean and tidy. The electricity backup is 24/7."
  },
  {
    username: "Diya Chatterjee",
    avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop",
    college: "Gautam Buddha University",
    location: "Knowledge Park 2",
    rating: 5,
    feedback: "Best value-for-money hostel in Pari Chowk area. The location is very peaceful, and the library/study space has a really positive study atmosphere."
  },
  {
    username: "Kabir Bhatia",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop",
    college: "GL Bajaj Institute",
    location: "Knowledge Park 2",
    rating: 5,
    feedback: "I have been staying here for a year. The rooms are cleaned daily and the common spaces are well-maintained. The staff is always supportive."
  },
  {
    username: "Meera Joshi",
    avatarUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&auto=format&fit=crop",
    college: "Sharda University",
    location: "Near IIMT",
    rating: 5,
    feedback: "Security is excellent, especially for girls. The wardens are very helpful. The dining hall is always clean, and we get a variety of meals weekly."
  }
];

export default function Testimonials() {
  const [selected, setSelected] = useState(null);

  // Set default selected reviewer
  useEffect(() => {
    if (indianStudents.length > 0 && !selected) {
      setSelected(indianStudents[0]);
    }
  }, [selected]);

  const handleClick = (e) => {
    const tile = e.target.closest("[aria-label]");
    if (tile) {
      const username = tile.getAttribute("aria-label");
      const student = indianStudents.find((s) => s.username === username);
      if (student) {
        setSelected(student);
      }
    }
  };

  return (
    <section className="section" style={{ backgroundColor: "#F8F9FE", padding: "80px 0 60px 0" }}>
      <div className="container" style={{ textAlign: "center" }}>
        {/* Event Delegation Listener Wrapper */}
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          <ContributorsWall
            title="What Our Indian Residents Say"
            subtitle="Loved by a community of 500+ students from Greater Noida's leading universities."
            contributors={indianStudents}
            totalCount={120}
            columns={12}
            height={240}
          />
        </div>

        {/* Selected Review Details Panel */}
        {selected && (
          <div 
            style={{
              maxWidth: "600px",
              margin: "40px auto 0 auto",
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              padding: "32px",
              boxShadow: "var(--shadow-lg)",
              border: "1px solid var(--border-light)",
              display: "flex",
              flexDirection: "row",
              gap: "24px",
              alignItems: "flex-start",
              textAlign: "left",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Background Quote Icon Decoration */}
            <div style={{ position: "absolute", right: "20px", top: "-10px", color: "rgba(108, 99, 255, 0.05)", pointerEvents: "none" }}>
              <Quote size={120} />
            </div>

            <div style={{ width: "80px", height: "80px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "3px solid var(--primary-light)" }}>
              <img 
                src={selected.avatarUrl} 
                alt={selected.username} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1, position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#1A1A2E", margin: 0 }}>{selected.username}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px", fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600, marginTop: "4px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Building2 size={12} />
                      {selected.college}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--primary)" }}>
                      <MapPin size={12} />
                      {selected.location}
                    </span>
                  </div>
                </div>

                {/* Stars */}
                <div style={{ display: "flex", gap: "2px", color: "#E5C158" }}>
                  {Array.from({ length: selected.rating }).map((_, idx) => (
                    <Star key={idx} size={14} fill="currentColor" style={{ stroke: "#E5C158" }} />
                  ))}
                </div>
              </div>

              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.6, margin: "12px 0 0 0", borderLeft: "3px solid var(--primary)", paddingLeft: "12px" }}>
                "{selected.feedback}"
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
