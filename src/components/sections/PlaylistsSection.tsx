"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Music2, ExternalLink, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type VibeCategory = "All" | "House" | "Hip-Hop" | "Lounge" | "Wedding" | "Afrobeats" | "Techno";

interface Playlist {
  id: string;
  title: string;
  description: string;
  vibe: Exclude<VibeCategory, "All">;
  trackCount: number;
  duration: string;
  appleMusicId: string; // Apple Music playlist embed ID
  coverColor: string;   // gradient fallback
  tags: string[];
}

const playlists: Playlist[] = [
  {
    id: "p1",
    title: "Peak Hour House",
    description:
      "Deep melodic house to underground bangers — the perfect club set arc from 1AM to close.",
    vibe: "House",
    trackCount: 42,
    duration: "3h 10m",
    appleMusicId: "pl.u-d2b0BBXTdR5N",
    coverColor: "from-cyan-500/20 to-blue-500/20",
    tags: ["Deep House", "Melodic Techno", "Afro House"],
  },
  {
    id: "p2",
    title: "Hip-Hop Essentials",
    description:
      "Old-school golden era to modern trap, R&B blends, and party anthems that never miss.",
    vibe: "Hip-Hop",
    trackCount: 55,
    duration: "3h 45m",
    appleMusicId: "pl.u-d2b0BBXTdR5N",
    coverColor: "from-purple-500/20 to-pink-500/20",
    tags: ["Trap", "R&B", "Golden Era", "Drill"],
  },
  {
    id: "p3",
    title: "Sunset Lounge",
    description:
      "Smooth, sophisticated house and nu-jazz perfect for cocktail hours and rooftop sessions.",
    vibe: "Lounge",
    trackCount: 30,
    duration: "2h 15m",
    appleMusicId: "pl.u-d2b0BBXTdR5N",
    coverColor: "from-amber-500/20 to-orange-500/20",
    tags: ["Nu-Jazz", "Chill House", "Bossa Nova"],
  },
  {
    id: "p4",
    title: "Wedding Classics & Bangers",
    description:
      "Timeless hits blended with modern anthems — guaranteed dance floor from first dance to last call.",
    vibe: "Wedding",
    trackCount: 68,
    duration: "5h 00m",
    appleMusicId: "pl.u-d2b0BBXTdR5N",
    coverColor: "from-rose-500/20 to-pink-400/20",
    tags: ["Top 40", "80s Classics", "Pop", "Soul"],
  },
  {
    id: "p5",
    title: "Afrobeats Fire",
    description:
      "The hottest Afrobeats, Amapiano, and Afro-fusion — high-energy, infectious rhythms.",
    vibe: "Afrobeats",
    trackCount: 38,
    duration: "2h 30m",
    appleMusicId: "pl.u-d2b0BBXTdR5N",
    coverColor: "from-green-500/20 to-teal-500/20",
    tags: ["Amapiano", "Afro-Fusion", "Highlife"],
  },
  {
    id: "p6",
    title: "Industrial Techno",
    description:
      "Dark, relentless, hypnotic — a journey through the harder side of electronic music.",
    vibe: "Techno",
    trackCount: 35,
    duration: "3h 00m",
    appleMusicId: "pl.u-d2b0BBXTdR5N",
    coverColor: "from-slate-600/20 to-zinc-700/20",
    tags: ["Industrial", "Dark Techno", "Berlin"],
  },
];

const vibes: VibeCategory[] = ["All", "House", "Hip-Hop", "Lounge", "Wedding", "Afrobeats", "Techno"];

const vibeColors: Record<Exclude<VibeCategory, "All">, string> = {
  House:      "text-gold-400",
  "Hip-Hop":  "text-violet-400",
  Lounge:     "text-amber-300",
  Wedding:    "text-rose-300",
  Afrobeats:  "text-teal-300",
  Techno:     "text-slate-400",
};

export default function PlaylistsSection() {
  const [activeVibe, setActiveVibe]       = useState<VibeCategory>("All");
  const [openEmbed, setOpenEmbed]         = useState<string | null>(null);

  const filtered =
    activeVibe === "All" ? playlists : playlists.filter((p) => p.vibe === activeVibe);

  return (
    <section id="playlists" className="relative py-28 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-gold-500 mb-3 block">
            Music
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-wide text-white mb-4">
            Curated <span style={{ color: "#C9A84C" }}>Playlists</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 font-light leading-relaxed">
            Handcrafted sets for every mood and occasion — from wedding first
            dances to after-hours club sets. Preview and share with your guests
            before the event.
          </p>
        </motion.div>

        {/* Vibe filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {vibes.map((vibe) => (
            <button
              key={vibe}
              onClick={() => setActiveVibe(vibe)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300",
                activeVibe === vibe
                  ? "bg-gold-400 border-gold-400 text-dark-950 shadow-[0_0_14px_rgba(201,168,76,0.45)]"
                  : "border-white/8 text-slate-400 hover:border-gold-400/35 hover:text-gold-400 bg-white/4"
              )}
            >
              {vibe}
            </button>
          ))}
        </div>

        {/* Playlist grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((playlist, i) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group glass-card neon-border rounded-xl overflow-hidden hover:neon-border-purple transition-all duration-300 flex flex-col"
            >
              {/* Cover art / gradient */}
              <div className={cn("relative h-32 bg-gradient-to-br flex items-center justify-center", playlist.coverColor)}>
                <Music2 className="w-12 h-12 text-white/20" />
                <button
                  onClick={() => setOpenEmbed(openEmbed === playlist.id ? null : playlist.id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-all duration-300"
                  aria-label={`Play ${playlist.title}`}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm border border-white/30 transition-transform duration-300",
                      openEmbed === playlist.id ? "scale-110" : "scale-100 group-hover:scale-110"
                    )}
                  >
                    <Play className="w-5 h-5 text-white" fill="currentColor" />
                  </div>
                </button>
                <span
                  className={cn(
                    "absolute top-3 right-3 text-xs font-bold uppercase tracking-wider",
                    vibeColors[playlist.vibe]
                  )}
                >
                  {playlist.vibe}
                </span>
              </div>

              {/* Apple Music Embed */}
              {openEmbed === playlist.id && (
                <div className="border-t border-white/5">
                  <iframe
                    allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                    height="175"
                    style={{ width: "100%", overflow: "hidden", background: "transparent" }}
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                    src={`https://embed.music.apple.com/us/playlist/${playlist.appleMusicId}`}
                    title={`Apple Music: ${playlist.title}`}
                  />
                </div>
              )}

              {/* Info */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <h3 className="font-semibold text-white/90 group-hover:text-gold-400 transition-colors tracking-wide">
                    {playlist.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {playlist.trackCount} tracks · {playlist.duration}
                  </p>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed flex-1">
                  {playlist.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {playlist.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-slate-500 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={`https://music.apple.com/us/playlist/${playlist.appleMusicId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 text-xs font-medium text-gold-500/70 hover:text-gold-400 transition-colors mt-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
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
