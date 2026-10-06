"use client";

import { Music2, Instagram, Twitter, Youtube, Mail } from "lucide-react";

const socials = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Twitter,   href: "#", label: "Twitter" },
  { Icon: Youtube,   href: "#", label: "YouTube" },
  { Icon: Mail,      href: "#booking", label: "Email" },
];

const quickLinks = [
  { href: "#events",    label: "Past Events" },
  { href: "#gallery",   label: "Gallery" },
  { href: "#playlists", label: "Playlists" },
  { href: "#booking",   label: "Book Now" },
];

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.05)",
      backgroundColor: "var(--bg-base)",
      padding: "3rem 0",
    }}>
      <div className="section-inner">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2.5rem",
        }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <Music2 size={22} style={{ color: "var(--accent-gold)", flexShrink: 0 }} strokeWidth={1.5} />
              <span style={{ color: "#ffffff", fontWeight: 700, letterSpacing: "0.05em" }}>
                DJ Neva<span style={{ color: "var(--accent-violet)" }}>Misa</span>Beat
              </span>
            </div>
            <p style={{
              fontSize: "0.875rem",
              color: "#64748b",
              lineHeight: 1.7,
              maxWidth: "20rem",
            }}>
              Professional DJ &amp; music producer based in Los Angeles. Available
              worldwide for clubs, festivals, weddings, and private events.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#475569",
              marginBottom: "1rem",
            }}>
              Navigate
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    style={{
                      fontSize: "0.875rem",
                      color: "#94a3b8",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#475569",
              marginBottom: "1rem",
            }}>
              Connect
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    color: "#64748b",
                    border: "1px solid rgba(255,255,255,0.05)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "color 0.2s, border-color 0.2s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent-gold)";
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#64748b";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          marginTop: "2.5rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
        }}>
          <p style={{ fontSize: "0.75rem", color: "#334155" }}>
            &copy; {new Date().getFullYear()} DJ NevaMisaBeat. All rights reserved.
          </p>
          <p style={{ fontSize: "0.75rem", color: "#1e293b" }}>
            Built with Next.js &middot; Carbon Design System &middot; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
