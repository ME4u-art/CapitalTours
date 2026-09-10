/**
 * French — the source of truth.
 *
 * Every other dictionary is typed against this one, so adding a key here and
 * forgetting to translate it fails the build instead of shipping a blank.
 * Keys are grouped by where they appear, not alphabetically: it is far easier
 * to translate a screen at a time than a scattered list.
 */
export const fr = {
  // header + navigation
  "nav.voyages": "Nos voyages",
  "nav.hajjOmra": "Hajj / Omra",
  "nav.maroc": "Départs Maroc",
  "nav.transport": "Transport",
  "nav.mice": "MICE",
  "nav.about": "Qui sommes-nous ?",
  "nav.contact": "Nous contacter",
  "nav.menu": "Menu",
  "nav.close": "Fermer",
  "header.tagline": "Suivez-nous · agence de voyages au Maroc",
  "header.langLabel": "Choisir la langue",

  // footer
  "footer.ourTrips": "Nos voyages",
  "footer.services": "Nos services",
  "footer.contact": "Contact",
  "footer.legal": "Mentions légales",
  "footer.privacy": "Politique de confidentialité",
  "footer.cookies": "Politique de cookies",
  "footer.rights": "Tous droits réservés.",
  "footer.agencyType": "Agence de voyages",
  "footer.findUs": "Retrouvez-nous ici",
  "footer.usefulLinks": "Liens utiles",
  "footer.cgu": "CGU",
  "footer.organisedTrips": "Voyages organisés",
  "footer.contactLink": "Contact",
  "footer.hq1": "Siège 1 : 45 Résidence Al Watania, Avenue Hassan II, Fès",
  "footer.hq2":
    "Siège 2 : Avenue Moulay Rachid, Quartier Zohour 1, Route de Sefrou, Fès",

  "home.heroCta": "Découvrir notre offre",
  "home.prevProgram": "Programme précédent",
  "home.nextProgram": "Programme suivant",
  "home.prev": "Précédent",
  "home.next": "Suivant",
  "home.organisedTrips": "Voyages organisés",
  "home.destinations": "Nos destinations",
  "home.moroccoTitle": "Le Maroc, autrement.",
  "home.cruises": "Nos croisières",
  "home.cruisesTitle": "Découvrez le monde au fil de l'eau.",
  "home.miceTitle": "Meetings, Incentives, Conferences & Exhibitions",
  "home.partners": "Nos partenaires",

  // shared actions
  "action.discover": "Découvrir",
  "action.seeAll": "Voir tout",
  "action.book": "Réserver",
  "action.details": "Voir le programme",
  "action.backHome": "Retour à l'accueil",
  "action.contactUs": "Nous contacter",

  // tour cards and listings
  "tour.from": "À partir de",
  "tour.perPerson": "par personne",
  "tour.duration": "Durée",
  "tour.dates": "Dates",
  "tour.included": "Le prix comprend",
  "tour.notIncluded": "Le prix ne comprend pas",
  "tour.itinerary": "Programme jour par jour",
  "tour.highlights": "Les temps forts",
  "tour.noResults": "Aucun programme ne correspond à votre recherche.",

  // pilgrimage
  "pilgrimage.title": "Hajj & Omra",
  "pilgrimage.hotels": "Hôtels",
  "pilgrimage.roomDouble": "Chambre double",
  "pilgrimage.roomTriple": "Chambre triple",
  "pilgrimage.roomQuad": "Chambre quadruple",

  // errors and empty states
  "error.notFoundTitle": "Page introuvable",
  "error.notFoundBody":
    "La page que vous cherchez n'existe pas ou a été déplacée.",
  "error.genericTitle": "Une erreur est survenue",
  "error.genericBody":
    "Réessayez dans un instant. Si le problème persiste, contactez-nous.",
} as const;

/** The shape every other language must satisfy. */
export type TranslationKey = keyof typeof fr;
export type Dictionary = Record<TranslationKey, string>;
