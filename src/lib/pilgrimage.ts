import type { Localized, LocalizedList } from "@/i18n";
import { IMG } from "@/lib/tours";

/* Capital Tours' own Hajj and Omra programmes, taken from the agency's
   printed adverts. Arabic is the original wording; the French and English are
   translations of it, not separate offers — the hotels, distances and prices
   are the client's and must stay identical across all three. */

/** Room prices are figures — the same in every language, so written once. */
export type PriceRow = {
  label: Localized;
  sub?: Localized;
  quad: string;
  triple: string;
  double: string;
};

export type PilgrimageProgram = {
  slug: string;
  /** Key, not display text — the badge label comes from the dictionary. */
  kind: "omra" | "hajj";
  title: Localized;
  shortTitle: Localized;
  priceFrom: Localized;
  datesLabel: Localized;
  dates: LocalizedList;
  duration: Localized;
  flight: Localized;
  flightRoute: Localized;
  image: string;
  intro: Localized;
  description: LocalizedList;
  /** groups of pricing tables (Hajj has 3 tiers, Omra has 1) */
  tables: {
    name?: Localized;
    tag?: Localized;
    hotels?: Localized;
    rows: PriceRow[];
  }[];
  includes: LocalizedList;
  notes: LocalizedList;
  badges: { text: Localized; tone: "green" | "red" }[];
  gallery: string[];
};

/**
 * Empty on purpose.
 *
 * This used to point at five photographs of a Tazi Travels pilgrimage group —
 * real, identifiable people who never agreed to appear on another agency's
 * site. The gallery section is skipped while this is empty; fill it with
 * Capital Tours' own photos, with the travellers' consent.
 */
const GALLERY: string[] = [];

