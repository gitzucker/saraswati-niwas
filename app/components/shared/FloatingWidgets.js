"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, MessageCircle } from "lucide-react";
import styles from "./FloatingWidgets.module.css";

const CHAT_RESPONSES = {
  welcome: "Namaste! Welcome to Saraswati Niwas. I am your hostel guide. How can I help you today?",
  rooms: "Saraswati Niwas offers fully furnished, signature room configurations:\n\n• Single Room: Private room with study table, closet, and full maintenance.\n• Double Sharing: Shared room with twin beds and individual lockers.\n• Triple Sharing: Spacious room shared among three students.",
  locations: "We have 6 branches in Greater Noida near major college hubs:\n1. B1 Branch (Knowledge Park 2)\n2. B10 Branch (Knowledge Park 3)\n3. B16 Branch (Knowledge Park 3)\n4. B17 Girls Branch (Knowledge Park 3, Near IIT/KCC/GL Bajaj)\n5. AR1 Branch (Knowledge Park 3)\n6. AR2 Branch (Knowledge Park 3)",
  food: "Our mess serves 4 daily meals (Breakfast, Lunch, High Tea, Dinner) prepared under strict hygiene guidelines. Vegetarian-only rotating menu includes Paneer, Chole, Dal Makhani, fresh Rotis, Rice, and weekly special desserts.",
  security: "Safety is our priority! We feature a 3-tier security system:\n• 24/7 CCTV surveillance across corridors and entries\n• Biometric fingerprint scan entry systems\n• Professional security guards and on-duty resident wardens.",
  booking: "To book a stay, click the 'Book Stay' CTA button at the top header, or fill out the enquiry form on our Contact Page. A 1-month refundable security deposit secures your reservation!",
  default: "I want to help you! Regarding your question, Saraswati Niwas provides signature fully-managed hostels (Boys & Girls) with 200Mbps Wi-Fi, 4 daily meals, weekly laundry, 3-tier biometric security, and dedicated wardens. For direct booking or custom queries, please call/WhatsApp our warden at +91 92119 34081!"
};

const KNOWLEDGE_BASE = [
  {
    keys: ["wifi", "internet", "net", "speed", "fiber", "mbps", "connection", "wifi-speed"],
    ans: "We provide unlimited high-speed fiber internet with speeds up to 200 Mbps in every room, backed by 100% power backup to ensure zero downtime during online classes and study sessions."
  },
  {
    keys: ["laundry", "wash", "clothes", "iron", "bag", "laundromat"],
    ans: "Weekly laundry service is included in your stay! Residents get up to 2 bags of laundry washed and ironed per week by our professional in-house staff."
  },
  {
    keys: ["gate", "time", "curfew", "close", "entry", "night", "out", "lock"],
    ans: "For safety, the hostel gates close at 10:30 PM daily. Late entry is only permitted with prior approval from the resident warden or written permission from parents."
  },
  {
    keys: ["guest", "parents", "overnight", "friend", "family", "visit", "allow"],
    ans: "Parents and siblings are welcome to visit during daytime hours (10:00 AM to 7:00 PM) in the common lounge. Overnight guest stays are strictly prohibited in student rooms to maintain privacy."
  },
  {
    keys: ["deposit", "refund", "advance", "money", "payment", "security-deposit", "fee"],
    ans: "We require a simple 1-month security deposit along with the first month's stay in advance. The deposit is fully refundable at the end of your contract, subject to standard room checkout checks."
  },
  {
    keys: ["hot water", "geyser", "bath", "shower", "winter", "hot-water", "geysers"],
    ans: "Yes, hot water is available 24/7! All bathrooms are equipped with high-capacity geysers to ensure continuous hot water supply throughout the winter season."
  },
  {
    keys: ["mess", "timings", "breakfast", "lunch", "dinner", "tea", "schedule", "meals"],
    ans: "Our mess timings are:\n• Breakfast: 7:30 AM - 9:30 AM\n• Lunch: 12:30 PM - 2:30 PM\n• High Tea: 5:00 PM - 6:00 PM\n• Dinner: 8:00 PM - 10:00 PM"
  },
  {
    keys: ["veg", "pure veg", "vegetarian", "non-veg", "egg", "meat", "chicken"],
    ans: "We serve pure vegetarian, highly nutritious, and hygienic meals prepared in separate clean kitchens. The menu rotates weekly and includes paneer, green vegetables, dal, rice, rotis, and special sweets."
  },
  {
    keys: ["owner", "founder", "sudan", "rishab", "bhati", "manager", "boss", "who runs"],
    ans: "Saraswati Niwas was founded and is managed by Sudan Bhati (Founder & Co-Owner) and Rishab Bhati (Managing Director & Co-Owner), who are dedicated to providing signature, safe student housing in Greater Noida."
  },
  {
    keys: ["ac", "air condition", "cooler", "split ac", "ventilation", "fan"],
    ans: "We offer both AC and Non-AC room configurations. AC maintenance, cleaning, and filter checkups are fully managed by our in-house facility team."
  },
  {
    keys: ["warden", "phone", "number", "call", "whatsapp", "contact", "support", "helpline", "mobile"],
    ans: "You can contact our branch warden directly at +91 92119 34081 or email us at hello@saraswatiniwas.com for room reservations and immediate support."
  },
  {
    keys: ["gym", "exercise", "workout", "fitness", "dumbbell", "treadmill"],
    ans: "Yes! Selected branches feature fully equipped physical fitness gym setups. For other branches, we offer partnerships/passes for nearby fitness hubs."
  },
  {
    keys: ["power", "backup", "electricity", "generator", "dg", "ups", "current", "cut"],
    ans: "All our branches feature 24/7 power backup with high-capacity diesel generators to run lights, fans, internet, and study room facilities without interruption."
  },
  {
    keys: ["clean", "cleaning", "housekeeping", "sweep", "mop", "sanitized", "hygiene"],
    ans: "Daily room cleaning and common area sweeping are done by our dedicated housekeeping team. Bathrooms are deep-cleaned and sanitized twice a week."
  },
  {
    keys: ["water", "ro", "drinking", "chilled", "filter", "purified"],
    ans: "We provide 24/7 clean, chilled drinking water purified via multi-stage commercial RO (Reverse Osmosis) filtration plants installed at every floor."
  },
  {
    keys: ["college", "proximity", "gl bajaj", "sharda", "galgotias", "iimt", "gbu", "iit", "kcc", "distance"],
    ans: "Our branches are located in Greater Noida's prime spots (KP2 & KP3), which are within 2-10 minutes walking or shuttle distance from GL Bajaj, IIMT, KCC, Sharda, and Galgotias."
  }
];

