"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, DollarSign, ArrowDown, Info } from "lucide-react";
import { Button } from "@carbon/react";

// ─── Pricing constants ────────────────────────────────────────────────────────
const BASE_FEE    = 300;
const HOURLY_RATE = 100;
const MIN_HOURS   = 1;
const MAX_HOURS   = 8;

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
  const pct         = ((hours - MIN_HOURS) / (MAX_HOURS - MIN_HOURS)) * 100;

  return (
    <section
      id="quote"
      style={{
        position: "relative",
        padding: "7rem 0",
        backgroundColor: "var(--bg-base)",
      }}
    >
      <div
        aria-hidden
        className="cyber-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.15 }}
      />

      <div
        className="section-inner"
        style={{ position: "relative", zIndex: 1, maxWidth: "44rem" }}
      >
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
            Transparent Pricing
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 6vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "#ffffff",
            margin: 0,
          }}>
            Instant <span style={{ color: "var(--accent-gold)" }}>Quote</span>
          </h2>
          <p style={{
            color: "#94a3b8",
            fontWeight: 300,
            lineHeight: 1.7,
            marginTop: "1rem",
          }}>
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
          className="glass neon-border"
          style={{
            borderRadius: "1rem",
            padding: "clamp(1.5rem, 5vw, 2.5rem)",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* Slider row */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <label
                htmlFor="hours-slider"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: "var(--accent-gold)",
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                }}
              >
                <Clock size={14} />
                Performance Hours
              </label>
              <span style={{
                fontSize: "1.5rem",
                fontWeight: 900,
                color: "#ffffff",
                fontVariantNumeric: "tabular-nums",
              }}>
                {hours}h
              </span>
            </div>

            {/* Custom range input */}
            <div style={{ position: "relative", height: "8px", borderRadius: "9999px", background: "rgba(255,255,255,0.1)" }}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  borderRadius: "9999px",
                  background: "linear-gradient(to right, #b08d35, var(--accent-gold))",
                  transition: "width 0.15s",
                  width: `${pct}%`,
                }}
              />
              <input
                id="hours-slider"
                type="range"
                min={MIN_HOURS}
                max={MAX_HOURS}
                step={0.5}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  opacity: 0,
                  cursor: "pointer",
                  height: "8px",
                }}
                aria-label="Performance hours"
              />
              {/* Thumb indicator */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent-gold)",
                  border: "2px solid var(--bg-base)",
                  boxShadow: "0 0 10px rgba(201,168,76,0.6)",
                  transition: "left 0.15s",
                  pointerEvents: "none",
                  left: `${pct}%`,
                }}
              />
            </div>

            {/* Tick labels */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.75rem",
              color: "#475569",
              userSelect: "none",
              padding: "0 2px",
            }}>
              {Array.from({ length: MAX_HOURS - MIN_HOURS + 1 }, (_, i) => i + MIN_HOURS).map((h) => (
                <span key={h} style={{
                  color: (h === Math.floor(hours) || h === Math.ceil(hours)) ? "#94a3b8" : undefined,
                }}>
                  {h}h
                </span>
              ))}
            </div>
          </div>

          {/* Price breakdown */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div className="divider-gold" />
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "0.25rem 0" }}>
              {[
                { label: "Base booking fee", value: formatUSD(BASE_FEE) },
                { label: `${hours}h × ${formatUSD(HOURLY_RATE)}/hr`, value: formatUSD(hourlyTotal) },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.875rem" }}>
                  <span style={{ color: "#94a3b8" }}>{label}</span>
                  <span style={{ color: "#cbd5e1", fontVariantNumeric: "tabular-nums", fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>
            <div className="divider-gold" />

            {/* Total */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <DollarSign size={16} style={{ color: "var(--accent-gold)" }} />
                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#ffffff", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Estimated Total
                </span>
              </div>
              <motion.span
                key={total}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                style={{
                  fontSize: "1.875rem",
                  fontWeight: 900,
                  fontVariantNumeric: "tabular-nums",
                  color: "var(--accent-gold)",
                }}
              >
                {formatUSD(total)}
              </motion.span>
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.625rem",
            borderRadius: "0.5rem",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
            padding: "0.75rem 1rem",
          }}>
            <Info size={14} style={{ color: "#64748b", flexShrink: 0, marginTop: "2px" }} />
            <p style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
              This is a starting estimate based on{" "}
              <span style={{ color: "#94a3b8" }}>{formatUSD(BASE_FEE)} base</span> +{" "}
              <span style={{ color: "#94a3b8" }}>{formatUSD(HOURLY_RATE)}/hr</span>.
              Equipment rental, travel, and any special requirements may affect
              the final quote — confirmed in writing after your inquiry.
            </p>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
            <Button
              kind="primary"
              size="lg"
              style={{ flex: "1 1 auto", minWidth: "0", justifyContent: "center" }}
              onClick={() =>
                document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Book for {formatUSD(total)}
              <ArrowDown size={16} style={{ marginLeft: "0.5rem" }} />
            </Button>
            <p style={{ fontSize: "0.75rem", color: "#64748b", flex: "1 1 200px" }}>
              No payment now — submit an inquiry and we&apos;ll confirm the final price.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
