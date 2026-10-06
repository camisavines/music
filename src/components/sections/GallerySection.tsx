"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Camera } from "lucide-react";

interface GalleryPhoto {
  src: string;
  alt: string;
  title: string;
  category: string;
  span?: string;
}

const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/images/gallery/DSC08914.JPG",
    alt: "Live DJ Performance",
    title: "Night Set · Main Stage",
    category: "Live Sets",
  },
  {
    src: "/images/gallery/DSC08916.JPG",
    alt: "DJ Behind the Decks",
    title: "Deck Control & Atmosphere",
    category: "Performance",
  },
  {
    src: "/images/gallery/DSC08928.JPG",
    alt: "DJ Mixing Live",
    title: "Vibe & Rhythm",
    category: "Live Sets",
  },
  {
    src: "/images/gallery/DSC08930.JPG",
    alt: "Crowd Energy and DJ Set",
    title: "High Energy Session",
    category: "Events",
  },
  {
    src: "/images/gallery/IMG_1231.JPG",
    alt: "Festival & Club Atmosphere",
    title: "Stage Lights & Sound",
    category: "Atmosphere",
  },
];

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  return (
    <section
      id="gallery"
      style={{
        position: "relative",
        padding: "8rem 0",
        backgroundColor: "var(--bg-surface)",
      }}
    >
      {/* Subtle background grid */}
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
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span
            style={{
              fontSize: "0.6875rem",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "var(--accent-gold)",
              marginBottom: "0.75rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Camera size={13} />
            Visuals &amp; Highlights
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 6vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "#ffffff",
              margin: 0,
            }}
          >
            Photo <span style={{ color: "var(--accent-gold)" }}>Gallery</span>
          </h2>
          <p
            style={{
              maxWidth: "38rem",
              margin: "1rem auto 0",
              color: "#94a3b8",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            A glimpse into the energy, lights, and unforgettable moments crafted behind the decks across clubs, private parties, and festival stages.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: "1.5rem",
          }}
        >
          {galleryPhotos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-card neon-border"
              onClick={() => setSelectedPhoto(photo)}
              style={{
                borderRadius: "0.875rem",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                aspectRatio: "4 / 3",
                group: "gallery-item",
              } as React.CSSProperties}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />

                {/* Overlay gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(8,6,8,0.85) 0%, rgba(8,6,8,0.2) 50%, transparent 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "1.25rem",
                    transition: "background 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "0.6875rem",
                          color: "var(--accent-gold)",
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                          fontWeight: 600,
                          display: "block",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {photo.category}
                      </span>
                      <h3
                        style={{
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "#ffffff",
                          margin: 0,
                        }}
                      >
                        {photo.title}
                      </h3>
                    </div>
                    <div
                      style={{
                        width: "2.25rem",
                        height: "2.25rem",
                        borderRadius: "50%",
                        background: "rgba(201,168,76,0.15)",
                        border: "1px solid rgba(201,168,76,0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent-gold)",
                        flexShrink: 0,
                      }}
                    >
                      <ZoomIn size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              backgroundColor: "rgba(0, 0, 0, 0.92)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo preview"
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#ffffff",
                borderRadius: "50%",
                width: "2.75rem",
                height: "2.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 100000,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(201,168,76,0.2)";
                e.currentTarget.style.borderColor = "var(--accent-gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              <X size={20} />
            </button>

            {/* Modal image container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "92vw",
                maxHeight: "85vh",
                width: "1000px",
                height: "650px",
                borderRadius: "0.875rem",
                overflow: "hidden",
                border: "1px solid rgba(201,168,76,0.3)",
                boxShadow: "0 0 40px rgba(0,0,0,0.8), 0 0 30px rgba(201,168,76,0.15)",
              }}
            >
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                priority
                sizes="95vw"
                style={{ objectFit: "contain", backgroundColor: "#080608" }}
              />

              {/* Caption banner */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1rem 1.5rem",
                  background:
                    "linear-gradient(to top, rgba(8,6,8,0.95) 0%, rgba(8,6,8,0.7) 70%, transparent 100%)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      color: "var(--accent-gold)",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      fontWeight: 600,
                      display: "block",
                    }}
                  >
                    {selectedPhoto.category}
                  </span>
                  <h4
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      margin: "0.25rem 0 0",
                    }}
                  >
                    {selectedPhoto.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
