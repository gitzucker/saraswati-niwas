import Link from 'next/link';
import Image from 'next/image';
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import styles from './Footer.module.css';

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/hostels', label: 'Hostels' },
  { href: '/explore-hub', label: 'Explore Hub' },
  { href: '/about', label: 'About Us' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

const LOCATIONS = [
  { label: 'Knowledge Park II', href: '/hostels?location=knowledge-park-2' },
  { label: 'Knowledge Park III', href: '/hostels?location=knowledge-park-3' },
  { label: 'Near GL Bajaj & KCC', href: '/hostels?location=knowledge-park-3' },
  { label: 'Sector Beta 1', href: '/hostels?location=beta-1' },
];

const SOCIAL_LINKS = [
  { href: 'https://instagram.com/saraswatiniwas', label: 'Instagram', icon: Instagram },
  { href: 'https://facebook.com/saraswatiniwas', label: 'Facebook', icon: Facebook },
  { href: 'https://twitter.com/saraswatiniwas', label: 'Twitter', icon: Twitter },
  { href: 'https://youtube.com/@saraswatiniwas', label: 'YouTube', icon: Youtube },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        {/* --- Main Grid --- */}
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div className={styles.brandSection}>
            <Link href="/" className={styles.brandLogo}>
              <div className={styles.logoImageWrapper}>
                <Image 
                  src="/images/logo.png" 
                  alt="Saraswati Niwas Logo" 
                  width={48} 
                  height={30} 
                  className={styles.logoImage}
                />
              </div>
              <span className={styles.brandName}>Saraswati Niwas</span>
            </Link>
            <span className={styles.brandTagline}>Your Home Away From Home</span>
            <p className={styles.brandDescription}>
              Premium hostels in Greater Noida designed for students and professionals.
              Experience unmatched comfort, community, and convenience.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <div className={styles.columnLinks}>
              {QUICK_LINKS.map(({ href, label }) => (
                <Link key={href} href={href} className={styles.footerLink}>
                  <ArrowRight size={14} className={styles.footerLinkIcon} />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Locations</h4>
            <div className={styles.columnLinks}>
              {LOCATIONS.map(({ href, label }) => (
                <Link key={label} href={href} className={styles.footerLink}>
                  <MapPin size={14} className={styles.footerLinkIcon} />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Contact Us</h4>
            <div className={styles.columnLinks}>
              <div className={styles.contactItem}>
                <Phone size={18} className={styles.contactIcon} />
                <div className={styles.contactText}>
                  <a href="tel:+919211934081">+91 92119 34081</a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <Mail size={18} className={styles.contactIcon} />
                <div className={styles.contactText}>
                  <a href="mailto:hello@saraswatiniwas.com">hello@saraswatiniwas.com</a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={18} className={styles.contactIcon} />
                <div className={styles.contactText}>
                  <span>Knowledge Park 2, Greater Noida, Uttar Pradesh 201310</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Newsletter Section --- */}
        <div className={styles.newsletterSection}>
          <div className={styles.newsletterInner}>
            <div className={styles.newsletterText}>
              <h4 className={styles.newsletterTitle}>Stay in the Loop</h4>
              <p className={styles.newsletterSubtitle}>
                Get updates on new hostels, offers, and community events.
              </p>
            </div>
            <form className={styles.newsletterForm} action="#">
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.newsletterInput}
                aria-label="Email for newsletter"
                required
              />
              <button type="submit" className={styles.newsletterButton}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* --- Social Links --- */}
        <div className={styles.socialSection}>
          <span className={styles.socialLabel}>Follow us on social media</span>
          <div className={styles.socialLinks}>
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* --- Copyright --- */}
        <div className={styles.copyright}>
          <span>&copy; {currentYear} Saraswati Niwas. All rights reserved.</span>
          <div className={styles.copyrightLinks}>
            <Link href="/privacy" className={styles.copyrightLink}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={styles.copyrightLink}>
              Terms of Service
            </Link>
            <Link href="/refund" className={styles.copyrightLink}>
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
