import hero from "@/assets/hero-samarkand.jpg";
import vietnam from "@/assets/tour-vietnam.jpg";
import prague from "@/assets/tour-prague.jpg";
import china from "@/assets/tour-china.jpg";
import thailand from "@/assets/tour-thailand.jpg";
import marrakech from "@/assets/dest-marrakech.jpg";
import fes from "@/assets/dest-fes.jpg";
import sahara from "@/assets/dest-sahara.jpg";
import hajj from "@/assets/hajj.jpg";
import cruise from "@/assets/cruise.jpg";

export const IMG = { hero, vietnam, prague, china, thailand, marrakech, fes, sahara, hajj, cruise };

export type Tour = {
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  dates: string;
  price: string;
  image: string;
  region: "Asie" | "Europe" | "Afrique" | "Amériques" | "Moyen-Orient";
  priceNote?: string;
  included?: string[];
  notIncluded?: string[];
  itinerary?: { day: string; place: string }[];
};

export const featuredTours: Tour[] = [
  {
    slug: "maldives-sri-lanka",
    title: "Maldives & Sri Lanka",
    subtitle: "Casa · Malé · Colombo — plages & culture",
    duration: "14 jours",
    dates: "Du 18 au 31 juillet",
    price: "30 800 dh",
    priceNote: "À partir de",
    image: thailand,
    region: "Asie",
    included: [
      "Billets d'avion aller/retour en classe économique (Casa – Malé – Colombo – Casa)",
      "Billets d'avion Malé – Colombo",
      "Transferts aéroports – hôtels",
      "Transfert par autocar de Fès et Rabat vers l'aéroport",
      "Hébergement en hôtel 4★ avec petit déjeuner",
      "6 dîners à Sri Lanka",
      "Visa Sri Lanka",
    ],
  },
  {
    slug: "saint-petersbourg-moscou",
    title: "Saint-Pétersbourg / Moscou",
    subtitle: "Palais impériaux & Place Rouge",
    duration: "9 jours – 8 nuits",
    dates: "Du 2 au 10 août 2026",
    price: "18 500 dh",
    priceNote: "Pour les 10 premiers inscrits · 19 500 dh pour le reste du groupe",
    image: prague,
    region: "Europe",
    included: [
      "Billets d'avion aller/retour en classe économique",
      "Hébergement à Saint-Pétersbourg — 4 nuits, hôtel 4★ (BB)",
      "Hébergement à Moscou — 3 nuits, hôtel 4★ (BB)",
      "Train Saint-Pétersbourg / Moscou",
      "Transferts hôtel / aéroport / hôtel en bus navette",
    ],
    notIncluded: ["Supplément chambre single : 5 000 dh"],
    itinerary: [
      { day: "Jour 1 — 02 août 2026", place: "Casablanca" },
      { day: "Jour 2 — 03 août 2026", place: "Saint-Pétersbourg" },
      { day: "Jours 3-4 — 04-05 août 2026", place: "Saint-Pétersbourg" },
      { day: "Jour 5 — 06 août 2026", place: "Saint-Pétersbourg" },
      { day: "Jour 6 — 07 août 2026", place: "Saint-Pétersbourg → Moscou" },
      { day: "Jours 7-8 — 08-09 août 2026", place: "Moscou" },
      { day: "Jour 9 — 10 août 2026", place: "Moscou → Casablanca" },
    ],
  },
  {
    slug: "istanbul",
    title: "Istanbul",
    subtitle: "Départ Rabat · Hôtel Eyfel 3★",
    duration: "9 jours – 7 nuits",
    dates: "23-31 juil · 9-17 août · 23-31 août 2026",
    price: "8 800 dh",
    priceNote: "Départ Rabat · tarif pour les 10 premiers inscrits (+1 000 dh pour le reste du groupe)",
    image: hero,
    region: "Europe",
    included: [
      "Rabat / Istanbul / Rabat « Air Arabia »",
      "10 kg de bagage à main aller / retour",
      "Transferts aéroport / hôtel / aéroport à Istanbul",
      "Logement en chambre double, 7 nuitées en BB",
      "3 jours d'excursions",
    ],
    notIncluded: [
      "Journée Bosphore en option (20 €)",
      "Les extras personnels",
      "Bagages supplémentaires en option (200 dh / bagage / trajet)",
    ],
  },
];

export const destinationsMaroc = [
  { slug: "marrakech", name: "Marrakech", tagline: "Évasion à Marrakech", image: marrakech,
    desc: "Souks colorés, riads authentiques et soleil marocain. Une aventure unique entre tradition et modernité." },
  { slug: "fes", name: "Fès", tagline: "Escapade à Fès", image: fes,
    desc: "La capitale spirituelle du Maroc. Perdez-vous dans la médina classée à l'UNESCO." },
  { slug: "sahara", name: "Sahara", tagline: "Nuits sous les étoiles", image: sahara,
    desc: "Dunes de Merzouga, bivouacs berbères et couchers de soleil incomparables." },
];
