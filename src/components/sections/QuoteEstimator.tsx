"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, DollarSign, ArrowDown, Info } from "lucide-react";
import Button from "@/components/ui/Button";

// ─── Pricing constants — update these if rates change ────────────────────────
const BASE_FEE   = 300;   // flat booking fee, always charged
const HOURLY_RATE = 100;  // per hour of performance time
const MIN_HOURS  = 1;
const MAX_HOURS  = 8;

function formatUSD(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function QuoteEstimator() {
  const [hours, setHours] = useState(3);

  const hourlyTotal = hours * HOURLY_RATE;
  const total       = BASE_FEE + hourlyTotal;

  // Width % for the filled portion of the custom track
  const pct = ((hours - MIN_HOURS) / (MAX_HOURS - MIN_HOURS)) * 100;

  return (
    <section id="quote" className="relative py-28 bg-dark-950">
      <div className="absolute inset-0 cyber-grid opacity-15" aria-hidden />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-gold-500 mb-3 block">
            Transparent Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-wide text-white mb-4">
            Instant <span style={{ color: "#C9A84C" }}>Quote</span>
          </h2>
          <p className="text-slate-400 font-light leading-relaxed">
            No hidden fees. Drag the slider to match your set length and see the
            exact price before you book.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass neon-border rounded-2xl p-8 sm:p-10 space-y-8"
        >
          {/* Slider row */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="hours-slider"
                className="flex items-center gap-2 text-xs font-semibold text-gold-400 uppercase tracking-[0.25em]"
              >
                <Clock className="w-3.5 h-3.5" />
                Performance Hours
              </label>
              <span className="text-2xl font-black text-white tabular-nums">
                {hours}h
              </span>
            </div>

            {/* Custom-styled range input */}
            <div className="relative h-2 rounded-full bg-white/10">
              {/* Filled track */}
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-150"
                style={{ width: `${pct}%` }}
              />
              <input
                id="hours-slider"
                type="range"
                min={MIN_HOURS}
                max={MAX_HOURS}
                step={0.5}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
                aria-label="Performance hours"
              />
              {/* Thumb indicator */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gold-400 border-2 border-dark-950 shadow-[0_0_10px_rgba(201,168,76,0.6)] transition-all duration-150 pointer-events-none"
                style={{ left: `calc(${pct}% - 10px)` }}
              />
            </div>

            {/* Tick labels */}
            <div className="flex justify-between text-xs text-slate-600 select-none px-0.5">
              {Array.from({ length: MAX_HOURS - MIN_HOURS + 1 }, (_, i) => i + MIN_HOURS).map((h) => (
                <span
                  key={h}
                  className={h === Math.floor(hours) || h === Math.ceil(hours) ? "text-slate-400" : ""}
                >
                  {h}h
                </span>
              ))}
            </div>
          </div>

          {/* Price breakdown */}
          <div className="space-y-3">
            <div className="divider-gold" />

            <div className="space-y-2 py-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Base booking fee</span>
                <span className="text-slate-300 tabular-nums font-medium">
                  {formatUSD(BASE_FEE)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">
                  {hours}h × {formatUSD(HOURLY_RATE)}/hr
                </span>
                <span className="text-slate-300 tabular-nums font-medium">
                  {formatUSD(hourlyTotal)}
                </span>
              </div>
            </div>

            <div className="divider-gold" />

            {/* Total */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gold-400" />
                <span className="text-sm font-semibold text-white uppercase tracking-widest">
                  Estimated Total
                </span>
              </div>
              <motion.span
                key={total}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className="text-3xl font-black tabular-nums"
                style={{ color: "#C9A84C" }}
              >
                {formatUSD(total)}
              </motion.span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2.5 rounded-lg bg-white/[0.03] border border-white/5 px-4 py-3">
            <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500 leading-relaxed">
              This is a starting estimate based on{" "}
              <span className="text-slate-400">{formatUSD(BASE_FEE)} base</span> +{" "}
              <span className="text-slate-400">{formatUSD(HOURLY_RATE)}/hr</span>.
              Equipment rental, travel, and any special requirements may affect
              the final quote — confirmed in writing after your inquiry.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() =>
                document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Book for {formatUSD(total)}
              <ArrowDown className="w-4 h-4" />
            </Button>
            <p className="text-xs text-slate-500 text-center sm:text-left">
              No payment now — submit an inquiry and we&apos;ll confirm the final price.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
