export interface WoodinShade {
  id: string;
  name: string;
  tagline: string;
  color: string;
  colorSecondary: string;
  colorName: string;
  description: string;
  traits: string[];
  printKeywords: string[];
  keywords: string[];
}

export const WOODIN_SHADES: WoodinShade[] = [
  {
    id: "azure-anchor",
    name: "Azure Anchor",
    tagline: "The Wise One",
    color: "#1E5A7A",
    colorSecondary: "#4A8FC4",
    colorName: "Deep Azure",
    description:
      "Calm, steady, and profoundly wise — your dad is the Azure Anchor. He is the eye of the storm, grounded in trust and wisdom. His quiet strength guides everyone around him with steady counsel and unwavering stability.",
    traits: ["Wise", "Calm", "Stable", "Trustworthy"],
    printKeywords: ["azure", "blue", "calm", "geometric"],
    keywords: [
      "calm", "wise", "patient", "thoughtful", "peaceful", "trust", "stability", "anchor",
      "quiet", "intellectual", "read", "learn", "mentor", "guidance", "reflective",
      "spiritual", "wisdom", "understanding", "listen", "meditate",
    ],
  },
  {
    id: "terra-firma",
    name: "Terra Firma",
    tagline: "The Grounded One",
    color: "#6B4226",
    colorSecondary: "#8B6F47",
    colorName: "Rich Earth",
    description:
      "Rooted, reliable, and ever-enduring — your dad is Terra Firma. He is the foundation everything stands on, built from hard work and nature's wisdom. His strength comes from being grounded in values and commitment.",
    traits: ["Grounded", "Hardworking", "Dependable", "Natural"],
    printKeywords: ["earth", "brown", "organic", "natural"],
    keywords: [
      "reliable", "steady", "humble", "hard working", "grounded", "nature", "garden",
      "hands on", "traditional", "consistent", "dependable", "strong", "simple",
      "roots", "foundation", "farmer", "earth", "authentic", "genuine",
    ],
  },
  {
    id: "golden-glow",
    name: "Golden Glow",
    tagline: "The Joy Bringer",
    color: "#D4A017",
    colorSecondary: "#F5D547",
    colorName: "Warm Gold",
    description:
      "Radiant, optimistic, and full of warmth — your dad is the Golden Glow. He lights up every room with his infectious energy and infectious joy. His vision inspires others, and his warmth brings people together.",
    traits: ["Joyful", "Optimistic", "Inspiring", "Energetic"],
    printKeywords: ["gold", "yellow", "vibrant", "festive"],
    keywords: [
      "joy", "happy", "fun", "laugh", "joke", "energetic", "optimistic", "warm",
      "leader", "visionary", "inspire", "bright", "celebrate", "enthusiastic",
      "adventure", "active", "social", "friendly", "dance", "sing",
    ],
  },
  {
    id: "crimson-core",
    name: "Crimson Core",
    tagline: "The Protector",
    color: "#8B2E26",
    colorSecondary: "#C94C3D",
    colorName: "Deep Crimson",
    description:
      "Fierce, passionate, and deeply devoted — your dad is the Crimson Core. He fights for what he loves with a strength that burns bright. His passion knows no bounds, and his courage is unmistakable.",
    traits: ["Passionate", "Protective", "Courageous", "Devoted"],
    printKeywords: ["crimson", "red", "bold", "tribal"],
    keywords: [
      "passionate", "strong", "fierce", "protect", "brave", "courageous", "fight",
      "loyal", "devoted", "love", "affectionate", "emotional", "sensitive", "express",
      "powerful", "resilient", "warrior", "determined", "unwavering",
    ],
  },
  {
    id: "monochrome-mystery",
    name: "Monochrome Mystery",
    tagline: "The Distinguished",
    color: "#2A2A2A",
    colorSecondary: "#5C5C5C",
    colorName: "Sophisticated Grey",
    description:
      "Sophisticated, balanced, and intriguingly mysterious — your dad is Monochrome Mystery. He carries quiet strength with understated elegance. There is always more to discover, more layers to understand.",
    traits: ["Sophisticated", "Mysterious", "Balanced", "Elegant"],
    printKeywords: ["grey", "black", "monochrome", "sophisticated"],
    keywords: [
      "sophisticated", "elegant", "classy", "refined", "educated", "accomplished",
      "mysterious", "quiet", "thoughtful", "professional", "formal", "polished",
      "distinguished", "well dressed", "style", "dignified", "respectable", "balanced",
    ],
  },
];

export function matchShade(description: string): { shade: WoodinShade; percentage: number } {
  const text = description.toLowerCase();
  const scores: { shade: WoodinShade; score: number }[] = WOODIN_SHADES.map((shade) => {
    let score = 0;
    for (const keyword of shade.keywords) {
      if (text.includes(keyword)) {
        score += keyword.split(" ").length > 1 ? 3 : 1;
      }
    }
    return { shade, score };
  });

  scores.sort((a, b) => b.score - a.score);

  const topScore = scores[0].score;
  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);

  // Calculate percentage: minimum 68%, max 97%
  const rawPercentage = totalScore > 0 ? (topScore / totalScore) * 100 : 50;
  const percentage = Math.round(Math.min(97, Math.max(68, rawPercentage * 1.4 + 48)));

  // If no keywords matched, pick based on text length hash
  if (topScore === 0) {
    const idx = description.length % WOODIN_SHADES.length;
    return { shade: WOODIN_SHADES[idx], percentage: 74 };
  }

  return { shade: scores[0].shade, percentage };
}
