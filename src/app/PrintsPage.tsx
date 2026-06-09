import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { WoodinLogo } from "./components/WoodinLogo";
import { AfricanPatternBg } from "./components/AfricanPattern";
import { WhatsAppFloat } from "./components/WhatsAppFloat";

// Auto-discover all images in src/assets — add/remove files there to update the gallery
const imageModules = import.meta.glob<{ default: string }>("../assets/*.png", { eager: true });
const prints = Object.entries(imageModules).map(([path, mod]) => ({
  src: mod.default,
  name: path
    .replace(/^.*[\\/]/, "")
    .replace(/\.[^.]+$/, "")
    .replace(/-/g, " "),
}));

export default function PrintsPage() {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<{ src: string; name: string } | null>(null);

  return (
    <div
      className="relative min-h-screen w-full"
      style={{ background: "#1C0A00", fontFamily: "'Nunito', sans-serif" }}
    >
      <AfricanPatternBg />

      {/* ── Header ── */}
      <header
        className="sticky top-0 z-30 flex items-center justify-between px-5 py-4"
        style={{
          background: "rgba(28,10,0,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(201,137,58,0.18)",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm transition-colors duration-200"
          style={{ color: "#6B4A2A", background: "transparent", border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C9893A")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6B4A2A")}
        >
          ← Back
        </button>

        <div className="flex flex-col items-center gap-0.5">
          <WoodinLogo size={36} />
          <span
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: "#C9893A",
              textTransform: "uppercase",
            }}
          >
            Father's Day Collection
          </span>
        </div>

        {/* spacer to balance the back button */}
        <div style={{ width: 48 }} />
      </header>

      {/* ── Hero text ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center px-6 pt-10 pb-6 gap-3"
      >
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "0.68rem",
            letterSpacing: "0.35em",
            color: "#C9893A",
            textTransform: "uppercase",
          }}
        >
          Woodin Presents
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            fontWeight: 700,
            color: "#F5E6D0",
            lineHeight: 1.2,
          }}
        >
          Print{" "}
          <span style={{ color: "#C9893A", fontStyle: "italic" }}>Shades</span>
        </h1>
        <p
          className="max-w-xs"
          style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "#B8965A" }}
        >
          Every print tells a story. Find the shade that speaks for your dad.
        </p>
        <div className="w-16 h-px mt-1" style={{ background: "rgba(201,137,58,0.35)" }} />
      </motion.div>

      {/* ── Gallery grid ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="relative z-10 px-4 pb-24"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "12px",
          maxWidth: "1024px",
          margin: "0 auto",
        }}
      >
        {prints.map(({ src, name }, i) => (
          <motion.button
            key={src}
            onClick={() => setLightbox({ src, name })}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03, boxShadow: "0 12px 36px rgba(201,137,58,0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden rounded-2xl flex flex-col"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(201,137,58,0.22)",
              cursor: "pointer",
              padding: 0,
              textAlign: "left",
            }}
          >
            <div className="w-full" style={{ aspectRatio: "3/4", overflow: "hidden" }}>
              <img
                src={src}
                alt={name}
                loading="lazy"
                className="w-full h-full"
                style={{ objectFit: "cover", display: "block" }}
              />
            </div>
            <div
              className="px-3 py-2"
              style={{ borderTop: "1px solid rgba(201,137,58,0.15)" }}
            >
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "0.72rem",
                  color: "#B8965A",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {name}
              </p>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl overflow-hidden"
              style={{
                maxWidth: "min(420px, 90vw)",
                maxHeight: "85vh",
                border: "1px solid rgba(201,137,58,0.35)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.name}
                style={{ width: "100%", height: "auto", display: "block", maxHeight: "75vh", objectFit: "contain" }}
              />
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ background: "#1C0A00", borderTop: "1px solid rgba(201,137,58,0.2)" }}
              >
                <span
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "0.82rem",
                    color: "#C9893A",
                    fontWeight: 600,
                  }}
                >
                  {lightbox.name}
                </span>
                <button
                  onClick={() => setLightbox(null)}
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "0.78rem",
                    color: "#6B4A2A",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C9893A")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#6B4A2A")}
                >
                  Close ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Fabrics Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center px-6 py-12 gap-3"
      >
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "0.68rem",
            letterSpacing: "0.35em",
            color: "#C9893A",
            textTransform: "uppercase",
          }}
        >
          Premium Collection
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            fontWeight: 700,
            color: "#F5E6D0",
            lineHeight: 1.2,
          }}
        >
          Woodin <span style={{ color: "#C9893A", fontStyle: "italic" }}>Fabrics</span>
        </h2>
        <p
          className="max-w-xs"
          style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "#B8965A" }}
        >
          Discover our Tendresse Collection — elegant fabrics celebrating timeless style.
        </p>
        <div className="w-16 h-px mt-1" style={{ background: "rgba(201,137,58,0.35)" }} />
      </motion.div>

      {/* ── Fabrics Grid ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="relative z-10 px-4 pb-24"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "12px",
          maxWidth: "1024px",
          margin: "0 auto",
        }}
      >
        {[
          { id: "83000A", name: "Tendresse Azure" },
          { id: "83004A", name: "Tendresse Amber" },
          { id: "83006A", name: "Tendresse Earth" },
          { id: "83008A", name: "Tendresse Ruby" },
          { id: "83010A", name: "Tendresse Sage" },
        ].map(({ id, name }, i) => (
          <motion.a
            key={id}
            href={`https://woodinfashion.com/product/${id.toLowerCase()}/`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03, boxShadow: "0 12px 36px rgba(201,137,58,0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden rounded-2xl flex flex-col"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(201,137,58,0.22)",
              cursor: "pointer",
              padding: 0,
              textAlign: "left",
              textDecoration: "none",
            }}
          >
            <div className="w-full" style={{ aspectRatio: "3/4", overflow: "hidden", background: "rgba(201,137,58,0.1)" }}>
              <img
                src={`https://woodinfashion.com/wp-content/uploads/2026/05/${id}-300x300.jpg`}
                alt={name}
                loading="lazy"
                className="w-full h-full"
                style={{ objectFit: "cover", display: "block" }}
              />
            </div>
            <div
              className="px-3 py-2"
              style={{ borderTop: "1px solid rgba(201,137,58,0.15)" }}
            >
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "0.72rem",
                  color: "#C9893A",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: 600,
                }}
              >
                {name}
              </p>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* ── View All Fabrics Link ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 flex justify-center pb-12"
      >
        <a
          href="https://woodinfashion.com/fabrics/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 rounded-full font-bold transition-all"
          style={{
            background: "linear-gradient(135deg, #C9893A, #E05A2B)",
            color: "#1C0A00",
            fontFamily: "'Nunito', sans-serif",
            fontSize: "0.9rem",
            textDecoration: "none",
            boxShadow: "0 8px 32px rgba(201,137,58,0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(201,137,58,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,137,58,0.4)";
          }}
        >
          Explore All Fabrics →
        </a>
      </motion.div>

      {/* ── WhatsApp floating button ── */}
      <WhatsAppFloat />
    </div>
  );
}
