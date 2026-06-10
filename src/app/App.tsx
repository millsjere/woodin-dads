import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { WoodinLogo } from "./components/WoodinLogo";
import { AfricanPatternBg } from "./components/AfricanPattern";
import { matchShade, type WoodinShade } from "./components/shades-data";
// @ts-ignore - Vite handles ?url imports correctly at build time
import azureCardUrl from "../cards/Father's Day Card1-azure.jpeg?url";
// @ts-ignore
import terraCardUrl from "../cards/Father's Day Card1-terra.jpeg?url";
// @ts-ignore
import goldenCardUrl from "../cards/Father's Day Card1-golden.jpeg?url";
// @ts-ignore
import crimsonCardUrl from "../cards/Father's Day Card1-crimson.jpeg?url";
// @ts-ignore
import monochromeCardUrl from "../cards/Father's Day Card-monochrome.jpeg?url";

// Map shade IDs to card image URLs
const shadeCardMap: Record<string, string> = {
  "azure-anchor": azureCardUrl,
  "terra-firma": terraCardUrl,
  "golden-glow": goldenCardUrl,
  "crimson-core": crimsonCardUrl,
  "monochrome-mystery": monochromeCardUrl,
};

// Debug: Log card image paths on load
if (typeof window !== "undefined") {
  console.log("Card images loaded:", shadeCardMap);
}

type Stage = "splash" | "input" | "revealing" | "result";

// Helper to determine if text should be dark or light based on background color
function getTextColorForShade(shadeId: string): { text: string; description: string; tagline: string } {
  if (shadeId === "golden-glow") {
    return {
      text: "#1C0A00",
      description: "#1C0A00",
      tagline: "#1C0A00",
    };
  }
  return {
    text: "#F5E6D0",
    description: "#C9B48A",
    tagline: "currentColor", // uses shade.color
  };
}

function SplashScreen() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Decorative rings */}
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute rounded-full border border-[#C9893A]/20"
          style={{ width: 180, height: 180 }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full border border-[#E05A2B]/15"
          style={{ width: 240, height: 240 }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 200 }}
        >
          <WoodinLogo size={100} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="flex flex-col items-center gap-2"
      >
        <p
          className="tracking-[0.35em] text-[#C9893A] uppercase"
          style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem" }}
        >
          Woodin Presents
        </p>
        <h1
          className="text-[#F5E6D0]"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            fontWeight: 700,
            lineHeight: 1.15,
          }}
        >
          Shades Of
          <br />
          <span style={{ color: "#C9893A", fontStyle: "italic" }}>A Dad</span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="text-[#B8965A] max-w-xs"
        style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.9rem", lineHeight: 1.6 }}
      >
        Every father has a shade uniquely his own.
        <br />
        Discover yours.
      </motion.p>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex gap-2 mt-4"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#C9893A]"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

function InputScreen({ onReveal }: { onReveal: (text: string) => void }) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canReveal = text.trim().length > 20;

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full px-6 py-10 gap-8 max-w-lg mx-auto w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <WoodinLogo size={52} />
        <div>
          <p
            className="tracking-[0.3em] text-[#C9893A] uppercase mb-1"
            style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.65rem" }}
          >
            Shades Of A Dad
          </p>
          <h2
            className="text-[#F5E6D0]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Tell us about{" "}
            <span style={{ color: "#C9893A", fontStyle: "italic" }}>your dad</span>
          </h2>
        </div>
        <p
          className="text-[#B8965A] max-w-sm"
          style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.85rem", lineHeight: 1.6 }}
        >
          Who is he? What makes him uniquely him? Share his personality, his ways, the things that define him.
        </p>
      </div>

      {/* Textarea */}
      <div className="w-full relative">
        {/* Decorative border glow */}
        <div
          className="absolute -inset-px rounded-2xl pointer-events-none transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, #C9893A40, #E05A2B30, #C9893A40)",
            opacity: text.length > 0 ? 1 : 0.4,
          }}
        />
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="He was the kind of man who... My dad always... Growing up, he taught me..."
          rows={6}
          className="w-full rounded-2xl p-5 resize-none outline-none transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(201,137,58,0.3)",
            color: "#F5E6D0",
            fontFamily: "'Nunito', sans-serif",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            caretColor: "#C9893A",
          }}
        />
        <div
          className="absolute bottom-4 right-5 text-xs"
          style={{
            color: text.length < 20 ? "#6B4A2A" : "#C9893A",
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          {text.length} chars {text.length < 20 && text.length > 0 ? "— keep going..." : ""}
        </div>
      </div>

      {/* CTA Button */}
      <motion.button
        onClick={() => canReveal && onReveal(text)}
        disabled={!canReveal}
        className="relative w-full max-w-xs overflow-hidden rounded-full py-4 px-8 transition-all duration-300"
        style={{
          background: canReveal
            ? "linear-gradient(135deg, #C9893A, #E05A2B)"
            : "rgba(255,255,255,0.05)",
          border: canReveal ? "none" : "1px solid rgba(201,137,58,0.2)",
          color: canReveal ? "#1C0A00" : "#6B4A2A",
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          letterSpacing: "0.05em",
          cursor: canReveal ? "pointer" : "not-allowed",
          boxShadow: canReveal ? "0 8px 32px rgba(201,137,58,0.4)" : "none",
        }}
        whileHover={canReveal ? { scale: 1.03, boxShadow: "0 12px 40px rgba(201,137,58,0.5)" } : {}}
        whileTap={canReveal ? { scale: 0.97 } : {}}
      >
        {canReveal && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
            }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        )}
        <span className="relative">✦ Reveal His Shade</span>
      </motion.button>
    </motion.div>
  );
}

