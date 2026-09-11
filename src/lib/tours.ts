import type { Localized, LocalizedList } from "@/i18n";
import hero from "@/assets/hero-samarkand.jpg";
import vietnam from "@/assets/tour-vietnam.jpg";
import prague from "@/assets/tour-prague.jpg";
import china from "@/assets/tour-china.jpg";
import thailand from "@/assets/tour-thailand.jpg";
import maldives from "@/assets/tour-maldives.jpg";
import marrakech from "@/assets/dest-marrakech.jpg";
import fes from "@/assets/dest-fes.jpg";
import sahara from "@/assets/dest-sahara.jpg";
import hajj from "@/assets/hajj.jpg";
import cruise from "@/assets/cruise.jpg";

export const IMG = { hero, vietnam, prague, china, thailand, maldives, marrakech, fes, sahara, hajj, cruise };

/**
 * Regions are stored as stable keys, not display text.
 *
 * The filter on /voyages compares them, and comparing against translated text
 * breaks the moment the visitor switches language. The key stays put; the
 * dictionary decides how it reads.
 */
export const REGIONS = [
  "Asie",
  "Europe",
  "Afrique",
  "Ameriques",
  "MoyenOrient",
] as const;

export type Region = (typeof REGIONS)[number];

/** Prices, images and slugs are written once — only what a visitor reads is tripled. */
export type Tour = {
  slug: string;
  title: Localized;
  subtitle: Localized;
  duration: Localized;
  dates: Localized;
  price: string;
  image: string;
  region: Region;
  priceNote?: Localized;
  /** Extra photos of this trip, shown as a gallery under the itinerary.
      `image` stays the cover; these are additional. Empty = no section. */
  gallery?: string[];
  included?: LocalizedList;
  notIncluded?: LocalizedList;
  itinerary?: { day: Localized; place: Localized }[];
};

