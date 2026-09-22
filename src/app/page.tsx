import HeroSection      from "@/components/sections/HeroSection";
import EventsSection    from "@/components/sections/EventsSection";
import GearSection      from "@/components/sections/GearSection";
import PlaylistsSection from "@/components/sections/PlaylistsSection";
import QuoteEstimator   from "@/components/sections/QuoteEstimator";
import BookingSection   from "@/components/sections/BookingSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <EventsSection />
      <GearSection />
      <PlaylistsSection />
      <QuoteEstimator />
      <BookingSection />
    </>
  );
}
