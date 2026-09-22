"use client";

import { motion } from "framer-motion";
import { ArrowDown, Calendar, MapPin, Users } from "lucide-react";
import Button from "@/components/ui/Button";

// ─── Animated waveform ────────────────────────────────────────────────────────
function Waveform({ bars = 32 }: { bars?: number }) {
  return (
    <div className="flex items-end gap-[3px] h-14 overflow-hidden" aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="wave-bar flex-1 min-w-[3px] rounded-sm"
          style={{
            // Gradient shifts gold → violet to span both audience aesthetics
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
  { icon: Calendar, value: "500+", label: "Events Played" },
  { icon: MapPin,   value: "30+",  label: "Cities Worldwide" },
  { icon: Users,    value: "2M+",  label: "Crowd Reached" },
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
  hidden:   { opacity: 0, y: 28 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const scrollToBooking = () =>
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-dark-950"
    >
      {/*
       * ── Hero background image ──────────────────────────────────────────────
       * Replace the Unsplash URL below with your own photo when ready.
       * Recommended: dramatic stage lighting, moody crowd, or abstract light
       * art — minimum 1920 × 1080 px.
       * To use a local file instead, move it to public/images/hero-bg.jpg and
       * swap the backgroundImage value to: url('/images/hero-bg.jpg')
       */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      >
        {/* Multi-stop gradient: opaque at top (nav), eases to semi-transparent
            mid-frame so the image shows through, then solid at the bottom so
            it blends smoothly into the next section. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,6,8,0.85) 0%, rgba(8,6,8,0.55) 35%, rgba(8,6,8,0.65) 65%, rgba(8,6,8,0.97) 100%)",
          }}
        />
        {/* Warm vignette around edges for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 90% at 50% 50%, transparent 40%, rgba(8,6,8,0.7) 100%)",
          }}
        />
      </div>

      {/* Subtle cyber grid — very low opacity on top of image */}
      <div className="absolute inset-0 cyber-grid opacity-20" aria-hidden />

      {/* Gold ambient glow — upper centre */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[340px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />
      {/* Violet ambient glow — lower left */}
      <div
        className="absolute bottom-1/4 left-1/4 w-[500px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />

      {/* Scan line — slowed down for elegance */}
      <div
        className="absolute left-0 right-0 h-px animate-scan pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(201,168,76,0.18) 30%, rgba(201,168,76,0.18) 70%, transparent)",
        }}
        aria-hidden
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-8"
        >
          {/* Status badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass neon-border text-xs font-semibold tracking-[0.2em] uppercase text-gold-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse-slow inline-block" />
              Available for Bookings · 2025
            </span>
          </motion.div>

          {/* Main heading — generous tracking for elegance */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[108px] font-black tracking-wide leading-none">
              <span className="block text-white/95 tracking-widest font-light text-2xl sm:text-3xl mb-2 uppercase"
                    style={{ letterSpacing: "0.55em" }}>
                DJ
              </span>
              <span
                className="block text-glow-cyan"
                style={{ color: "#C9A84C", letterSpacing: "0.06em" }}
              >
                AXIOM
              </span>
            </h1>
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.45em] text-slate-400/80">
              Clubs &nbsp;·&nbsp; Festivals &nbsp;·&nbsp; Weddings &nbsp;·&nbsp; Corporate
            </p>
          </motion.div>

          {/* Waveform */}
          <motion.div variants={itemVariants} className="w-full max-w-md opacity-80">
            <Waveform bars={38} />
          </motion.div>

          {/* Tagline — dual-audience inclusive copy */}
          <motion.p
            variants={itemVariants}
            className="max-w-lg text-base sm:text-lg text-slate-300/80 leading-relaxed font-light"
            style={{ letterSpacing: "0.01em" }}
          >
            From intimate wedding receptions and boardroom galas to sold-out
            festival stages — world-class sound, atmosphere, and craft for every
            occasion.
          </motion.p>

          {/* CTAs — refined, paired */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3.5">
            <Button size="lg" onClick={scrollToBooking}>
              <Calendar className="w-4 h-4" />
              Reserve Your Date
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Portfolio
            </Button>
          </motion.div>

          {/* Stats — spaced and subdued for elegance */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-8 sm:gap-16 mt-6 w-full max-w-xs sm:max-w-sm"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 text-gold-400/70 mb-0.5" strokeWidth={1.5} />
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {value}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 text-center uppercase tracking-widest">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5" />
      </motion.div>
    </section>
  );
}
