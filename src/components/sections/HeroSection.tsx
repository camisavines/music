"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Calendar, Location, UserMultiple } from "@carbon/icons-react";
import { Button } from "@carbon/react";

// ─── Animated waveform ────────────────────────────────────────────────────────
function Waveform({ bars = 32 }: { bars?: number }) {
  return (
    <div
      aria-hidden
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "3px",
        height: "3.5rem",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="wave-bar"
          style={{
            flex: 1,
            minWidth: "3px",
            borderRadius: "2px",
            background: `linear-gradient(to top, rgba(201,168,76,0.9), rgba(124,58,237,0.6))`,
            transformOrigin: "bottom",
          }}
          animate={{ scaleY: [0.15, Math.random() * 0.75 + 0.2, 0.15] }}
          transition={{
            duration: 1.4 + (i % 5) * 0.18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (i * 0.04) % 0.9,
          }}
        />
      ))}
    </div>
  );
}

// ─── Stats row ────────────────────────────────────────────────────────────────
const stats = [
  { icon: Calendar, value: "5+", label: "Events Played" },
  { icon: Location, value: "30+", label: "Cities Worldwide" },
  { icon: UserMultiple, value: "2M+", label: "Crowd Reached" },
];

// ─── Motion variants ──────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.4 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const scrollToBooking = () =>
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "var(--bg-base)",
      }}
    >
      {/* Hero background */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/gallery/IMG_1231.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(8,6,8,0.50) 0%, rgba(8,6,8,0.55) 100%",
            // "linear-gradient(to bottom, rgba(8,6,8,0.85) 0%, rgba(8,6,8,0.55) 10%, rgba(8,6,8,0.15) 90%, rgba(8,6,8,0.99) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 110% 90% at 50% 50%, transparent 40%, rgba(8,6,8,0.7) 100%)",
          }}
        />
      </div>

      {/* Cyber grid overlay */}
      <div
        aria-hidden
        className="cyber-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.2 }}
      />

      {/* Gold ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(900px, 100vw)",
          height: "340px",
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Scan line */}
      <div
        aria-hidden
        className="animate-scan"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(201,168,76,0.18) 30%, rgba(201,168,76,0.18) 70%, transparent)",
          pointerEvents: "none",
        }}
      />

      {/* ── Content ── */}
      <div
        className="section-inner"
        style={{
          position: "relative",
          zIndex: 10,
          paddingTop: "7rem",
          paddingBottom: "5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          {/* Status badge */}
          <motion.div variants={itemVariants}>
            <span
              className="glass neon-border"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.5rem 1.25rem",
                borderRadius: "9999px",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent-gold)",
              }}
            >
              <span
                className="animate-pulse-slow"
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent-gold)",
                  display: "inline-block",
                }}
              />
              Available for Bookings · 2027
            </span>
          </motion.div>

          {/* DJ Profile Photo */}
          <motion.div variants={itemVariants}>
            <div
              style={{
                position: "relative",
                width: "clamp(120px, 20vw, 170px)",
                height: "clamp(120px, 20vw, 170px)",
                borderRadius: "50%",
                padding: "4px",
                background:
                  "linear-gradient(135deg, rgba(201,168,76,0.8), rgba(124,58,237,0.5), rgba(201,168,76,0.2))",
                boxShadow:
                  "0 0 30px rgba(201,168,76,0.25), 0 0 60px rgba(124,58,237,0.15)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/images/djmisa.JPG"
                  alt="DJ Misa"
                  fill
                  priority
                  sizes="(max-width: 768px) 140px, 170px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center 20%",
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div variants={itemVariants}>
            <h1
              style={{
                fontWeight: 900,
                letterSpacing: "0.06em",
                lineHeight: 1,
                margin: 0,
                fontSize: "clamp(3rem, 12vw, 7rem)",
              }}
            >
              <span
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.95)",
                  fontWeight: 300,
                  fontSize: "clamp(0.875rem, 3vw, 1.5rem)",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                DJ
              </span>

              <span style={{ color: "#ffffff" }}>NevaMisaBeat</span>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans-family)",
                fontSize: "clamp(0.625rem, 1.5vw, 0.75rem)",
                textTransform: "uppercase",
                letterSpacing: "0.45em",
                color: "rgba(148,163,184,0.8)",
                marginTop: "0.75rem",
              }}
            >
              Clubs &nbsp;·&nbsp; Festivals &nbsp;·&nbsp; Weddings &nbsp;·&nbsp;
              Corporate
            </p>
          </motion.div>

          {/* Waveform */}
          <motion.div
            variants={itemVariants}
            style={{ width: "100%", maxWidth: "28rem", opacity: 0.8 }}
          >
            <Waveform bars={38} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            style={{
              maxWidth: "34rem",
              fontSize: "clamp(0.9375rem, 2.5vw, 1.125rem)",
              color: "rgba(203,213,225,0.8)",
              lineHeight: 1.7,
              fontWeight: 300,
              letterSpacing: "0.01em",
              margin: 0,
            }}
          >
            From intimate wedding receptions and boardroom galas to sold-out
            festival stages — world-class sound, atmosphere, and craft for every
            occasion.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.875rem",
            }}
          >
            <Button kind="primary" size="lg" onClick={scrollToBooking}>
              <Calendar size={16} style={{ marginRight: "0.5rem" }} />
              Reserve Your Date
            </Button>
            <Button
              kind="tertiary"
              size="lg"
              onClick={() =>
                document
                  .getElementById("events")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Portfolio
            </Button>
          </motion.div>

          {/* Stats */}
          {/* <motion.div
            variants={itemVariants}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
              marginTop: "1.5rem",
              width: "100%",
              maxWidth: "22rem",
            }}
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                <Icon
                  size={14}
                  style={{ color: "rgba(201,168,76,0.7)", marginBottom: "2px" }}
                  strokeWidth={1.5}
                />
                <span
                  style={{
                    fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
                    fontWeight: 900,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    fontSize: "0.625rem",
                    color: "#64748b",
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div> */}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{
          width: "200px",
          position: "relative",
          bottom: "2rem",
          left: "calc(50% - 100px)",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "#475569",
          padding: "3rem 0",
        }}
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          style={{
            fontSize: "0.625rem",
            textTransform: "uppercase",
            letterSpacing: "0.4em",
          }}
        >
          Scroll
        </span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  );
}
