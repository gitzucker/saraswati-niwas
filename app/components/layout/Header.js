'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import MobileNav from './MobileNav';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/hostels', label: 'Hostels' },
  { href: '/explore-hub', label: 'Explore Hub' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    // Set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}
      >
        <div className={styles.headerInner}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="Saraswati Niwas Home">
            <div className={styles.logoImageWrapper}>
              <Image 
                src="/images/logo.png" 
                alt="Saraswati Niwas Logo" 
                width={48} 
                height={30} 
                className={styles.logoImage}
                priority
              />
            </div>
            <div className={styles.logoTextContainer}>
              <span className={styles.logoLineSaraswati}>SARASWATI</span>
              <span className={styles.logoLineNiwas}>NIWAS</span>
              <span className={styles.logoLineHostels}>HOSTELS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={styles.navLink}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link href="/hostels" className={styles.ctaButton}>
            Book Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            className={styles.menuButton}
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileNavOpen}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
