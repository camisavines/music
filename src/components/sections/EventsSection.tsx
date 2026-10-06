"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Music, Tag, Info, Image as ImageIcon } from "lucide-react";
import { Tag as CarbonTag } from "@carbon/react";

// ─── Types ────────────────────────────────────────────────────────────────────

type EventCategory = "All" | "Club" | "Corporate" | "Private";

interface EventPhoto {
  src: string;
  alt: string;
  caption?: string;
}

interface GigEvent {
  id: string;
  title: string;
  venue: string;
  city: string;
  date: string;
  category: Exclude<EventCategory, "All">;
  genre: string;
  crowd: string;
  setDuration: string;
  description: string;
  highlights: string[];
  photos: EventPhoto[];
  recordingUrl?: string;
  highlight?: boolean;
}

// ─── Event data ───────────────────────────────────────────────────────────────
const events: GigEvent[] = [
  {
    id: "chandelier-sessions",
    title: "Chandelier Sessions",
    venue: "TODO: Venue name",
    city: "TODO: City, State",
    date: "TODO: Month DD, YYYY",
    category: "Club",
    genre: "R&B / Hip-Hop",
    crowd: "TODO: e.g. 400",
    setDuration: "TODO: e.g. 3 hours",
    description: "TODO: A short 2–3 sentence description of the Chandelier Sessions event — the vibe, the crowd, what made the night special.",
    highlights: [
      "TODO: Highlight 1 — e.g. Opening set energy that packed the floor within the first track",
      "TODO: Highlight 2 — e.g. Crowd reaction to a surprise mashup",
      "TODO: Highlight 3 — e.g. Standout moment or encore request",
    ],
    photos: [
      { src: "/images/events/chandelier_sessions.WEBP", alt: "TODO: Alt text for photo 1", caption: "flyer" },
    ],
    recordingUrl: "TODO: https://soundcloud.com/djnevamisabeat/chandelier-sessions",
    highlight: true,
  },
  {
    id: "nye-behind-the-wall",
    title: "NYE Behind the Wall",
    venue: "TODO: Venue name",
    city: "TODO: City, State",
    date: "TODO: December 31, YYYY",
    category: "Club",
    genre: "R&B / Hip-Hop",
    crowd: "TODO: e.g. 600",
    setDuration: "TODO: e.g. 4 hours",
    description: "TODO: A short 2–3 sentence description of the NYE Behind the Wall event.",
    highlights: [
      "TODO: Highlight 1 — e.g. Midnight countdown transition",
      "TODO: Highlight 2 — e.g. Most-requested song of the night",
      "TODO: Highlight 3 — e.g. Energy level or memorable crowd moment",
    ],
    photos: [
      { src: "TODO: /images/events/nye-behind-the-wall-1.jpg", alt: "TODO: Alt text for photo 1" },
      { src: "TODO: /images/events/nye-behind-the-wall-2.jpg", alt: "TODO: Alt text for photo 2" },
    ],
    recordingUrl: "TODO: https://soundcloud.com/djnevamisabeat/nye-behind-the-wall",
    highlight: true,
  },
  {
    id: "excellence-project-fundraiser",
    title: "Excellence Project Fundraiser",
    venue: "TODO: Venue name",
    city: "TODO: City, State",
    date: "TODO: Month DD, YYYY",
    category: "Corporate",
    genre: "R&B",
    crowd: "TODO: e.g. 250",
    setDuration: "TODO: e.g. 2 hours",
    description: "TODO: A short 2–3 sentence description of the Excellence Project Fundraiser.",
    highlights: [
      "TODO: Highlight 1",
      "TODO: Highlight 2",
      "TODO: Highlight 3",
    ],
    photos: [
      { src: "TODO: /images/events/excellence-project-fundraiser-1.jpg", alt: "TODO: Alt text for photo 1" },
      { src: "TODO: /images/events/excellence-project-fundraiser-2.jpg", alt: "TODO: Alt text for photo 2" },
    ],
  },
  {
    id: "texas-graduate",
    title: "Texas Graduate",
    venue: "TODO: Venue name",
    city: "TODO: City, TX",
    date: "TODO: Month DD, YYYY",
    category: "Private",
    genre: "Hip-Hop",
    crowd: "TODO: e.g. 120",
    setDuration: "TODO: e.g. 2.5 hours",
    description: "TODO: A short 2–3 sentence description of the Texas Graduate private event.",
    highlights: [
      "TODO: Highlight 1",
      "TODO: Highlight 2",
      "TODO: Highlight 3",
    ],
    photos: [
      { src: "TODO: /images/events/texas-graduate-1.jpg", alt: "TODO: Alt text for photo 1" },
      { src: "TODO: /images/events/texas-graduate-2.jpg", alt: "TODO: Alt text for photo 2" },
    ],
  },
];

const categories: EventCategory[] = ["All", "Club", "Corporate", "Private"];

const categoryTagType: Record<Exclude<EventCategory, "All">, "teal" | "blue" | "warm-gray"> = {
  Club:      "teal",
  Corporate: "blue",
  Private:   "warm-gray",
};

