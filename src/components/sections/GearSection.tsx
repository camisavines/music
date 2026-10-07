"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Chip, VolumeUpFilled, Settings, Star, Launch } from "@carbon/icons-react";
import { Tag as CarbonTag } from "@carbon/react";

type GearCategory = "Controllers" | "Audio" | "Software";

interface GearItem {
  id: string;
  name: string;
  brand: string;
  category: GearCategory;
  description: string;
  specs: string[];
  role: string;
  isOwned: boolean;
  recommendedFor?: string;
  link?: string;
}

const gear: GearItem[] = [
  {
    id: "g1",
    name: "CDJ-3000",
    brand: "Pioneer DJ",
    category: "Controllers",
    description: "The industry-standard professional multi-player. Found in every major club worldwide.",
    specs: ["9-inch HD touchscreen", "High-res 96kHz/32-bit audio", "NXS2 & Rekordbox connectivity", "Slip mode & Beat Sync"],
    role: "Primary Deck",
    isOwned: true,
    recommendedFor: "Club & Festival DJs",
    link: "https://www.pioneerdj.com/cdj-3000",
  },
  {
    id: "g3",
    name: "Technics SL-1210MK7",
    brand: "Technics",
    category: "Controllers",
    description: "Legendary direct-drive turntable for scratch DJs and vinyl purists.",
    specs: ["High-torque direct-drive", "±8% pitch control", "Reverse playback", "Ultra-low rumble"],
    role: "Scratch / Vinyl",
    isOwned: true,
    recommendedFor: "Hip-Hop & Scratch DJs",
  },
  {
    id: "g4",
    name: "DDJ-FLX10",
    brand: "Pioneer DJ",
    category: "Controllers",
    description: "All-in-one 4-channel controller bridging Rekordbox and Serato workflows.",
    specs: ["4-deck control", "Large performance pads", "Dual USB", "Works with Rekordbox + Serato"],
    role: "Mobile / Backup",
    isOwned: true,
    recommendedFor: "Mobile & Wedding DJs",
  },
  {
    id: "g5",
    name: "QSC K12.2",
    brand: "QSC",
    category: "Audio",
    description: "2000W powered PA speaker delivering crystal-clear, loud, and punchy sound.",
    specs: ["2000W Class D amp", "12-inch woofer", "1.4-inch compression driver", "DSP onboard"],
    role: "PA System",
    isOwned: true,
    recommendedFor: "Indoor events up to 500 guests",
  },
  {
    id: "g7",
    name: "Rekordbox + Serato DJ Pro",
    brand: "Pioneer DJ / Serato",
    category: "Software",
    description: "Dual-software workflow for maximum versatility — analyze, prepare, and perform.",
    specs: ["AI key/BPM detection", "DVS scratch support", "Cloud library sync", "Hardware integration"],
    role: "DJ Software",
    isOwned: true,
    recommendedFor: "All DJ types",
  },
];

const categories: GearCategory[] = ["Controllers", "Audio", "Software"];

function CategoryIcon({ category }: { category: GearCategory }) {
  switch (category) {
    case "Controllers": return <Settings size={14} />;
    case "Audio":       return <VolumeUpFilled size={14} />;
    case "Software":    return <Chip size={14} />;
  }
}

const categoryTagType: Record<GearCategory, "purple" | "teal" | "blue"> = {
  Controllers: "purple",
  Audio:       "teal",
  Software:    "blue",
};

export default function GearSection() {
  const [activeCategory, setActiveCategory] = useState<GearCategory | "All">("All");

  const filtered =
    activeCategory === "All" ? gear : gear.filter((g) => g.category === activeCategory);

  return (
    <section
      id="gear"
      style={{
        position: "relative",
        padding: "8rem 0",
        backgroundColor: "var(--bg-surface)",
      }}
    >
      {/* subtle grid */}
      <div
        aria-hidden
        className="cyber-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.2 }}
      />

      <div className="section-inner" style={{ position: "relative", zIndex: 1 }}>
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
            The Rig
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 6vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "#ffffff",
            margin: 0,
          }}>
            DJ Gear &amp; <span style={{ color: "var(--accent-gold)" }}>Setup</span>
          </h2>
          <p style={{
            maxWidth: "38rem",
            margin: "1rem auto 0",
            color: "#94a3b8",
            fontWeight: 300,
            lineHeight: 1.7,
          }}>
            Professional-grade hardware and software meticulously selected for maximum
            reliability, sound quality, and creative freedom.
          </p>
        </motion.div>

        {/* Category filter */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.5rem",
          marginBottom: "2.5rem",
        }}>
          {(["All", ...categories] as (GearCategory | "All")[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
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
              {cat !== "All" && <CategoryIcon category={cat as GearCategory} />}
              {cat}
            </button>
          ))}
        </div>

        {/* Gear grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
          gap: "1.25rem",
        }}>
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass-card neon-border"
              style={{
                borderRadius: "0.75rem",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {/* Top */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
                <div>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <CarbonTag type={categoryTagType[item.category]} size="sm">
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                        <CategoryIcon category={item.category} />
                        {item.category}
                      </span>
                    </CarbonTag>
                  </div>
                  <h3 style={{
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 1.3,
                    letterSpacing: "0.04em",
                    margin: 0,
                  }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.125rem" }}>{item.brand}</p>
                </div>
                {item.isOwned && (
                  <Star size={16} style={{ color: "#f59e0b", flexShrink: 0, marginTop: "0.25rem" }} fill="currentColor" />
                )}
              </div>

              <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.65, flex: 1, margin: 0 }}>
                {item.description}
              </p>

              {/* Specs */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {item.specs.map((spec) => (
                  <li key={spec} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "#64748b" }}>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(201,168,76,0.5)", flexShrink: 0 }} />
                    {spec}
                  </li>
                ))}
              </ul>

              {/* Role + Recommended */}
              <div style={{
                borderTop: "1px solid rgba(255,255,255,0.05)",
                paddingTop: "0.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.75rem" }}>
                  <span style={{ color: "#64748b" }}>Role:</span>
                  <span style={{ color: "var(--accent-gold)", fontWeight: 500 }}>{item.role}</span>
                </div>
                {item.recommendedFor && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.75rem" }}>
                    <span style={{ color: "#64748b" }}>Best for:</span>
                    <span style={{ color: "#cbd5e1" }}>{item.recommendedFor}</span>
                  </div>
                )}
              </div>

              {item.link && (
                <a
                  href={item.link}
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
                  <Launch size={12} />
                  View Product
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
