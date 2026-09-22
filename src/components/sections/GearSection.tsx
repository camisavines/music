"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Speaker, Sliders, Lightbulb, Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type GearCategory = "Controllers" | "Mixers" | "Audio" | "Lighting" | "Software";

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
    description:
      "The industry-standard professional multi-player. Found in every major club worldwide.",
    specs: ["9-inch HD touchscreen", "High-res 96kHz/32-bit audio", "NXS2 & Rekordbox connectivity", "Slip mode & Beat Sync"],
    role: "Primary Deck",
    isOwned: true,
    recommendedFor: "Club & Festival DJs",
    link: "https://www.pioneerdj.com/cdj-3000",
  },
  {
    id: "g2",
    name: "DJM-A9",
    brand: "Pioneer DJ",
    category: "Mixers",
    description:
      "Flagship 4-channel club mixer with studio-grade sound and built-in effects.",
    specs: ["4-channel design", "32-bit internal processing", "Built-in Beat FX + Sound Color FX", "Bluetooth audio capability"],
    role: "Main Mixer",
    isOwned: true,
    recommendedFor: "Professional DJs",
    link: "https://www.pioneerdj.com/djm-a9",
  },
  {
    id: "g3",
    name: "Technics SL-1210MK7",
    brand: "Technics",
    category: "Controllers",
    description:
      "Legendary direct-drive turntable for scratch DJs and vinyl purists.",
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
    description:
      "All-in-one 4-channel controller bridging Rekordbox and Serato workflows.",
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
    description:
      "2000W powered PA speaker delivering crystal-clear, loud, and punchy sound.",
    specs: ["2000W Class D amp", "12-inch woofer", "1.4-inch compression driver", "DSP onboard"],
    role: "PA System",
    isOwned: true,
    recommendedFor: "Indoor events up to 500 guests",
  },
  {
    id: "g6",
    name: "Pioneer DJ RMXBOOTH",
    brand: "Pioneer DJ",
    category: "Mixers",
    description: "Professional booth monitor for accurate reference monitoring on stage.",
    specs: ["Class-D amplifier", "4-inch driver + tweeter", "100–20kHz response", "XLR input"],
    role: "Booth Monitor",
    isOwned: true,
    recommendedFor: "All live setups",
  },
  {
    id: "g7",
    name: "Rekordbox + Serato DJ Pro",
    brand: "Pioneer DJ / Serato",
    category: "Software",
    description:
      "Dual-software workflow for maximum versatility — analyze, prepare, and perform.",
    specs: ["AI key/BPM detection", "DVS scratch support", "Cloud library sync", "Hardware integration"],
    role: "DJ Software",
    isOwned: true,
    recommendedFor: "All DJ types",
  },
  {
    id: "g8",
    name: "Chauvet DJ Intimspot 355Z",
    brand: "Chauvet DJ",
    category: "Lighting",
    description:
      "Motorized zoom intelligent fixture delivering dynamic beams and aerial effects.",
    specs: ["355° pan / 265° tilt", "3-30° zoom", "16-color wheel", "DMX512 + standalone"],
    role: "Moving Head",
    isOwned: true,
    recommendedFor: "Private events & small venues",
  },
];

const categories: GearCategory[] = ["Controllers", "Mixers", "Audio", "Lighting", "Software"];

function CategoryIcon({ category }: { category: GearCategory }) {
  switch (category) {
    case "Controllers": return <Sliders className="w-4 h-4" />;
    case "Mixers":      return <Sliders className="w-4 h-4" />;
    case "Audio":       return <Speaker className="w-4 h-4" />;
    case "Lighting":    return <Lightbulb className="w-4 h-4" />;
    case "Software":    return <Cpu className="w-4 h-4" />;
  }
}

const categoryColors: Record<GearCategory, string> = {
  Controllers: "text-gold-400 bg-gold-400/10 border-gold-400/25",
  Mixers:      "text-violet-400 bg-violet-500/10 border-violet-500/25",
  Audio:       "text-teal-300 bg-teal-500/8 border-teal-400/20",
  Lighting:    "text-amber-300 bg-amber-500/8 border-amber-400/20",
  Software:    "text-blue-300 bg-blue-500/8 border-blue-400/20",
};

export default function GearSection() {
  const [activeCategory, setActiveCategory] = useState<GearCategory | "All">("All");

  const filtered =
    activeCategory === "All" ? gear : gear.filter((g) => g.category === activeCategory);

  return (
    <section id="gear" className="relative py-32 bg-dark-900">
      {/* subtle grid */}
      <div className="absolute inset-0 cyber-grid opacity-20" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-gold-500 mb-3 block">
            The Rig
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-wide text-white mb-4">
            DJ Gear &amp; <span style={{ color: "#C9A84C" }}>Setup</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 font-light leading-relaxed">
            Professional-grade hardware and software meticulously selected for maximum
            reliability, sound quality, and creative freedom.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(["All", ...categories] as (GearCategory | "All")[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300",
                activeCategory === cat
                  ? "bg-gold-400 border-gold-400 text-dark-950 shadow-[0_0_14px_rgba(201,168,76,0.45)]"
                  : "border-white/8 text-slate-400 hover:border-gold-400/35 hover:text-gold-400 bg-white/4"
              )}
            >
              {cat !== "All" && <CategoryIcon category={cat as GearCategory} />}
              {cat}
            </button>
          ))}
        </div>

        {/* Gear grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass-card neon-border rounded-xl p-5 flex flex-col gap-4 hover:neon-border-purple transition-all duration-300 group"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border mb-2",
                      categoryColors[item.category]
                    )}
                  >
                    <CategoryIcon category={item.category} />
                    {item.category}
                  </span>
                  <h3 className="font-semibold text-white/90 group-hover:text-gold-400 transition-colors leading-tight tracking-wide">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500">{item.brand}</p>
                </div>
                {item.isOwned && (
                  <Star className="w-4 h-4 text-amber-400 shrink-0 mt-1" fill="currentColor" />
                )}
              </div>

              <p className="text-sm text-slate-400 leading-relaxed flex-1">{item.description}</p>

              {/* Specs */}
              <ul className="space-y-1">
                {item.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-1 h-1 rounded-full bg-gold-400/50 shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>

              {/* Role + Recommended */}
              <div className="border-t border-white/5 pt-3 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Role:</span>
                  <span className="text-gold-400 font-medium">{item.role}</span>
                </div>
                {item.recommendedFor && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Best for:</span>
                    <span className="text-slate-300">{item.recommendedFor}</span>
                  </div>
                )}
              </div>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 text-xs font-medium text-gold-500/70 hover:text-gold-400 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
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
