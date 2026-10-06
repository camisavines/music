"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

type VibeCategory = "All" | "House" | "Hip-Hop" | "Lounge" | "Wedding" | "Afrobeats" | "Techno";

interface Playlist {
  id: string;
  title: string;
  description: string;
  vibe: Exclude<VibeCategory, "All">;
  trackCount: number;
  duration: string;
  embedPath: string;
  tags: string[];
}

const playlists: Playlist[] = [
  {
    id: "p1",
    title: "Neo-Soul",
    description:
      "Deep melodic house to underground bangers — the perfect club set arc from 1AM to close.",
    vibe: "House",
    trackCount: 42,
    duration: "3h 10m",
    embedPath: "playlist/neo-soul/pl.u-r2yBARGuP99Zdvp",
    tags: ["Deep House", "Melodic Techno", "Afro House"],
  },
];

const vibes: VibeCategory[] = ["All", "House", "Hip-Hop", "Lounge", "Wedding", "Afrobeats", "Techno"];

const vibeColors: Record<Exclude<VibeCategory, "All">, string> = {
  House:      "var(--accent-gold)",
  "Hip-Hop":  "var(--accent-violet)",
  Lounge:     "#fbbf24",
  Wedding:    "#fda4af",
  Afrobeats:  "#5eead4",
  Techno:     "#94a3b8",
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
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
          gap: "1.25rem",
        }}>
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
              }}
            >
              {/* Apple Music embed */}
              <iframe
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                height="450"
                style={{ width: "100%", overflow: "hidden", background: "transparent", display: "block" }}
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src={`https://embed.music.apple.com/us/${playlist.embedPath}`}
                title={`Apple Music: ${playlist.title}`}
              />

              {/* Info */}
              <div style={{
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                borderTop: "1px solid rgba(255,255,255,0.05)",
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
                    <span style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      flexShrink: 0,
                      color: vibeColors[playlist.vibe],
                    }}>
                      {playlist.vibe}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.125rem" }}>
                    {playlist.trackCount} tracks · {playlist.duration}
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
                  href={`https://music.apple.com/us/${playlist.embedPath}`}
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