export const featuredTours: Tour[] = [
  {
    slug: "maldives-sri-lanka",
    title: {
      fr: "Maldives & Sri Lanka",
      en: "Maldives & Sri Lanka",
      ar: "جزر المالديف وسريلانكا",
    },
    subtitle: {
      fr: "Casa · Malé · Colombo — plages & culture",
      en: "Casablanca · Malé · Colombo — beaches & culture",
      ar: "الدار البيضاء · ماليه · كولومبو — شواطئ وثقافة",
    },
    duration: { fr: "14 jours", en: "14 days", ar: "14 يوماً" },
    dates: {
      fr: "Du 18 au 31 juillet",
      en: "18 to 31 July",
      ar: "من 18 إلى 31 يوليوز",
    },
    price: "30 800 dh",
    priceNote: { fr: "À partir de", en: "From", ar: "ابتداءً من" },
    image: maldives,
    /* Photos: Unsplash (free for commercial use).
       cover + 1 Rayyu Maldives · 2 Hushaan (fromtinyisles) · 3 Dylan Shaw
       · 4 Chathura Anuradha Subasinghe · 5 Rowan Heuvel */
    gallery: [
      "/programmes/maldives-sri-lanka/1.jpg", // coucher de soleil, dhoni aux Maldives
      "/programmes/maldives-sri-lanka/2.jpg", // rocher de Sigiriya
      "/programmes/maldives-sri-lanka/3.jpg", // Kandy, temple de la Dent
      "/programmes/maldives-sri-lanka/4.jpg", // plantation de thé, Nuwara Eliya
    ],
    region: "Asie",
    included: {
      fr: [
        "Billets d'avion aller/retour en classe économique (Casa – Malé – Colombo – Casa)",
        "Billets d'avion Malé – Colombo",
        "Transferts aéroports – hôtels",
        "Transfert par autocar de Fès et Rabat vers l'aéroport",
        "Hébergement en hôtel 4★ avec petit déjeuner",
        "6 dîners à Sri Lanka",
        "Visa Sri Lanka",
      ],
      en: [
        "Return economy flights (Casablanca – Malé – Colombo – Casablanca)",
        "Malé – Colombo flights",
        "Airport – hotel transfers",
        "Coach transfer from Fes and Rabat to the airport",
        "4★ hotel accommodation with breakfast",
        "6 dinners in Sri Lanka",
        "Sri Lanka visa",
      ],
      ar: [
        "تذاكر الطيران ذهاباً وإياباً بالدرجة السياحية (الدار البيضاء – ماليه – كولومبو – الدار البيضاء)",
        "تذاكر الطيران ماليه – كولومبو",
        "التنقلات من وإلى المطارات والفنادق",
        "النقل بالحافلة من فاس والرباط إلى المطار",
        "الإقامة في فندق 4 نجوم مع وجبة الفطور",
        "6 وجبات عشاء في سريلانكا",
        "تأشيرة سريلانكا",
      ],
    },
  },
  {
    slug: "saint-petersbourg-moscou",
    title: {
      fr: "Saint-Pétersbourg / Moscou",
      en: "Saint Petersburg / Moscow",
      ar: "سان بطرسبرغ / موسكو",
    },
    subtitle: {
      fr: "Palais impériaux & Place Rouge",
      en: "Imperial palaces & Red Square",
      ar: "القصور الإمبراطورية والساحة الحمراء",
    },
    duration: {
      fr: "9 jours – 8 nuits",
      en: "9 days – 8 nights",
      ar: "9 أيام – 8 ليالٍ",
    },
    dates: {
      fr: "Du 2 au 10 août 2026",
      en: "2 to 10 August 2026",
      ar: "من 2 إلى 10 غشت 2026",
    },
    price: "18 500 dh",
    priceNote: {
      fr: "Pour les 10 premiers inscrits · 19 500 dh pour le reste du groupe",
      en: "For the first 10 to book · 19 500 dh for the rest of the group",
      ar: "لأول 10 مسجلين · 19 500 درهم لباقي المجموعة",
    },
    image: prague,
    region: "Europe",
    included: {
      fr: [
        "Billets d'avion aller/retour en classe économique",
        "Hébergement à Saint-Pétersbourg — 4 nuits, hôtel 4★ (BB)",
        "Hébergement à Moscou — 3 nuits, hôtel 4★ (BB)",
        "Train Saint-Pétersbourg / Moscou",
        "Transferts hôtel / aéroport / hôtel en bus navette",
      ],
      en: [
        "Return economy flights",
        "Saint Petersburg — 4 nights, 4★ hotel (B&B)",
        "Moscow — 3 nights, 4★ hotel (B&B)",
        "Saint Petersburg / Moscow train",
        "Hotel / airport / hotel shuttle transfers",
      ],
      ar: [
        "تذاكر الطيران ذهاباً وإياباً بالدرجة السياحية",
        "الإقامة في سان بطرسبرغ — 4 ليالٍ، فندق 4 نجوم مع الفطور",
        "الإقامة في موسكو — 3 ليالٍ، فندق 4 نجوم مع الفطور",
        "قطار سان بطرسبرغ / موسكو",
        "التنقلات فندق / مطار / فندق بحافلة مكوكية",
      ],
    },
    notIncluded: {
      fr: ["Supplément chambre single : 5 000 dh"],
      en: ["Single room supplement: 5 000 dh"],
      ar: ["الزيادة على الغرفة الفردية : 5 000 درهم"],
    },
    itinerary: [
      {
        day: {
          fr: "Jour 1 — 02 août 2026",
          en: "Day 1 — 2 August 2026",
          ar: "اليوم 1 — 2 غشت 2026",
        },
        place: { fr: "Casablanca", en: "Casablanca", ar: "الدار البيضاء" },
      },
      {
        day: {
          fr: "Jour 2 — 03 août 2026",
          en: "Day 2 — 3 August 2026",
          ar: "اليوم 2 — 3 غشت 2026",
        },
        place: {
          fr: "Saint-Pétersbourg",
          en: "Saint Petersburg",
          ar: "سان بطرسبرغ",
        },
      },
      {
        day: {
          fr: "Jours 3-4 — 04-05 août 2026",
          en: "Days 3-4 — 4-5 August 2026",
          ar: "اليومان 3-4 — 4-5 غشت 2026",
        },
        place: {
          fr: "Saint-Pétersbourg",
          en: "Saint Petersburg",
          ar: "سان بطرسبرغ",
        },
      },
      {
        day: {
          fr: "Jour 5 — 06 août 2026",
          en: "Day 5 — 6 August 2026",
          ar: "اليوم 5 — 6 غشت 2026",
        },
        place: {
          fr: "Saint-Pétersbourg",
          en: "Saint Petersburg",
          ar: "سان بطرسبرغ",
        },
      },
      {
        day: {
          fr: "Jour 6 — 07 août 2026",
          en: "Day 6 — 7 August 2026",
          ar: "اليوم 6 — 7 غشت 2026",
        },
        place: {
          fr: "Saint-Pétersbourg → Moscou",
          en: "Saint Petersburg → Moscow",
          ar: "سان بطرسبرغ ← موسكو",
        },
      },
      {
        day: {
          fr: "Jours 7-8 — 08-09 août 2026",
          en: "Days 7-8 — 8-9 August 2026",
          ar: "اليومان 7-8 — 8-9 غشت 2026",
        },
        place: { fr: "Moscou", en: "Moscow", ar: "موسكو" },
      },
      {
        day: {
          fr: "Jour 9 — 10 août 2026",
          en: "Day 9 — 10 August 2026",
          ar: "اليوم 9 — 10 غشت 2026",
        },
        place: {
          fr: "Moscou → Casablanca",
          en: "Moscow → Casablanca",
          ar: "موسكو ← الدار البيضاء",
        },
      },
    ],
  },
  {
    slug: "istanbul",
    title: { fr: "Istanbul", en: "Istanbul", ar: "إسطنبول" },
    subtitle: {
      fr: "Départ Rabat · Hôtel Eyfel 3★",
      en: "Departing Rabat · Hotel Eyfel 3★",
      ar: "انطلاقاً من الرباط · فندق إيفل 3 نجوم",
    },
    duration: {
      fr: "9 jours – 7 nuits",
      en: "9 days – 7 nights",
      ar: "9 أيام – 7 ليالٍ",
    },
    dates: {
      fr: "23-31 juil · 9-17 août · 23-31 août 2026",
      en: "23-31 Jul · 9-17 Aug · 23-31 Aug 2026",
      ar: "23-31 يوليوز · 9-17 غشت · 23-31 غشت 2026",
    },
    price: "8 800 dh",
    priceNote: {
      fr: "Départ Rabat · tarif pour les 10 premiers inscrits (+1 000 dh pour le reste du groupe)",
      en: "Departing Rabat · price for the first 10 to book (+1 000 dh for the rest of the group)",
      ar: "انطلاقاً من الرباط · الثمن لأول 10 مسجلين (+1 000 درهم لباقي المجموعة)",
    },
    image: hero,
    region: "Europe",
    included: {
      fr: [
        "Rabat / Istanbul / Rabat « Air Arabia »",
        "10 kg de bagage à main aller / retour",
        "Transferts aéroport / hôtel / aéroport à Istanbul",
        "Logement en chambre double, 7 nuitées en BB",
        "3 jours d'excursions",
      ],
      en: [
        "Rabat / Istanbul / Rabat with Air Arabia",
        "10 kg cabin baggage each way",
        "Airport / hotel / airport transfers in Istanbul",
        "Double room, 7 nights bed & breakfast",
        "3 days of excursions",
      ],
      ar: [
        "الرباط / إسطنبول / الرباط عبر « العربية للطيران »",
        "10 كلغ من الأمتعة اليدوية ذهاباً وإياباً",
        "التنقلات مطار / فندق / مطار بإسطنبول",
        "الإقامة في غرفة ثنائية، 7 ليالٍ مع الفطور",
        "3 أيام من الرحلات السياحية",
      ],
    },
    notIncluded: {
      fr: [
        "Journée Bosphore en option (20 €)",
        "Les extras personnels",
        "Bagages supplémentaires en option (200 dh / bagage / trajet)",
      ],
      en: [
        "Optional Bosphorus day trip (20 €)",
        "Personal extras",
        "Optional extra baggage (200 dh per bag, each way)",
      ],
      ar: [
        "جولة البوسفور اختيارية (20 أورو)",
        "المصاريف الشخصية",
        "الأمتعة الإضافية اختيارية (200 درهم للحقيبة في كل اتجاه)",
      ],
    },
  },
];