const cardVariants = {
  hidden:  { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
  exit:    { opacity: 0, scale: 0.92, y: -10, transition: { duration: 0.2 } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function EventsSection() {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("All");

  const filtered =
    activeCategory === "All"
      ? events
      : events.filter((e) => e.category === activeCategory);

  return (
    <section
      id="events"
      style={{
        position: "relative",
        padding: "7rem 0",
        backgroundColor: "var(--bg-base)",
      }}
    >
      <div className="section-inner">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <span style={{
            fontSize: "0.6875rem",
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "var(--accent-gold)",
            marginBottom: "0.75rem",
            display: "block",
          }}>
            Portfolio
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 6vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "#ffffff",
            marginBottom: "1rem",
            margin: 0,
          }}>
            Past Events &amp; <span style={{ color: "var(--accent-gold)" }}>Gigs</span>
          </h2>
          <p style={{
            maxWidth: "38rem",
            color: "#94a3b8",
            fontWeight: 300,
            lineHeight: 1.7,
            marginTop: "1rem",
          }}>
            From intimate private celebrations to packed club nights and corporate
            fundraisers — every set crafted with precision and energy.
          </p>
        </motion.div>

        {/* Filter pills */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.5rem",
          marginBottom: "2.5rem",
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "0.375rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 500,
                border: activeCategory === cat
                  ? "1px solid var(--accent-gold)"
                  : "1px solid rgba(255,255,255,0.08)",
                background: activeCategory === cat
                  ? "var(--accent-gold)"
                  : "rgba(255,255,255,0.04)",
                color: activeCategory === cat ? "#080608" : "#94a3b8",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: activeCategory === cat ? "0 0 14px rgba(201,168,76,0.45)" : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))",
          gap: "1.5rem",
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((event) => (
              <motion.article
                key={event.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="glass-card neon-border"
                style={{
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  transition: "border-color 0.3s",
                }}
              >
                {/* Photo placeholder */}
                <div style={{
                  position: "relative",
                  height: "13rem",
                  overflow: "hidden",
                  backgroundColor: "var(--bg-surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#334155",
                  }}>
                    <ImageIcon size={32} strokeWidth={1} />
                    <span style={{ fontSize: "0.6875rem", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      TODO: Add event photo
                    </span>
                  </div>
                  {/* Category badge */}
                  <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem" }}>
                    <CarbonTag type={categoryTagType[event.category]} size="sm">
                      {event.category}
                    </CarbonTag>
                  </div>
                  {event.highlight && (
                    <span style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      padding: "0.25rem 0.625rem",
                      borderRadius: "9999px",
                      fontSize: "0.6875rem",
                      fontWeight: 500,
                      background: "rgba(201,168,76,0.15)",
                      color: "#d4af5a",
                      border: "1px solid rgba(201,168,76,0.25)",
                      letterSpacing: "0.05em",
                    }}>
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <h3 style={{
                    fontSize: "1.0625rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.9)",
                    letterSpacing: "0.04em",
                    margin: 0,
                  }}>
                    {event.title}
                  </h3>

                  {/* Core meta */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.5rem 1rem",
                    fontSize: "0.75rem",
                    color: "#94a3b8",
                  }}>
                    {[
                      { Icon: MapPin,    text: event.venue.startsWith("TODO") ? "Venue — TBD" : `${event.venue}, ${event.city}`, isTodo: event.venue.startsWith("TODO") },
                      { Icon: Calendar,  text: event.date.startsWith("TODO") ? "Date — TBD" : event.date, isTodo: event.date.startsWith("TODO") },
                      { Icon: Music,     text: event.genre, isTodo: false },
                      { Icon: Tag,       text: event.crowd.startsWith("TODO") ? "Crowd — TBD" : `${event.crowd} attendees`, isTodo: event.crowd.startsWith("TODO") },
                    ].map(({ Icon, text, isTodo }, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                        <Icon size={13} style={{ color: "rgba(201,168,76,0.7)", flexShrink: 0 }} />
                        <span style={{ color: isTodo ? "#334155" : undefined, fontStyle: isTodo ? "italic" : undefined }}>
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1rem" }}>
                    <p style={{
                      fontSize: "0.875rem",
                      lineHeight: 1.65,
                      color: event.description.startsWith("TODO") ? "#334155" : "#94a3b8",
                      fontStyle: event.description.startsWith("TODO") ? "italic" : undefined,
                      margin: 0,
                    }}>
                      {event.description.startsWith("TODO") ? "Description coming soon…" : event.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.5rem" }}>
                      <Info size={13} style={{ color: "rgba(201,168,76,0.6)", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569" }}>
                        Highlights
                      </span>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                      {event.highlights.map((h, idx) => (
                        <li key={idx} style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          fontSize: "0.75rem",
                          color: h.startsWith("TODO") ? "#1e293b" : "#94a3b8",
                          fontStyle: h.startsWith("TODO") ? "italic" : undefined,
                        }}>
                          <span style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            background: "rgba(201,168,76,0.4)",
                            flexShrink: 0,
                            marginTop: "0.375rem",
                          }} />
                          {h.startsWith("TODO") ? `Highlight ${idx + 1} — TBD` : h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Photos placeholder */}
                  <div>
                    <span style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", display: "block", marginBottom: "0.5rem" }}>
                      Photos
                    </span>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      {event.photos.map((_photo, idx) => (
                        <div key={idx} style={{
                          flex: 1,
                          height: "4rem",
                          borderRadius: "0.5rem",
                          backgroundColor: "var(--bg-surface)",
                          border: "1px solid rgba(255,255,255,0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          <span style={{ fontSize: "0.625rem", color: "#1e293b", fontFamily: "monospace" }}>
                            Photo {idx + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