function RevealingScreen() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 80 + i * 60,
              height: 80 + i * 60,
              border: "1px solid #C9893A",
              opacity: 0.4 - i * 0.1,
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4 - i * 0.1, 0.7 - i * 0.1, 0.4 - i * 0.1] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          />
        ))}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <WoodinLogo size={72} />
        </motion.div>
      </div>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-[#C9893A] tracking-widest uppercase text-sm"
        style={{ fontFamily: "'Nunito', sans-serif", letterSpacing: "0.25em" }}
      >
        Reading his spirit...
      </motion.p>
    </motion.div>
  );
}

function ResultScreen({
  shade,
  percentage,
  onReset,
}: {
  shade: WoodinShade;
  percentage: number;
  onReset: () => void;
}) {
  const navigate = useNavigate();
  const [cardVisible, setCardVisible] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCardVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);


  function handleDownloadCard() {
    setShowCardModal(true);
  }

  function handleDownloadCardFile() {
    try {
      const cardImageUrl = shadeCardMap[shade.id];
      if (!cardImageUrl) {
        console.error("Card image not found for shade:", shade.id);
        return;
      }

      // Fetch the image and download it
      fetch(cardImageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = `woodin-fathers-day-${shade.id}.jpeg`;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("Download failed:", error);
          // Fallback: open in new tab
          window.open(cardImageUrl, "_blank");
        });
    } catch (error) {
      console.error("Download error:", error);
    }
  }

  function handleShareFacebook() {
    const canvas = modalCanvasRef.current;
    if (!canvas) return;
    const imageUrl = canvas.toDataURL("image/png");
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=I%20discovered%20my%20Father%27s%20Day%20shade:%20${shade.name}%20from%20Woodin!`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  }

  function handleShareWhatsApp() {
    const canvas = modalCanvasRef.current;
    if (!canvas) return;
    const message = `I just discovered my Father's Day shade: "${shade.name} — ${shade.tagline}" from Woodin! 🎨 What's yours? Try the Shades of A Dad quiz!`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  }

  async function handleShareInstagram() {
    const message = `Just discovered my Father's Day shade: "${shade.name}" from Woodin! 🎨\n\nFind your shade at: ${window.location.href}\n\n#ShadesOfADad #Woodin #FathersDay`;
    try {
      await navigator.clipboard.writeText(message);
      alert("Caption copied! Open Instagram and paste it in your story or post.");
    } catch {
      alert("Copy failed. Please try again.");
    }
  }

  function handleViewPrints() {
    // Save result state to localStorage before navigating
    if (result) {
      localStorage.setItem("shadeResult", JSON.stringify(result));
    }
    navigate("/prints");
  }

  return (
    <motion.div
      className="flex flex-col items-center min-h-full px-4 sm:px-5 py-6 sm:py-8 gap-4 sm:gap-6 max-w-lg mx-auto w-full overflow-y-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-1 text-center">
        <WoodinLogo size={44} />
        <p
          className="tracking-[0.3em] text-[#C9893A] uppercase mt-1"
          style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.65rem" }}
        >
          His Shade Has Been Revealed
        </p>
      </div>

      {/* Main shade card */}
      <motion.div
        className="w-full rounded-3xl overflow-hidden relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200 }}
        style={{
          background: `linear-gradient(135deg, ${shade.color}e6, ${shade.colorSecondary}e6)`,
          border: `1px solid ${shade.color}60`,
          boxShadow: `0 20px 60px ${shade.color}50`,
        }}
      >
        {/* Color band at top */}
        <div
          className="w-full h-1.5"
          style={{ background: `linear-gradient(90deg, ${shade.color}, ${shade.colorSecondary})` }}
        />

        <div className="p-4 sm:p-6 flex flex-col items-center gap-3 sm:gap-5">
          {/* Shade circle with percentage */}
          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 140,
                height: 140,
                background: `radial-gradient(circle, ${shade.colorSecondary}60, ${shade.color}40)`,
                filter: "blur(20px)",
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div
              className="relative rounded-full flex flex-col items-center justify-center"
              style={{
                width: 120,
                height: 120,
                background: `linear-gradient(135deg, ${shade.color}, ${shade.colorSecondary})`,
                boxShadow: `0 8px 32px ${shade.color}60`,
              }}
            >
              <span
                className="text-[#1C0A00]"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, lineHeight: 1 }}
              >
                {percentage}%
              </span>
              <span
                className="text-[#1C0A00]/70"
                style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em" }}
              >
                MATCH
              </span>
            </div>
          </div>

          {/* Shade name */}
          <div className="text-center">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
                fontWeight: 700,
                color: getTextColorForShade(shade.id).text,
                lineHeight: 1.15,
              }}
            >
              {shade.name}
            </h2>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                color: getTextColorForShade(shade.id).tagline === "currentColor" ? shade.color : getTextColorForShade(shade.id).tagline,
                fontSize: "0.95rem",
              }}
            >
              — {shade.tagline} —
            </p>
          </div>

          {/* Divider */}
          <div className="w-20 h-px" style={{ background: `${shade.color}50` }} />

          {/* Description */}
          <p
            className="text-center"
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "0.9rem",
              lineHeight: 1.75,
              color: getTextColorForShade(shade.id).description,
            }}
          >
            {shade.description}
          </p>

          {/* Traits */}
          <div className="flex flex-wrap gap-2 justify-center">
            {shade.traits.map((trait) => (
              <span
                key={trait}
                className="px-3 py-1.5 rounded-full text-xs"
                style={{
                  background: "rgba(255, 255, 255, 0.25)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  color: "#F5E6D0",
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  backdropFilter: "blur(4px)",
                }}
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom color band */}
        <div
          className="w-full h-1"
          style={{ background: `linear-gradient(90deg, ${shade.colorSecondary}, ${shade.color})` }}
        />
      </motion.div>

      {/* Happy Father's Day text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          color: "#B8965A",
          fontSize: "0.9rem",
        }}
      >
        Happy Father's Day from Woodin ✦
      </motion.p>

      {/* Action buttons */}
      <motion.div
        className="w-full flex flex-col gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {/* View Woodin Prints */}
        <motion.button
          onClick={handleViewPrints}
          className="relative w-full rounded-full py-4 px-8 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${shade.color}, ${shade.colorSecondary})`,
            color: "#1C0A00",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: "0.95rem",
            letterSpacing: "0.03em",
            boxShadow: `0 8px 32px ${shade.color}50`,
            border: "none",
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.02, boxShadow: `0 12px 40px ${shade.color}60` }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)" }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative">🪡 View Woodin Prints</span>
        </motion.button>

        {/* Download Card */}
        <motion.button
          onClick={handleDownloadCard}
          className="w-full rounded-full py-4 px-8"
          style={{
            background: "transparent",
            border: `1.5px solid ${shade.color}60`,
            color: "#F5E6D0",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: "0.95rem",
            letterSpacing: "0.03em",
            cursor: "pointer",
          }}
          whileHover={{
            background: `${shade.color}15`,
            borderColor: shade.color,
            scale: 1.02,
          }}
          whileTap={{ scale: 0.97 }}
        >
          ⬇ Download Woodin Card
        </motion.button>

        {/* Try Again */}
        <button
          onClick={onReset}
          className="w-full py-2 text-center text-sm transition-colors duration-200"
          style={{
            color: "#6B4A2A",
            fontFamily: "'Nunito', sans-serif",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C9893A")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6B4A2A")}
        >
          ↩ Try a different description
        </button>
      </motion.div>

      {/* Card Preview Modal */}
      <AnimatePresence>
        {showCardModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
            onClick={() => setShowCardModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl overflow-hidden w-full max-w-sm bg-black"
              style={{ border: `1px solid ${shade.color}40` }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowCardModal(false)}
                className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                style={{
                  background: "rgba(28,10,0,0.8)",
                  border: `1px solid ${shade.color}40`,
                  color: "#C9893A",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = `${shade.color}30`)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(28,10,0,0.8)")}
              >
                ✕
              </button>

              {/* Card Image Preview */}
              <div className="overflow-y-auto max-h-[65vh] flex items-center justify-center p-4 bg-black">
                <img
                  src={shadeCardMap[shade.id] || ""}
                  alt={`${shade.name} card design`}
                  loading="eager"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: "0.75rem",
                    border: `2px solid ${shade.color}40`,
                    maxWidth: "100%",
                  }}
                  onError={(e) => {
                    console.error("Card image failed to load:", shade.id, shadeCardMap[shade.id]);
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="flex flex-col gap-2 p-4"
                style={{ borderTop: `1px solid ${shade.color}25` }}
              >
                {/* Download Button */}
                <motion.button
                  onClick={handleDownloadCardFile}
                  className="w-full rounded-full py-3 px-4 font-bold flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${shade.color}, ${shade.colorSecondary})`,
                    color: "#1C0A00",
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    border: "none",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  ⬇ Download Card
                </motion.button>

                {/* Share Section */}
                <div className="flex gap-2">
                  {/* WhatsApp */}
                  <motion.button
                    onClick={handleShareWhatsApp}
                    className="flex-1 rounded-full py-2.5 px-3 font-bold flex items-center justify-center gap-1 transition-all"
                    style={{
                      background: "#25D366",
                      color: "#fff",
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      border: "none",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>💬</span> WhatsApp
                  </motion.button>

                  {/* Facebook */}
                  <motion.button
                    onClick={handleShareFacebook}
                    className="flex-1 rounded-full py-2.5 px-3 font-bold flex items-center justify-center gap-1 transition-all"
                    style={{
                      background: "#1877F2",
                      color: "#fff",
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      border: "none",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>f</span> Facebook
                  </motion.button>

                  {/* Instagram */}
                  <motion.button
                    onClick={handleShareInstagram}
                    className="flex-1 rounded-full py-2.5 px-3 font-bold flex items-center justify-center gap-1 transition-all"
                    style={{
                      background: "linear-gradient(135deg, #fd5949, #d6249f, #285AEB)",
                      color: "#fff",
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      border: "none",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>📸</span> Instagram
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

export default function App() {
  const [stage, setStage] = useState<Stage>("splash");
  const [result, setResult] = useState<{ shade: WoodinShade; percentage: number } | null>(null);

  useEffect(() => {
    if (stage === "splash") {
      const timer = setTimeout(() => setStage("input"), 3500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Restore result state from localStorage if user navigates back from prints page
  useEffect(() => {
    const savedResult = localStorage.getItem("shadeResult");
    if (savedResult && !result) {
      try {
        const parsed = JSON.parse(savedResult);
        setResult(parsed);
        setStage("result");
      } catch (error) {
        console.error("Failed to restore result state:", error);
      }
    }
  }, []);

  function handleReveal(text: string) {
    setStage("revealing");
    setTimeout(() => {
      const matched = matchShade(text);
      setResult(matched);
      setStage("result");
    }, 2200);
  }

  function handleReset() {
    setResult(null);
    setStage("input");
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: "#1C0A00",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <AfricanPatternBg />

      {/* Scrollable content area */}
      <div className="relative z-10 w-full h-full flex items-center justify-center overflow-y-auto">
        <AnimatePresence mode="wait">
          {stage === "splash" && <SplashScreen key="splash" />}
          {stage === "input" && <InputScreen key="input" onReveal={handleReveal} />}
          {stage === "revealing" && <RevealingScreen key="revealing" />}
          {stage === "result" && result && (
            <ResultScreen
              key="result"
              shade={result.shade}
              percentage={result.percentage}
              onReset={handleReset}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
