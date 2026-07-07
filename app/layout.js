import { Outfit, DM_Sans, Cinzel } from 'next/font/google';
import Script from 'next/script';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingWidgets from './components/shared/FloatingWidgets';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-logo',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  title: 'Saraswati Niwas — Your Home Away From Home',
  description:
    'Premium hostels in Greater Noida for students, professionals, and travelers. Affordable stays near IIMT, Pari Chowk, Knowledge Park 2 & Alpha 2 with modern amenities and vibrant community.',
  keywords: [
    'hostel Greater Noida',
    'PG Greater Noida',
    'student hostel',
    'Saraswati Niwas',
    'affordable hostel near IIMT',
    'hostel near Pari Chowk',
    'Knowledge Park 2 hostel',
    'Alpha 2 hostel',
  ],
  authors: [{ name: 'Saraswati Niwas' }],
  openGraph: {
    title: 'Saraswati Niwas — Your Home Away From Home',
    description:
      'Premium hostels in Greater Noida for students, professionals, and travelers. Modern amenities, vibrant community, unbeatable prices.',
    url: 'https://saraswatiniwas.com',
    siteName: 'Saraswati Niwas',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Saraswati Niwas — Premium Hostels in Greater Noida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saraswati Niwas — Your Home Away From Home',
    description:
      'Premium hostels in Greater Noida for students, professionals, and travelers.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#6C63FF',
};

export default function RootLayout({ children }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable} ${cinzel.variable}`}>
      <head>
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWidgets />
      </body>
    </html>
  );
}
