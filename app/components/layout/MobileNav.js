'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Phone, Mail, MapPin } from 'lucide-react';
import styles from './MobileNav.module.css';

export default function MobileNav({ isOpen, onClose, links }) {
  const panelRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Trap focus inside panel when open
  useEffect(() => {
    if (isOpen && panelRef.current) {
      const firstFocusable = panelRef.current.querySelector('button, a');
      if (firstFocusable) firstFocusable.focus();
    }
  }, [isOpen]);

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      {/* Slide-in Panel */}
      <div className={styles.panel} ref={panelRef}>
        {/* Panel Header */}
        <div className={styles.panelHeader}>
          <Link href="/" className={styles.panelLogo} onClick={onClose}>
            <div className={styles.logoImageWrapper}>
              <Image 
                src="/images/logo.png" 
                alt="Saraswati Niwas Logo" 
                width={48} 
                height={30} 
                className={styles.logoImage}
              />
            </div>
            <div className={styles.logoTextContainer}>
              <span className={styles.logoLineSaraswati}>SARASWATI</span>
              <span className={styles.logoLineNiwas}>NIWAS</span>
              <span className={styles.logoLineHostels}>HOSTELS</span>
            </div>
          </Link>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className={styles.navLinks} aria-label="Mobile navigation">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={styles.mobileNavLink}
              onClick={onClose}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className={styles.ctaSection}>
          <Link href="/hostels" className={styles.mobileCta} onClick={onClose}>
            Book Now
          </Link>
        </div>

        {/* Contact Info */}
        <div className={styles.contactSection}>
          <div className={styles.contactItem}>
            <Phone size={16} className={styles.contactItemIcon} />
            <a href="tel:+919211934081">+91 92119 34081</a>
          </div>
          <div className={styles.contactItem}>
            <Mail size={16} className={styles.contactItemIcon} />
            <a href="mailto:hello@saraswatiniwas.com">hello@saraswatiniwas.com</a>
          </div>
          <div className={styles.contactItem}>
            <MapPin size={16} className={styles.contactItemIcon} />
            <span>Greater Noida, Uttar Pradesh</span>
          </div>
        </div>
      </div>
    </div>
  );
}
