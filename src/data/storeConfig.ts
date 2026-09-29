export interface StoreConfig {
  storeName: string;
  storeShortName: string;
  slogan: string;
  tagline: string;
  currency: string;
  currencySymbol: string;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number;
  contact: {
    phone: string;
    phoneFormatted: string;
    whatsappNumber: string; // international digits without +
    whatsappDisplay: string;
    whatsappDefaultMessage: string;
    email: string;
    instagramHandle: string;
    instagramUrl: string;
    location: string;
    city: string;
    openingHours: string;
  };
  aboutStory: {
    headline: string;
    paragraphs: string[];
    coreValues: { title: string; desc: string }[];
  };
}

export const STORE_CONFIG: StoreConfig = {
  storeName: "VORTEX FOOTBALL",
  storeShortName: "VTX FC",
  slogan: "WEAR THE GAME.",
  tagline: "Premium football jerseys and pants built for fans who live for football.",
  currency: "PKR",
  currencySymbol: "Rs.",
  freeDeliveryThreshold: 5000,
  standardDeliveryFee: 250,
  contact: {
    phone: "+92 300 8472910",
    phoneFormatted: "+92 (300) 847-2910",
    whatsappNumber: "923008472910",
    whatsappDisplay: "+92 300 8472910",
    whatsappDefaultMessage: "Hello Vortex Football, I am inquiring about product availability and ordering.",
    email: "support@vortexfootball.com",
    instagramHandle: "@vortexfootball.pk",
    instagramUrl: "https://instagram.com",
    location: "Commercial Phase 5, DHA, Lahore, Pakistan",
    city: "Lahore, Pakistan",
    openingHours: "Mon – Sat: 11:00 AM – 10:00 PM PKT"
  },
  aboutStory: {
    headline: "Engineered For The Pitch. Styled For The Street.",
    paragraphs: [
      "We're passionate about football and believe every player and fan deserves quality gear that looks great and feels comfortable.",
      "Founded by dedicated football players in Pakistan, Vortex Football was born from a frustration with cheap counterfeit kits that degrade after two washes. We source high-grade moisture-wicking technical fabrics, reinforced heat-sealed seams, and ergonomic athletic silhouettes designed to withstand intense match play while turning heads off the pitch."
    ],
    coreValues: [
      {
        title: "Pro-Grade Performance",
        desc: "AeroKnit breathable micro-mesh that wicks perspiration instantly."
      },
      {
        title: "Tailored Modern Cuts",
        desc: "Ergonomic slim taper engineered for football sprints and striking motion."
      },
      {
        title: "Nationwide Cash on Delivery",
        desc: "Fast, reliable delivery to Lahore, Karachi, Islamabad, and all cities across Pakistan."
      }
    ]
  }
};

/**
 * Format price in Pakistani Rupees with tabular comma separators
 */
export function formatPrice(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}