const QUICK_CHIPS = [
  { id: "rooms", label: "🛏️ Room Sharing" },
  { id: "locations", label: "📍 Localities" },
  { id: "food", label: "🍔 Food & Mess" },
  { id: "security", label: "🔒 Security" },
  { id: "booking", label: "🔑 How to Book?" }
];

export default function FloatingWidgets() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize welcome message
  useEffect(() => {
    setMessages([
      { sender: "bot", text: CHAT_RESPONSES.welcome, timestamp: new Date() }
    ]);
  }, []);

  // Auto-scroll chat body
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // User message
    const userMsg = { sender: "user", text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      let botReplyText = "";
      const query = text.toLowerCase();
      const queryWords = query.split(/[^a-z0-9]+/);

      // 1. Check Knowledge Base with keyword match scoring
      let bestMatch = null;
      let highestScore = 0;

      KNOWLEDGE_BASE.forEach((item) => {
        let score = 0;
        item.keys.forEach((key) => {
          if (query.includes(key)) {
            score += 2; // high weight for substring phrase matching
          }
          queryWords.forEach((word) => {
            if (word === key) {
              score += 1;
            }
          });
        });

        if (score > highestScore) {
          highestScore = score;
          bestMatch = item;
        }
      });

      // 2. Select Response
      if (highestScore >= 1 && bestMatch) {
        botReplyText = bestMatch.ans;
      } else {
        // Fallback matching
        if (query.includes("sharing") || query.includes("room") || query.includes("single") || query.includes("double") || query.includes("triple") || query.includes("occupancy")) {
          botReplyText = CHAT_RESPONSES.rooms;
        } else if (query.includes("location") || query.includes("branch") || query.includes("where") || query.includes("place") || query.includes("noida")) {
          botReplyText = CHAT_RESPONSES.locations;
        } else if (query.includes("food") || query.includes("mess") || query.includes("dining") || query.includes("meal") || query.includes("breakfast") || query.includes("dinner")) {
          botReplyText = CHAT_RESPONSES.food;
        } else if (query.includes("safe") || query.includes("security") || query.includes("guard") || query.includes("cctv") || query.includes("girl")) {
          botReplyText = CHAT_RESPONSES.security;
        } else if (query.includes("book") || query.includes("reserve") || query.includes("stay") || query.includes("enquiry")) {
          botReplyText = CHAT_RESPONSES.booking;
        } else {
          botReplyText = CHAT_RESPONSES.default;
        }
      }

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botReplyText, timestamp: new Date() }
      ]);
      setIsTyping(false);
    }, 850);
  };

  const handleChipClick = (id) => {
    // User message
    const label = QUICK_CHIPS.find(c => c.id === id)?.label || id;
    const userMsg = { sender: "user", text: label, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: CHAT_RESPONSES[id], timestamp: new Date() }
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className={styles.widgetsContainer}>
      {/* 1. WhatsApp Button */}
      <a
        href="https://wa.me/919211934081?text=Hello%20Saraswati%20Niwas%21%20I%27m%20interested%20in%20booking%20a%20hostel%20stay.%20Please%20share%20room%20availability%20and%20details."
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.widgetBtn} ${styles.whatsappBtn}`}
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={28} fill="currentColor" />
        <span className={styles.pulseRing} />
      </a>

      {/* 2. Chatbot Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className={`${styles.widgetBtn} ${styles.chatBtn} ${chatOpen ? styles.chatBtnActive : ""}`}
        aria-label="Open Chatbot Assistant"
      >
        {chatOpen ? <X size={26} /> : <MessageSquare size={26} />}
      </button>

      {/* 3. Chat Window */}
      {chatOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.botAvatar}>
              <span>SN</span>
              <span className={styles.onlineBadge} />
            </div>
            <div className={styles.headerInfo}>
              <h3>Saraswati Assistant</h3>
              <span>Online • Hostel Guide</span>
            </div>
            <button onClick={() => setChatOpen(false)} className={styles.closeBtn}>
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className={styles.chatBody}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`${styles.msgRow} ${m.sender === "bot" ? styles.botRow : styles.userRow}`}
              >
                <div className={styles.msgBubble}>
                  <p>{m.text}</p>
                  <span className={styles.msgTime}>
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className={`${styles.msgRow} ${styles.botRow}`}>
                <div className={styles.typingIndicator}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Option Chips */}
          <div className={styles.chipsContainer}>
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip.id}
                onClick={() => handleChipClick(chip.id)}
                className={styles.chipBtn}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Form Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputVal);
            }}
            className={styles.chatInputArea}
          >
            <input
              type="text"
              placeholder="Type your question here..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className={styles.chatInput}
            />
            <button type="submit" className={styles.sendBtn} aria-label="Send Message">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
