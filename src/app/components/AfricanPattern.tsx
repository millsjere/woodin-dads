export function AfricanPatternBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,137,58,0.08) 0%, transparent 70%)",
        }}
      />
      {/* SVG pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="kente" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            {/* Horizontal bars */}
            <rect x="0" y="0" width="60" height="6" fill="#C9893A" />
            <rect x="0" y="12" width="60" height="3" fill="#E05A2B" />
            <rect x="0" y="27" width="60" height="6" fill="#C9893A" />
            <rect x="0" y="39" width="60" height="3" fill="#E05A2B" />
            <rect x="0" y="54" width="60" height="6" fill="#C9893A" />
            {/* Vertical bars */}
            <rect x="0" y="0" width="6" height="60" fill="#F5C842" fillOpacity="0.5" />
            <rect x="18" y="0" width="3" height="60" fill="#E05A2B" fillOpacity="0.5" />
            <rect x="30" y="0" width="6" height="60" fill="#C9893A" fillOpacity="0.5" />
            <rect x="48" y="0" width="3" height="60" fill="#E05A2B" fillOpacity="0.5" />
            {/* Diamonds */}
            <path d="M30 0 L36 6 L30 12 L24 6 Z" fill="#F5C842" />
            <path d="M30 30 L36 36 L30 42 L24 36 Z" fill="#E05A2B" />
            <path d="M0 30 L6 24 L12 30 L6 36 Z" fill="#F5C842" />
            <path d="M48 30 L54 24 L60 30 L54 36 Z" fill="#F5C842" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#kente)" />
      </svg>
      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: "linear-gradient(to top, #1C0A00, transparent)",
        }}
      />
    </div>
  );
}
