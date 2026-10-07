"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

type VibeCategory = "All" | "R&B" | "Hip-Hop" | "Lounge" | "Wedding" | "Afrobeats" | "Funk";

interface Playlist {
  id: string;
  title: string;
  description: string;
  vibe: Exclude<VibeCategory, "All">;
  image: string;
  appleUrl: string;
  tags: string[];
}

const playlists: Playlist[] = [
  {
    id: "p1",
    title: "Neo-Soul",
    description:
      "Smooth neo-soul grooves blending classic R&B with modern production — the perfect soundtrack for any laid-back evening.",
    vibe: "R&B",
    image: "/images/playlists/neo-soul.jpeg",
    appleUrl: "https://music.apple.com/us/playlist/neo-soul/pl.u-r2yBARGuP99Zdvp",
    tags: ["Neo-Soul", "R&B", "Smooth"],
  },
  {
    id: "p2",
    title: "Afrobeats",
    description:
      "High-energy Afrobeats anthems that keep the dance floor locked in from the first beat to the last.",
    vibe: "Afrobeats",
    image: "/images/playlists/AfroBeats.png",
    appleUrl: "https://music.apple.com/us/playlist/afro/pl.u-zPyLLbvFZMMqErX",
    tags: ["Afrobeats", "Dancehall", "Amapiano"],
  },
  {
    id: "p3",
    title: "Summer 2016",
    description:
      "A nostalgic throwback to the summer of 2016 — the hits that defined the season.",
    vibe: "Hip-Hop",
    image: "/images/playlists/Summer 2016.png",
    appleUrl: "https://music.apple.com/us/playlist/summer-2016-vibes/pl.u-pMyll2aU4YYNG1g",
    tags: ["Hip-Hop", "R&B", "Throwback"],
  },
  {
    id: "p4",
    title: "Wedding Bells",
    description:
      "Timeless wedding classics and modern love songs crafted to soundtrack every moment of your special day.",
    vibe: "Wedding",
    image: "/images/playlists/Wedding Bellls.png",
    appleUrl: "https://music.apple.com/us/playlist/the-alexanders/pl.u-XkD0YV0cD44yovA",
    tags: ["Wedding", "Romance", "First Dance"],
  },
  {
    id: "p5",
    title: "Roll Bounce",
    description:
      "Old-school funk and soul roller rink vibes — pure energy on wheels.",
    vibe: "Funk",
    image: "/images/playlists/rollbounce.png",
    appleUrl: "https://music.apple.com/us/playlist/70s-skate/pl.u-MDAW2jDTW44k2pm",
    tags: ["Funk", "Soul", "Old School"],
  },
  
];

const vibes: VibeCategory[] = ["All", "R&B", "Hip-Hop", "Lounge", "Wedding", "Afrobeats", "Funk"];

const vibeColors: Record<Exclude<VibeCategory, "All">, string> = {
  "R&B":      "var(--accent-gold)",
  "Hip-Hop":  "var(--accent-violet)",
  Lounge:     "#fbbf24",
  Wedding:    "#fda4af",
  Afrobeats:  "#5eead4",
  Funk:       "#94a3b8",
};

export default function PlaylistsSection() {
  const [activeVibe, setActiveVibe] = useState<VibeCategory>("All");

  const filtered =
    activeVibe === "All" ? playlists : playlists.filter((p) => p.vibe === activeVibe);

  return (
    <section
      id="playlists"
      style={{
        position: "relative",
        padding: "7rem 0",
        backgroundColor: "var(--bg-base)",
      }}
    >
      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
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
            Music
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 6vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "#ffffff",
            margin: 0,
          }}>
            Curated <span style={{ color: "var(--accent-gold)" }}>Playlists</span>
          </h2>
          <p style={{
            maxWidth: "38rem",
            margin: "1rem auto 0",
            color: "#94a3b8",
            fontWeight: 300,
            lineHeight: 1.7,
          }}>
            Handcrafted sets for every mood and occasion — from wedding first
            dances to after-hours club sets. Preview and share with your guests
            before the event.
          </p>
        </motion.div>

        {/* Vibe filter */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.5rem",
          marginBottom: "2.5rem",
        }}>
          {vibes.map((vibe) => (
            <button
              key={vibe}
              onClick={() => setActiveVibe(vibe)}
              style={{
                padding: "0.375rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 500,
                border: activeVibe === vibe
                  ? "1px solid var(--accent-gold)"
                  : "1px solid rgba(255,255,255,0.08)",
                background: activeVibe === vibe
                  ? "var(--accent-gold)"
                  : "rgba(255,255,255,0.04)",
                color: activeVibe === vibe ? "#080608" : "#94a3b8",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: activeVibe === vibe ? "0 0 14px rgba(201,168,76,0.45)" : "none",
              }}
            >
              {vibe}
            </button>
          ))}
        </div>

        {/* Playlist grid */}
        <style>{`
          .playlists-grid {
            display: grid;
            gap: 1.25rem;
            grid-template-columns: 1fr;
            justify-items: center;
          }
          @media (min-width: 672px) {
            .playlists-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (min-width: 1056px) {
            .playlists-grid { grid-template-columns: repeat(3, 1fr); }
          }
          @media (min-width: 1312px) {
            .playlists-grid { grid-template-columns: repeat(4, 1fr); }
          }
          .playlists-grid > * { width: 100%; }
        `}</style>
        <div className="playlists-grid">
          {filtered.map((playlist, i) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glass-card neon-border"
              style={{
                borderRadius: "0.75rem",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* Cover image */}
              <div style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden" }}>
                <Image
                  src={playlist.image}
                  alt={playlist.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Info */}
              <div style={{
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                flex: 1,
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
                    <h3 style={{
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.9)",
                      letterSpacing: "0.04em",
                      margin: 0,
                    }}>
                      {playlist.title}
                    </h3>
                    
                  </div>
                  <p style={{ fontSize: "0.75rem", color: vibeColors[playlist.vibe], marginTop: "0.125rem" }}>
                    {playlist.vibe}
                  </p>
                </div>
                <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.65, margin: 0 }}>
                  {playlist.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                  {playlist.tags.map((tag) => (
                    <span key={tag} style={{
                      padding: "0.125rem 0.5rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      background: "rgba(255,255,255,0.05)",
                      color: "#64748b",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={playlist.appleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.375rem",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "rgba(201,168,76,0.7)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    marginTop: "auto",
                    paddingTop: "1rem"
                  }}
                >
                  <ExternalLink size={14} />
                  Open in Apple Music
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
