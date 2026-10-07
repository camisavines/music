"use client";

import { useState } from "react";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Location, Music, Tag, Image as ImageIcon } from "@carbon/icons-react";
import { Tag as CarbonTag } from "@carbon/react";

// ─── Types ────────────────────────────────────────────────────────────────────

type EventCategory = "All" | "Club" | "Corporate" | "Private";

interface GigEvent {
  id: string;
  title: string;
  venue: string;
  city: string;
  date: string;
  category: Exclude<EventCategory, "All">;
  genre: string;
  crowd: string;

  description: string;
  photo?: string;
  highlight?: boolean;
}

// ─── Event data ───────────────────────────────────────────────────────────────
const events: GigEvent[] = [
  {
    id: "chandelier-sessions",
    title: "Chandelier Sessions",
    venue: "Benny's Room",
    city: "Austin",
    date: "Dec 3, 2025",
    category: "Club",
    genre: "R&B / Hip-Hop",
    crowd: "50+",
    description:
      "For those wanting to socialize, take a break from your 9 to 5, with a glass of wine and pure R&B vibes, this color-coordinated event is guaranteed to turn a long day into a smooth night.",
    photo: "/images/events/chandelier_sessions.WEBP",
    highlight: true,
  },
  {
    id: "nye-behind-the-wall",
    title: "Midnight in the Back Room",
    venue: "Benny's Room",
    city: "Austin",
    date: "Dec 31, 2025",
    category: "Club",
    genre: "R&B / Hip-Hop",
    crowd: "50+",
    description:
      "What better way to bring in the new year than go out with a bang with your lovers and friends.",
    photo: "/images/events/nye2025.PNG",
    highlight: true,
  },
  {
    id: "excellence-project-fundraiser",
    title: "Excellence Project Fundraiser",
    venue: "Benny's Room",
    city: "Austin",
    date: "Apr 27, 2026",
    category: "Corporate",
    genre: "R&B",
    crowd: "50+",
    description:
      "I partner with different corporations and foundations in Austin to make your event the best. The Excellence Project Fundraiser was nothing but.",
  },
];

const categories: EventCategory[] = ["All", "Club", "Corporate", "Private"];

const categoryTagType: Record<
  Exclude<EventCategory, "All">,
  "teal" | "blue" | "warm-gray"
> = {
  Club: "teal",
  Corporate: "blue",
  Private: "warm-gray",
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: { opacity: 0, scale: 0.92, y: -10, transition: { duration: 0.2 } },
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
          <span
            style={{
              fontSize: "0.6875rem",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "var(--accent-gold)",
              marginBottom: "0.75rem",
              display: "block",
            }}
          >
            Portfolio
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 6vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "#ffffff",
              marginBottom: "1rem",
              margin: 0,
            }}
          >
            Past Events &amp;{" "}
            <span style={{ color: "var(--accent-gold)" }}>Gigs</span>
          </h2>
          <p
            style={{
              maxWidth: "38rem",
              color: "#94a3b8",
              fontWeight: 300,
              lineHeight: 1.7,
              marginTop: "1rem",
            }}
          >
            From intimate private celebrations to packed club nights and
            corporate fundraisers — every set crafted with precision and energy.
          </p>
        </motion.div>

        {/* Filter pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "0.375rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 500,
                border:
                  activeCategory === cat
                    ? "1px solid var(--accent-gold)"
                    : "1px solid rgba(255,255,255,0.08)",
                background:
                  activeCategory === cat
                    ? "var(--accent-gold)"
                    : "rgba(255,255,255,0.04)",
                color: activeCategory === cat ? "#080608" : "#94a3b8",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow:
                  activeCategory === cat
                    ? "0 0 14px rgba(201,168,76,0.45)"
                    : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <style>{`
          .events-grid {
            display: grid;
            gap: 1.5rem;
            grid-template-columns: 1fr;
            justify-items: center;
          }
          @media (min-width: 672px) {
            .events-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (min-width: 1056px) {
            .events-grid { grid-template-columns: repeat(3, 1fr); }
          }
          .events-grid > * { width: 100%; }
        `}</style>
        <div className="events-grid">
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
                  height: "100%",
                }}
              >
                {/* Event photo */}
                <div
                  style={{
                    position: "relative",
                    flex: 1,
                    aspectRatio: "1 / 1",
                    overflow: "hidden",
                    backgroundColor: "var(--bg-surface)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {event.photo ? (
                    <NextImage
                      src={event.photo}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#334155",
                      }}
                    >
                      <ImageIcon size={32} />
                      <span
                        style={{
                          fontSize: "0.6875rem",
                          fontFamily: "monospace",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                        }}
                      >
                        Photo coming soon
                      </span>
                    </div>
                  )}
                  {/* Category badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      left: "0.75rem",
                    }}
                  >
                    <CarbonTag type={categoryTagType[event.category]} size="sm">
                      {event.category}
                    </CarbonTag>
                  </div>
                  {event.highlight && (
                    <span
                      style={{
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
                      }}
                    >
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div
                  style={{
                    padding: "1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.0625rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.9)",
                      letterSpacing: "0.04em",
                      margin: 0,
                    }}
                  >
                    {event.title}
                  </h3>

                  {/* Core meta */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.5rem 1rem",
                      fontSize: "0.75rem",
                      color: "#94a3b8",
                    }}
                  >
                    {[
                      {
                         Icon: Location,
                         text: event.venue.startsWith("TODO")
                           ? "Venue — TBD"
                           : `${event.venue}, ${event.city}`,
                         isTodo: event.venue.startsWith("TODO"),
                       },
                      {
                        Icon: Calendar,
                        text: event.date.startsWith("TODO")
                          ? "Date — TBD"
                          : event.date,
                        isTodo: event.date.startsWith("TODO"),
                      },
                      { Icon: Music, text: event.genre, isTodo: false },
                      {
                        Icon: Tag,
                        text: event.crowd.startsWith("TODO")
                          ? "Crowd — TBD"
                          : `${event.crowd} attendees`,
                        isTodo: event.crowd.startsWith("TODO"),
                      },
                    ].map(({ Icon, text, isTodo }, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.375rem",
                        }}
                      >
                        <Icon
                          size={13}
                          style={{
                            color: "rgba(201,168,76,0.7)",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            color: isTodo ? "#334155" : undefined,
                            fontStyle: isTodo ? "italic" : undefined,
                          }}
                        >
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <div
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                      paddingTop: "1rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.875rem",
                        lineHeight: 1.65,
                        color: event.description.startsWith("TODO")
                          ? "#334155"
                          : "#94a3b8",
                        fontStyle: event.description.startsWith("TODO")
                          ? "italic"
                          : undefined,
                        margin: 0,
                      }}
                    >
                      {event.description.startsWith("TODO")
                        ? "Description coming soon…"
                        : event.description}
                    </p>
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
