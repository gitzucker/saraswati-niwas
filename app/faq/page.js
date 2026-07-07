"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getFAQs } from "../lib/cms";
import ScrollReveal from "../components/shared/ScrollReveal";
import TallyForm from "../components/shared/TallyForm";
import { Plus, Minus, HelpCircle, MessageSquare } from "lucide-react";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    getFAQs().then(data => {
      setFaqs(data);
      setLoading(false);
    });
  }, []);

  const categories = ["All", "General", "Amenities", "Payments"];

  const filteredFaqs = activeTab === "All"
    ? faqs
    : faqs.filter(faq => faq.category.toLowerCase() === activeTab.toLowerCase());

  const toggleFaq = (id) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  const tallyContactFormId = process.env.NEXT_PUBLIC_TALLY_CONTACT_FORM_ID;

  return (
    <div className={styles.pageContainer}>
      <div className="container">
        
        {/* Header */}
        <div className={styles.sectionHeader}>
          <ScrollReveal animation="fadeUp">
            <span className={styles.tagline}>Got Questions?</span>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={100}>
            <h1 className={styles.title}>Frequently Asked Questions</h1>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={200}>
            <p className={styles.description}>
              Browse through our commonly asked questions regarding rooms, booking security deposit, check-in timings, and daily schedules.
            </p>
          </ScrollReveal>
        </div>

        {/* Tab Filters */}
        <ScrollReveal animation="fadeUp" delay={250}>
          <div className={styles.tabContainer}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveTab(cat); setExpandedFaq(null); }}
                className={`${styles.tabBtn} ${activeTab === cat ? styles.activeTab : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* FAQ Grid Split */}
        <div className={styles.faqLayout}>
          
          {/* FAQ Accordions */}
          <main className={styles.faqMain}>
            {loading ? (
              <div className={styles.loader}>
                <div className={styles.spinner} />
              </div>
            ) : (
              <div className={styles.accordionGroup}>
                {filteredFaqs.map((faq, i) => {
                  const isExpanded = expandedFaq === faq.id;
                  return (
                    <ScrollReveal key={faq.id} animation="fadeUp" delay={i * 80}>
                      <div className={`${styles.faqItem} ${isExpanded ? styles.expandedItem : ""}`}>
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className={styles.faqQuestionRow}
                        >
                          <HelpCircle size={18} className={styles.helpIcon} />
                          <span className={styles.questionText}>{faq.question}</span>
                          <span className={styles.expandIcon}>
                            {isExpanded ? <Minus size={16} /> : <Plus size={16} />}
                          </span>
                        </button>
                        
                        <div 
                          className={styles.faqAnswerRow}
                          style={{
                            maxHeight: isExpanded ? "200px" : "0",
                            opacity: isExpanded ? 1 : 0
                          }}
                        >
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            )}
          </main>

          {/* Sticky Form Banner */}
          <aside className={styles.stickySidebar}>
            <div className={styles.helpCard}>
              <div className={styles.helpIconCircle}>
                <MessageSquare size={24} />
              </div>
              <h3>Still Have Questions?</h3>
              <p>Can't find the answer you are looking for? Send us a quick enquiry message.</p>
              <TallyForm formId={tallyContactFormId} className={styles.sidebarForm} />
            </div>
          </aside>

        </div>

      </div>
    </div>
  );
}