export const pilgrimagePrograms: PilgrimageProgram[] = [
  {
    slug: "omra-2026",
    kind: "omra",
    title: {
      fr: "Programme Omra 1447H / 2026",
      en: "Umrah programme 1447H / 2026",
      ar: "برنامج العمرة 1447هـ / 2026م",
    },
    shortTitle: {
      fr: "Omra 2026",
      en: "Umrah 2026",
      ar: "عمرة 2026",
    },
    priceFrom: {
      fr: "17 000 dh",
      en: "17,000 dh",
      ar: "17,000 درهم",
    },
    datesLabel: {
      fr: "Juillet — août 2026",
      en: "July — August 2026",
      ar: "يوليوز — غشت 2026",
    },
    dates: {
      fr: ["Du 6 au 20 juillet", "Du 30 juillet au 13 août"],
      en: ["6 to 20 July", "30 July to 13 August"],
      ar: ["من 6 إلى 20 يوليوز", "من 30 يوليوز إلى 13 غشت"],
    },
    duration: {
      fr: "15 jours — 14 nuits",
      en: "15 days — 14 nights",
      ar: "15 يوماً — 14 ليلة",
    },
    flight: {
      fr: "Vol direct vers Médine",
      en: "Direct flight to Medina",
      ar: "طيران مباشر إلى المدينة المنورة",
    },
    flightRoute: {
      fr: "Vol direct : Casablanca / Médine — Djeddah / Casablanca",
      en: "Direct flight: Casablanca / Medina — Jeddah / Casablanca",
      ar: "طيران مباشر : الدار البيضاء / المدينة المنورة — جدة / الدار البيضاء",
    },
    image: IMG.hajj,
    intro: {
      fr: "Omra été 2026 avec Capital Tours : vol direct vers Médine, hôtels de la zone centrale jusqu'au parvis du Haram, et encadrement complet tout au long du voyage.",
      en: "Summer 2026 Umrah with Capital Tours: a direct flight to Medina, hotels from the central district to the Haram forecourt, and full support throughout the trip.",
      ar: "عمرة صيف 2026 مع كابيتال تورز: طيران مباشر إلى المدينة المنورة، فنادق من المركزية إلى ساحة الحرم، وتأطير كامل طيلة الرحلة.",
    },
    description: {
      fr: [
        "Capital Tours vous offre la possibilité d'accomplir la Omra dans une atmosphère spirituelle privilégiée, avec tout le confort et l'organisation nécessaires à un voyage sûr, fluide et serein.",
        "Nous vous accompagnons pas à pas, du départ au retour : hôtels agréés, transferts confortables et une équipe spécialisée dans l'accueil des pèlerins.",
        "Notre voyage allie confort, qualité et respect complet des exigences du rite, ce qui le rend adapté à tous les âges.",
      ],
      en: [
        "Capital Tours gives you the chance to perform the Umrah in a distinctly spiritual setting, with all the comfort and organisation needed for a safe, smooth and calm journey.",
        "We stay with you at every step, from departure to return: approved hotels, comfortable transfers and a team that specialises in looking after pilgrims.",
        "The trip combines comfort, quality and full respect for the requirements of the rite, which makes it suitable for every age.",
      ],
      ar: [
        "تمنحكم كابيتال تورز فرصة أداء العمرة في أجواء روحانية مميزة، مع توفير جميع وسائل الراحة والتنظيم لضمان تجربة آمنة، سلسة، وهادئة.",
        "نحرص على مرافقتكم خطوة بخطوة منذ مغادرتكم إلى حين عودتكم، عبر خدمات فندقية معتمدة، وتنقلات مريحة، وإشراف فريق مختص بخدمة الحجاج والمعتمرين.",
        "رحلتنا تجمع بين الراحة والرفاهية والالتزام الكامل بمتطلبات المناسك، مما يجعلها مناسبة لجميع الأعمار.",
      ],
    },
    tables: [
      {
        rows: [
          {
            label: {
              fr: "Hôtel Rifaa Al Sad",
              en: "Rifaa Al Sad Hotel",
              ar: "فندق رفاع السد",
            },
            sub: {
              fr: "800 m du Haram",
              en: "800 m from the Haram",
              ar: "800 م من الحرم",
            },
            quad: "17,000",
            triple: "18,000",
            double: "19,500",
          },
          {
            label: {
              fr: "Hôtel Mather Al Iman",
              en: "Mather Al Iman Hotel",
              ar: "فندق ماتر الإيمان",
            },
            sub: {
              fr: "200 m du Haram",
              en: "200 m from the Haram",
              ar: "200 م من الحرم",
            },
            quad: "18,500",
            triple: "19,500",
            double: "22,000",
          },
          {
            label: {
              fr: "Rove Le Méridien",
              en: "Rove Le Méridien",
              ar: "روف الميريديان",
            },
            sub: {
              fr: "150 m du Haram · petit déjeuner inclus",
              en: "150 m from the Haram · breakfast included",
              ar: "150 م من الحرم · مع وجبة الفطور",
            },
            quad: "24,000",
            triple: "25,000",
            double: "27,500",
          },
          {
            label: {
              fr: "Worth Peninsula / Swiss",
              en: "Worth Peninsula / Swiss",
              ar: "ورت بينسولا / سويس",
            },
            sub: {
              fr: "Parvis du Haram · petit déjeuner inclus",
              en: "On the Haram forecourt · breakfast included",
              ar: "ساحة الحرم · مع وجبة الفطور",
            },
            quad: "27,500",
            triple: "29,500",
            double: "33,000",
          },
        ],
      },
    ],
    includes: {
      fr: [
        "Billet d'avion aller / retour",
        "Hébergement en hôtel",
        "Transferts en Arabie Saoudite",
        "Visites à La Mecque et Médine",
        "Guide accompagnateur du groupe",
        "Frais de visa",
      ],
      en: [
        "Return flight",
        "Hotel accommodation",
        "Transfers within Saudi Arabia",
        "Visits in Mecca and Medina",
        "Guide accompanying the group",
        "Visa fees",
      ],
      ar: [
        "تذكرة الطيران ذهاباً وإياباً",
        "الإقامة في الفنادق",
        "التنقلات داخل السعودية",
        "المزارات بمكة والمدينة",
        "مرشد مرافق للمجموعة",
        "رسوم التأشيرة",
      ],
    },
    notes: {
      fr: [
        "Prix par personne en dirhams. L'hébergement en zone centrale à Médine est inclus.",
      ],
      en: [
        "Prices are per person in dirhams. Accommodation in the central district of Medina is included.",
      ],
      ar: ["الأسعار للفرد الواحد بالدرهم. الإقامة المركزية بالمدينة المنورة مشمولة."],
    },
    badges: [],
    gallery: GALLERY,
  },
  {
    slug: "hajj-2027",
    kind: "hajj",
    title: {
      fr: "Programme Hajj 1448H / 2027",
      en: "Hajj programme 1448H / 2027",
      ar: "برنامج الحج 1448هـ / 2027م",
    },
    shortTitle: {
      fr: "Hajj 1448H / 2027",
      en: "Hajj 1448H / 2027",
      ar: "الحج 1448هـ / 2027م",
    },
    priceFrom: {
      fr: "77 000 dh",
      en: "77,000 dh",
      ar: "77,000 درهم",
    },
    datesLabel: {
      fr: "Saison du Hajj 1448H",
      en: "Hajj season 1448H",
      ar: "موسم الحج 1448هـ",
    },
    dates: {
      fr: ["Du 27 Dhou al-Qi'da au 15 Dhou al-Hijja"],
      en: ["27 Dhu al-Qi'dah to 15 Dhu al-Hijjah"],
      ar: ["من 27 ذي القعدة إلى 15 ذي الحجة"],
    },
    duration: {
      fr: "Environ 19 jours",
      en: "About 19 days",
      ar: "حوالي 19 يوماً",
    },
    flight: {
      fr: "Vol direct",
      en: "Direct flight",
      ar: "طيران مباشر",
    },
    flightRoute: {
      fr: "Vol direct : Casablanca / Médine — Djeddah / Casablanca",
      en: "Direct flight: Casablanca / Medina — Jeddah / Casablanca",
      ar: "طيران مباشر : الدار البيضاء / المدينة المنورة — جدة / الدار البيضاء",
    },
    image: "/Hajj.jpg",
    intro: {
      fr: "Le programme Hajj 1448H / 2027 en trois formules (économique, intermédiaire, touristique 5★), avec des hôtels proches du Haram et un encadrement religieux et logistique complet.",
      en: "The Hajj 1448H / 2027 programme in three tiers (economy, mid-range, 5★ tourist), with hotels close to the Haram and full religious and logistical support.",
      ar: "برنامج الحج 1448هـ / 2027م بثلاث صيغ (اقتصادي، متوسط، سياحي 5 نجوم)، بفنادق قريبة من الحرم وتأطير ديني وتقني كامل.",
    },
    description: {
      fr: [
        "Capital Tours vous offre la possibilité d'accomplir les rites du Hajj dans une atmosphère spirituelle privilégiée, avec tout le confort et l'organisation nécessaires à un voyage sûr, fluide et serein.",
        "Nous vous accompagnons pas à pas, du départ au retour : hôtels agréés, transferts confortables et un encadrement religieux et logistique assuré par des accompagnateurs expérimentés.",
        "L'hébergement dans les Lieux Saints (Mina, Arafat, Muzdalifa) se fait sous tentes équipées et climatisées, dans le respect complet des exigences du rite.",
      ],
      en: [
        "Capital Tours gives you the chance to perform the rites of Hajj in a distinctly spiritual setting, with all the comfort and organisation needed for a safe, smooth and calm journey.",
        "We stay with you at every step, from departure to return: approved hotels, comfortable transfers, and religious and logistical support from experienced guides.",
        "Accommodation in the Holy Sites (Mina, Arafat, Muzdalifah) is in equipped, air-conditioned tents, in full respect of the requirements of the rite.",
      ],
      ar: [
        "تمنحكم كابيتال تورز فرصة أداء مناسك الحج في أجواء روحانية مميزة، مع توفير جميع وسائل الراحة والتنظيم لضمان تجربة آمنة، سلسة، وهادئة.",
        "نحرص على مرافقتكم خطوة بخطوة منذ مغادرتكم إلى حين عودتكم، عبر خدمات فندقية معتمدة، وتنقلات مريحة، وتأطير ديني وتقني من طرف مرافقين ذوي خبرة.",
        "الإقامة بالمشاعر المقدسة (منى، عرفات، مزدلفة) بمخيمات مجهزة ومكيفة، مع الالتزام الكامل بمتطلبات المناسك.",
      ],
    },
    tables: [
      {
        name: {
          fr: "Formule économique",
          en: "Economy tier",
          ar: "البرنامج الاقتصادي",
        },
        tag: { fr: "Économique", en: "Economy", ar: "اقتصادي" },
        hotels: {
          fr: "Royal Inn — Ajyad · 450 m (petit déjeuner et dîner)",
          en: "Royal Inn — Ajyad · 450 m (breakfast and dinner)",
          ar: "نزل رويال إن — جادة أجياد · 450 م (بالإفطار والعشاء)",
        },
        rows: [
          {
            label: {
              fr: "Royal Inn — Ajyad",
              en: "Royal Inn — Ajyad",
              ar: "نزل رويال إن — جادة أجياد",
            },
            sub: {
              fr: "450 m (petit déjeuner et dîner)",
              en: "450 m (breakfast and dinner)",
              ar: "450 م (بالإفطار والعشاء)",
            },
            quad: "77,000",
            triple: "83,000",
            double: "97,000",
          },
        ],
      },
      {
        name: {
          fr: "Formule intermédiaire",
          en: "Mid-range tier",
          ar: "البرنامج المتوسط",
        },
        tag: { fr: "Intermédiaire", en: "Mid-range", ar: "متوسط" },
        hotels: {
          fr: "Royal Inn Prestige Ajyad · 200 m — Le Méridien · 150 m",
          en: "Royal Inn Prestige Ajyad · 200 m — Le Méridien · 150 m",
          ar: "نزل رويال إن برستيج أجياد · 200 م — الميريديان · 150 م",
        },
        rows: [
          {
            label: {
              fr: "Royal Inn Prestige Ajyad",
              en: "Royal Inn Prestige Ajyad",
              ar: "رويال إن برستيج أجياد",
            },
            sub: {
              fr: "200 m (petit déjeuner et dîner)",
              en: "200 m (breakfast and dinner)",
              ar: "200 م (بالإفطار والعشاء)",
            },
            quad: "98,000",
            triple: "108,000",
            double: "128,000",
          },
          {
            label: {
              fr: "Le Méridien — Madin",
              en: "Le Méridien — Madin",
              ar: "الميريديان — مادن",
            },
            sub: {
              fr: "150 m (petit déjeuner et dîner)",
              en: "150 m (breakfast and dinner)",
              ar: "150 م (بالإفطار والعشاء)",
            },
            quad: "107,000",
            triple: "118,000",
            double: "139,000",
          },
        ],
      },
      {
        name: {
          fr: "Formule touristique 5★",
          en: "5★ tourist tier",
          ar: "البرنامج السياحي 5 نجوم",
        },
        tag: { fr: "Touristique", en: "Tourist", ar: "سياحي" },
        hotels: {
          fr: "Jabal Omar Rotana · 150 m — Swissôtel — Fairmont Clock Tower",
          en: "Jabal Omar Rotana · 150 m — Swissôtel — Fairmont Clock Tower",
          ar: "روتانا جبل عمر · 150 م — سويس أوتيل — فيرمونت برج الساعة",
        },
        rows: [
          {
            label: {
              fr: "Jabal Omar Rotana",
              en: "Jabal Omar Rotana",
              ar: "روتانا جبل عمر",
            },
            sub: {
              fr: "150 m (petit déjeuner et dîner)",
              en: "150 m (breakfast and dinner)",
              ar: "150 م (بالإفطار والعشاء)",
            },
            quad: "118,000",
            triple: "130,000",
            double: "157,000",
          },
          {
            label: { fr: "Swissôtel", en: "Swissôtel", ar: "سويس أوتيل" },
            sub: {
              fr: "Les tours (petit déjeuner et dîner)",
              en: "The towers (breakfast and dinner)",
              ar: "الأبراج (بالإفطار والعشاء)",
            },
            quad: "124,000",
            triple: "139,000",
            double: "168,000",
          },
          {
            label: {
              fr: "Fairmont Clock Tower",
              en: "Fairmont Clock Tower",
              ar: "فيرمونت برج الساعة",
            },
            sub: {
              fr: "Petit déjeuner et dîner",
              en: "Breakfast and dinner",
              ar: "بالإفطار والعشاء",
            },
            quad: "133,000",
            triple: "149,000",
            double: "181,000",
          },
        ],
      },
    ],
    includes: {
      fr: [
        "Billet d'avion aller / retour en vol direct",
        "Hébergement dans les hôtels indiqués à Médine (zone centrale nord) et à La Mecque, petit déjeuner et dîner inclus",
        "Tous les transferts en autocars récents et climatisés",
        "Encadrement religieux et logistique par des accompagnateurs expérimentés tout au long du voyage",
        "Hébergement à Mina, Arafat et Muzdalifa en tentes formule (B), équipées et climatisées, repas inclus",
        "Le prix comprend les frais des Habous et de Barid Bank",
      ],
      en: [
        "Return flight, direct",
        "Accommodation in the listed hotels in Medina (northern central district) and Mecca, breakfast and dinner included",
        "All transfers in recent air-conditioned coaches",
        "Religious and logistical support from experienced guides throughout the trip",
        "Accommodation in Mina, Arafat and Muzdalifah in equipped, air-conditioned package (B) tents, meals included",
        "The price covers the Habous and Barid Bank fees",
      ],
      ar: [
        "تذكرة الطائرة ذهاباً وعودة مباشرة",
        "الإقامة بالفنادق المذكورة في المدينة المنورة (في المركزية الشمالية) ومكة المكرمة شاملة وجبتي الإفطار والعشاء",
        "جميع التنقلات على متن حافلات حديثة ومكيفة",
        "تأطير ديني وتقني من طرف مرافقين ذوي خبرة وكفاءة عالية طيلة مدة الرحلة",
        "الإقامة بمنى وعرفات ومزدلفة بمخيمات حزمة (ب) مجهزة ومكيفة شاملة الوجبات",
        "السعر يشمل مصاريف الأوقاف وبريد بنك",
      ],
    },
    notes: {
      fr: [
        "Réservation possible des tentes de Mina et Arafat en carré (A) et carré (B+) (les immeubles)",
        "Les chambres des tours sont sans vue, avec possibilité d'ajouter la vue sur le Haram ou sur la Kaaba à la demande",
      ],
      en: [
        "Tents in Mina and Arafat can also be booked in block (A) and block (B+) (the buildings)",
        "Tower rooms have no view; a view over the Haram or the Kaaba can be added on request",
      ],
      ar: [
        "متوفر حجز مخيمات منى وعرفات في مربع (أ) ومربع (ب+) (العمائر)",
        "غرف الأبراج غير مطلة مع إمكانية إضافة الإطلالة على الحرم أو الكعبة حسب الطلب",
      ],
    },
    badges: [
      {
        text: {
          fr: "Le prix ne comprend pas les frais du sacrifice : 1 900 dh",
          en: "The price does not cover the sacrifice fee: 1,900 dh",
          ar: "السعر لا يشمل مصاريف الهدي : 1,900 درهم",
        },
        tone: "green",
      },
      {
        text: {
          fr: "Condition de voyage : passeport valide plus de 6 mois",
          en: "Travel condition: passport valid for more than 6 months",
          ar: "شروط السفر : صلاحية جواز السفر أكثر من 6 أشهر",
        },
        tone: "red",
      },
    ],
    gallery: GALLERY,
  },
];

export const agencyPhones = ["+212 667 618274", "+212 661 645083", "+212 5 35 94 47 25", "+212 5 35 62 63 63"];

export const whatsappNumber = "+212 667 618274";

/** Both offices. The Footer keeps its own translated copy; these are for the
    pilgrimage pages, which quote the agency's own advert wording. */
export const agencyAddresses: Localized[] = [
  {
    fr: "Siège 1 : 45 Résidence Al Watania, Avenue Hassan II, Fès",
    en: "Office 1: 45 Résidence Al Watania, Avenue Hassan II, Fes",
    ar: "المقر الأول : 45 إقامة الوطنية، شارع الحسن الثاني، فاس",
  },
  {
    fr: "Siège 2 : Avenue Moulay Rachid, Quartier Zohour 1, Route de Sefrou, Fès",
    en: "Office 2: Avenue Moulay Rachid, Quartier Zohour 1, Route de Sefrou, Fes",
    ar: "المقر الثاني : شارع مولاي رشيد، حي الزهور 1، طريق صفرو، فاس",
  },
];
