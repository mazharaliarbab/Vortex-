import { Product } from '../types/store';

import heroJerseyImg from '../assets/images/hero_football_jersey_1790657198942.jpg';
import classicJerseyImg from '../assets/images/product_classic_jersey_1790657214566.jpg';
import proTrainingJerseyImg from '../assets/images/product_pro_training_jersey_1790657229436.jpg';
import performancePantsImg from '../assets/images/product_performance_pants_1790657243667.jpg';
import elitePantsImg from '../assets/images/product_elite_match_pants_1790657258252.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Classic Football Jersey",
    category: "jerseys",
    price: 3499,
    oldPrice: 4299,
    discountPercent: 19,
    rating: 4.9,
    reviewsCount: 128,
    images: [
      classicJerseyImg,
      heroJerseyImg
    ],
    isFeatured: true,
    isNewArrival: false,
    isSale: true,
    description: "The timeless silhouette reimagined with modern aerodynamic knit fabric. Designed with signature charcoal vertical micro-ribbing and electric lime sleeve detailing, this jersey delivers supreme moisture dispersal on pitch and crisp streetwear presence off pitch.",
    features: [
      "Ultra-breathable AeroKnit dry-fit technology",
      "Reinforced rib-knit crew collar that maintains form",
      "Zero-chafing flatlock seam construction",
      "Tailored athletic silhouette for maximum mobility"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 24,
    sku: "VTX-JRS-001",
    fit: "Athletic Regular Fit",
    material: "100% Recycled HydroWick Polyester",
    colorway: "Onyx Black / Volt Green"
  },
  {
    id: "prod-2",
    name: "Pro Match Jersey",
    category: "jerseys",
    price: 4499,
    oldPrice: 5299,
    discountPercent: 15,
    rating: 5.0,
    reviewsCount: 94,
    images: [
      heroJerseyImg,
      proTrainingJerseyImg
    ],
    isFeatured: true,
    isNewArrival: true,
    isSale: false,
    description: "Built strictly to professional matchday specifications. Cut from lightweight micro-perforated airflow fabric with heat-sealed taped hems that shed weight and reduce wind resistance during high-speed transitions.",
    features: [
      "Pro player-issue aerodynamic contour cut",
      "Targeted laser-cut underarm ventilation zones",
      "Bonded silicone textured chest badge",
      "Rapid moisture evaporation in hot & humid climates"
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 18,
    sku: "VTX-JRS-002",
    fit: "Pro Slim Match Fit",
    material: "92% AeroSpeed Poly / 8% Spandex",
    colorway: "Carbon Graphite / Solar Lime"
  },
  {
    id: "prod-3",
    name: "Premium Training Jersey",
    category: "jerseys",
    price: 3799,
    oldPrice: 4499,
    discountPercent: 16,
    rating: 4.8,
    reviewsCount: 76,
    images: [
      proTrainingJerseyImg,
      classicJerseyImg
    ],
    isFeatured: true,
    isNewArrival: true,
    isSale: false,
    description: "Engineered for relentless daily training sessions and gym drills. Features 4-way stretch fabric that resists snagging and sliding tackles, combined with anti-odor silver ion thread treatment.",
    features: [
      "Anti-friction 4-way stretch technical knit",
      "Reflective rear collar detail for evening training",
      "Subtle geometric jacquard pattern across chest",
      "Quick-dry fabric dries in under 20 minutes post-wash"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 35,
    sku: "VTX-JRS-003",
    fit: "Athletic Training Cut",
    material: "90% Micro-Poly / 10% Elastane",
    colorway: "Dark Slate / Pitch Neon"
  },
  {
    id: "prod-4",
    name: "Performance Football Pants",
    category: "pants",
    price: 3999,
    oldPrice: 4899,
    discountPercent: 18,
    rating: 4.9,
    reviewsCount: 142,
    images: [
      performancePantsImg,
      elitePantsImg
    ],
    isFeatured: true,
    isNewArrival: false,
    isSale: true,
    description: "The gold standard in football training trousers. Features an ergonomic tapered leg with ankle zips for rapid on/off changes over football boots, plus secure zippered pocket storage for keys and smartphone.",
    features: [
      "Heavy-duty zipped ankle gussets for boots clearance",
      "Dual deep zippered side pockets with neon pullers",
      "Ergonomically articulated knees for explosive acceleration",
      "Wide comfortable elastic waistband with internal drawcord"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 40,
    sku: "VTX-PNT-001",
    fit: "Ergonomic Tapered Football Cut",
    material: "88% Dri-Tech Poly / 12% Spandex",
    colorway: "Matte Black / Electric Lime Accents"
  },
  {
    id: "prod-5",
    name: "Elite Training Pants",
    category: "pants",
    price: 4699,
    oldPrice: 5499,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 88,
    images: [
      elitePantsImg,
      performancePantsImg
    ],
    isFeatured: true,
    isNewArrival: true,
    isSale: false,
    description: "Designed for elite academy athletes and cold-weather match preparation. Combines wind-blocking weather-resistant front panels with breathable back-calf micro-mesh for balanced thermal regulation.",
    features: [
      "Weather-resistant dual-layer woven fabric front",
      "Micro-mesh heat dump panels on posterior knees",
      "Reinforced slide-resistant hip and thigh paneling",
      "Reflective 3M sprint stripes on lower calf"
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 22,
    sku: "VTX-PNT-002",
    fit: "Pro Precision Taper",
    material: "91% Recycled StormWeave / 9% Elastane",
    colorway: "Charcoal Heather / Stealth Black"
  },
  {
    id: "prod-6",
    name: "Matchday Pants",
    category: "pants",
    price: 4299,
    oldPrice: 4999,
    discountPercent: 14,
    rating: 4.7,
    reviewsCount: 65,
    images: [
      performancePantsImg,
      elitePantsImg
    ],
    isFeatured: false,
    isNewArrival: true,
    isSale: true,
    description: "Sleek travel and matchday arrival pants worn by squad players on route to stadium fixtures. Combines casual sportswear elegance with authentic football pedigree and ultra-soft brushed interior.",
    features: [
      "Luxurious soft-touch brushed fleece interior lining",
      "Subtle tonal matte football hardware and drawcord tips",
      "Tailored ankle cuffs with low-profile hidden zipper",
      "Concealed passport/phone security pocket"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 28,
    sku: "VTX-PNT-003",
    fit: "Slim Modern Jogger Cut",
    material: "85% Cotton-Touch Poly / 15% Stretch Fibre",
    colorway: "Deep Pitch Black"
  },
  {
    id: "prod-7",
    name: "Vortex AeroSpeed Match Jersey",
    category: "jerseys",
    price: 4799,
    oldPrice: 5699,
    discountPercent: 16,
    rating: 5.0,
    reviewsCount: 47,
    images: [
      heroJerseyImg,
      classicJerseyImg
    ],
    isFeatured: false,
    isNewArrival: true,
    isSale: false,
    description: "Our flagship hyper-light match kit. Engineered with hexagonal air-channeling weave and zero-gravity seams to provide friction-free performance across 90+ minutes of high-intensity play.",
    features: [
      "Featherlight 125gsm aerodynamic jacquard fabric",
      "Ribbed V-neck with stretch comfort insert",
      "Anti-cling sweat management technology",
      "Heat-transferred high-density rubberized crest"
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 15,
    sku: "VTX-JRS-004",
    fit: "Ultra-Light Match Fit",
    material: "95% AeroHex Poly / 5% Elastane",
    colorway: "Blackout / Ghost Neon"
  },
  {
    id: "prod-8",
    name: "Squad Strike Football Trousers",
    category: "pants",
    price: 3699,
    oldPrice: 4399,
    discountPercent: 16,
    rating: 4.8,
    reviewsCount: 52,
    images: [
      elitePantsImg,
      performancePantsImg
    ],
    isFeatured: false,
    isNewArrival: false,
    isSale: true,
    description: "Workhorse football pants engineered for high volume training sessions, five-a-side evening leagues, and pre-match warmups. Flexible, tough, and fast-drying.",
    features: [
      "Abrasion-resistant outer knit structure",
      "Zipped ankle expansion gusset",
      "Moisture-dispersing interior waistband",
      "Deep secure side storage"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 31,
    sku: "VTX-PNT-004",
    fit: "Athletic Strike Taper",
    material: "90% Performance Poly / 10% Spandex",
    colorway: "Anthracite Gray / Lime Accent"
  }
];
