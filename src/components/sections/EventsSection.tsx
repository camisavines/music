"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, Music, ExternalLink } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type EventCategory = "All" | "Club" | "Festival" | "Wedding" | "Corporate" | "Private";

interface GigEvent {
  id: string;
  title: string;
  venue: string;
  city: string;
  date: string;
  category: Exclude<EventCategory, "All">;
  genre: string;
  crowd: string;
  image: string;
  highlight?: boolean;
}

const events: GigEvent[] = [
  {
    id: "1",
    title: "Afterdark Residency",
    venue: "Exchange LA",
    city: "Los Angeles, CA",
    date: "Dec 14, 2024",
    category: "Club",
    genre: "House / Techno",
    crowd: "1,200",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80",
    highlight: true,
  },
  {
    id: "2",
    title: "Desert Frequencies",
    venue: "Coachella Valley",
    city: "Indio, CA",
    date: "Apr 20, 2024",
    category: "Festival",
    genre: "Electronic / EDM",
    crowd: "25,000",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=80",
    highlight: true,
  },
  {
    id: "3",
    title: "Sarah & James Wedding",
    venue: "The Beverly Hills Hotel",
    city: "Beverly Hills, CA",
    date: "Sep 7, 2024",
    category: "Wedding",
    genre: "Top 40 / R&B / Classics",
    crowd: "280",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  },
  {
    id: "4",
    title: "Tech Summit Gala",
    venue: "Moscone Center",
    city: "San Francisco, CA",
    date: "Nov 2, 2024",
    category: "Corporate",
    genre: "Lounge / Electronic",
    crowd: "800",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
  {
    id: "5",
    title: "Neon Nights Vol. 3",
    venue: "1 Hotel Rooftop",
    city: "Miami, FL",
    date: "Mar 15, 2024",
    category: "Private",
    genre: "Hip-Hop / Afrobeats",
    crowd: "350",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80",
  },
  {
    id: "6",
    title: "Bass Collective",
    venue: "Sound Nightclub",
    city: "Hollywood, CA",
    date: "Feb 3, 2024",
    category: "Club",
    genre: "Bass / Drum & Bass",
    crowd: "600",
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=600&q=80",
  },
  {
    id: "7",
    title: "Miami Music Week",
    venue: "LIV Nightclub",
    city: "Miami Beach, FL",
    date: "Mar 27, 2024",
    category: "Festival",
    genre: "House / Progressive",
    crowd: "3,000",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80",
    highlight: true,
  },
  {
    id: "8",
    title: "Rooftop Sessions",
    venue: "Soho House",
    city: "West Hollywood, CA",
    date: "Jul 20, 2024",
    category: "Private",
    genre: "Deep House / Chill",
    crowd: "150",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&q=80",
  },
];

const categories: EventCategory[] = ["All", "Club", "Festival", "Wedding", "Corporate", "Private"];

const categoryColors: Record<Exclude<EventCategory, "All">, string> = {
  Club:      "text-gold-400 bg-gold-400/10 border-gold-400/25",
  Festival:  "text-violet-400 bg-violet-500/10 border-violet-500/25",
  Wedding:   "text-rose-300 bg-rose-500/8 border-rose-400/25",
  Corporate: "text-blue-300 bg-blue-500/8 border-blue-400/20",
  Private:   "text-amber-300 bg-amber-500/8 border-amber-400/20",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, scale: 0.92, y: -10, transition: { duration: 0.2 } },
};

export default function EventsSection() {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("All");

  const filtered =
    activeCategory === "All"
      ? events
      : events.filter((e) => e.category === activeCategory);

  return (
    <section id="events" className="relative py-28 bg-dark-950">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-gold-500 mb-3">
            Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-wide text-white mb-4">
            Past Events &amp; <span style={{ color: "#C9A84C" }}>Gigs</span>
          </h2>
          <p className="max-w-xl text-slate-400 font-light leading-relaxed">
            From intimate rooftop sessions and luxury ballroom receptions to
            sold-out festival stages — a track record built on precision, energy,
            and craft.
          </p>
        </motion.div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300",
                activeCategory === cat
                  ? "bg-gold-400 border-gold-400 text-dark-950 shadow-[0_0_14px_rgba(201,168,76,0.45)]"
                  : "border-white/8 text-slate-400 hover:border-gold-400/35 hover:text-gold-400 bg-white/4"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((event) => (
              <motion.article
                key={event.id}
                variants={cardVariants}
                layout
                className={cn(
                  "group relative rounded-xl overflow-hidden glass-card neon-border hover:neon-border-purple transition-all duration-300 cursor-pointer",
                  event.highlight && "sm:col-span-2"
                )}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />

                  {/* Category badge */}
                  <span
                    className={cn(
                      "absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold border",
                      categoryColors[event.category]
                    )}
                  >
                    {event.category}
                  </span>

                  {event.highlight && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium bg-gold-400/15 text-gold-300 border border-gold-400/25 tracking-wide">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-white/90 group-hover:text-gold-400 transition-colors tracking-wide">
                    {event.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-500/70 shrink-0" />
                      <span>{event.venue}, {event.city}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold-500/70 shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-gold-500/70 shrink-0" />
                      <span>{event.genre}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-gold-500/70 shrink-0" />
                      <span>{event.crowd} attendees</span>
                    </div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-dark-950/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full glass neon-border-gold text-gold-400 text-xs font-medium tracking-wide uppercase">
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Recap
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
