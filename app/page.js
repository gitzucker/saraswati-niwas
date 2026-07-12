import HeroBanner from "./components/home/HeroBanner";
import AccommodationTypes from "./components/home/AccommodationTypes";
import FeaturedProperties from "./components/home/FeaturedProperties";
import InteractiveMapSection from "./components/home/InteractiveMapSection";
import HowItWorks from "./components/home/HowItWorks";
import AmenitiesShowcase from "./components/home/AmenitiesShowcase";
import StatsCounter from "./components/home/StatsCounter";
import CityExplorer from "./components/home/CityExplorer";
import HostelQuotes from "./components/home/HostelQuotes";
import Testimonials from "./components/home/Testimonials";
import CTABanner from "./components/home/CTABanner";

export default function Home() {
  return (
    <>
      {/* 1. Hero banner with Search + Spline */}
      <HeroBanner />

      {/* 2. Stats bar with animated counting */}
      <StatsCounter />

      {/* 3. Grid of general amenities */}
      <AmenitiesShowcase />

      {/* 4. Stay Categories (Boys, Girls) */}
      <AccommodationTypes />

      {/* 5. Horizontal grid of featured properties with Map link */}
      <FeaturedProperties />

      {/* 5.5. Map Locator Section */}
      <InteractiveMapSection />

      {/* 6. How it works timeline */}
      <HowItWorks />

      {/* 7. Grid of Greater Noida cities/localities */}
      <CityExplorer />

      {/* 7.5. Inspiring Student Hostel Life Quotes */}
      <HostelQuotes />

      {/* 8. Slide testimonials */}
      <Testimonials />

      {/* 9. Booking CTA form (Tally.so) */}
      <CTABanner />
    </>
  );
}