export type Destination = {
  slug: string;
  name: Localized;
  tagline: Localized;
  image: string;
  desc: Localized;
};

export const destinationsMaroc: Destination[] = [
  {
    slug: "marrakech",
    name: { fr: "Marrakech", en: "Marrakech", ar: "مراكش" },
    tagline: {
      fr: "Évasion à Marrakech",
      en: "Escape to Marrakech",
      ar: "عطلة في مراكش",
    },
    image: marrakech,
    desc: {
      fr: "Souks colorés, riads authentiques et soleil marocain. Une aventure unique entre tradition et modernité.",
      en: "Colourful souks, authentic riads and Moroccan sun. A journey between tradition and modern life.",
      ar: "أسواق ملونة، ورياضات أصيلة، وشمس مغربية. تجربة فريدة بين الأصالة والحداثة.",
    },
  },
  {
    slug: "fes",
    name: { fr: "Fès", en: "Fes", ar: "فاس" },
    tagline: { fr: "Escapade à Fès", en: "A break in Fes", ar: "جولة في فاس" },
    image: fes,
    desc: {
      fr: "La capitale spirituelle du Maroc. Perdez-vous dans la médina classée à l'UNESCO.",
      en: "Morocco's spiritual capital. Lose yourself in the UNESCO-listed medina.",
      ar: "العاصمة الروحية للمغرب. تجوّل في المدينة العتيقة المصنفة تراثاً عالمياً لليونسكو.",
    },
  },
  {
    slug: "sahara",
    name: { fr: "Sahara", en: "Sahara", ar: "الصحراء" },
    tagline: {
      fr: "Nuits sous les étoiles",
      en: "Nights under the stars",
      ar: "ليالٍ تحت النجوم",
    },
    image: sahara,
    desc: {
      fr: "Dunes de Merzouga, bivouacs berbères et couchers de soleil incomparables.",
      en: "Merzouga dunes, Berber camps and sunsets you will not find elsewhere.",
      ar: "كثبان مرزوكة، ومخيمات أمازيغية، وغروب شمس لا مثيل له.",
    },
  },
];
