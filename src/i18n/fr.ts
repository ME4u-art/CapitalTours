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
  "meta.home.title": "Capital Tours — Agence de voyages au Maroc",
  "meta.home.desc":
    "Voyages organisés, circuits, croisières, Hajj & Omra et MICE. Découvrez le monde avec Capital Tours, votre agence de voyages basée au Maroc.",
  "meta.home.ogDesc":
    "Voyages organisés, circuits, croisières, Hajj & Omra et MICE.",
  "home.fareWithFlight": "Tarif avec billet d'avion",
  "home.seeAllTrips": "Voir tous les voyages",
  "home.cruisesLead":
    "Caraïbes, Méditerranée orientale, tour du monde — nos partenaires : Royal Caribbean, MSC et bien plus.",
  "home.seeCruises": "Voir les croisières",
  "home.miceLead":
    "Capital Tours vous accompagne dans l'organisation de séminaires, conférences, congrès et voyages incentives. De la conception à la logistique, nous créons des expériences professionnelles mémorables.",
  "action.learnMore": "En savoir plus",
  "home.moroccoLead":
    "Explorez le Royaume à travers ses villes impériales, ses côtes et ses déserts — entre culture, détente et aventure.",
  "action.moreDetail": "Plus de détail",

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

  // regions — filter labels on /voyages, badge on a tour page
  "region.all": "Tous",
  "region.Asie": "Asie",
  "region.Europe": "Europe",
  "region.Afrique": "Afrique",
  "region.Ameriques": "Amériques",
  "region.MoyenOrient": "Moyen-Orient",

  // /voyages
  "voyages.title": "Toutes nos destinations",
  "voyages.lead":
    "Circuits en groupe avec billet d'avion au départ du Maroc, encadrés par nos guides.",

  // tour detail page
  "tour.overview": "Aperçu du programme",
  "tour.overviewBody":
    "Un programme organisé par Capital Tours et encadré par nos équipes, du départ au retour.",
  "tour.yourItinerary": "Votre itinéraire",
  "tour.includedTitle": "Ce que comprend le programme",
  "tour.notIncludedTitle": "Non inclus",
  "tour.pricePerPerson": "Prix par personne",
  "tour.priceNoteDefault":
    "Base chambre double, sous réserve de disponibilité.",
  "tour.deposit": "Réservez en ligne — acompte 3 000 dhs",
  "tour.gallery": "Photos du voyage",
  "tour.galleryEyebrow": "En images",
  "tour.seeAll": "Voir tous les voyages",
  "tour.notFound": "Voyage introuvable",
  "tour.fbFlights": "Vols internationaux",
  "tour.fbHotel": "Hébergement",
  "tour.fbTransfers": "Transferts",
  "tour.fbGuiding": "Encadrement",

  // /maroc
  "maroc.eyebrow": "Départs garantis Maroc",
  "maroc.title": "Explorez le Maroc autrement.",
  "maroc.lead":
    "Voyages soigneusement conçus, mêlant découverte culturelle, détente et aventure.",
  "maroc.circuits": "Circuits Maroc",
  "maroc.destinations": "Nos destinations au Maroc",
  "maroc.ifrane": "Une journée au cœur d'Ifrane",
  "maroc.imperial": "Au cœur des villes impériales",
  "maroc.south": "Sud du Maroc",

  // /mice
  "mice.lead":
    "De la conception à la logistique, nous imaginons et produisons des événements professionnels sur mesure, au Maroc et à l'international.",
  "mice.quote": "Demander un devis",
  "mice.meetings": "Meetings",
  "mice.meetingsDesc": "Réunions d'entreprise clé en main.",
  "mice.incentives": "Incentives",
  "mice.incentivesDesc": "Voyages de motivation & récompenses.",
  "mice.conferences": "Conferences",
  "mice.conferencesDesc": "Congrès professionnels & scientifiques.",
  "mice.exhibitions": "Exhibitions",
  "mice.exhibitionsDesc": "Salons et événements grand format.",
  "mice.gallery": "Nos événements en images",

  // /transport
  "transport.title": "Votre confort, notre priorité.",
  "transport.lead":
    "Flotte de véhicules haut de gamme, chauffeurs professionnels et service exécutif pour vos déplacements individuels et de groupe au Maroc.",
  "transport.cta": "Réserver un transfert",
  "transport.fleet": "Flotte premium",
  "transport.fleetDesc": "Berlines, SUV, minibus et vans VIP récents.",
  "transport.safety": "Sécurité",
  "transport.safetyDesc":
    "Chauffeurs formés, véhicules assurés, suivi trajet.",
  "transport.always": "24/7",
  "transport.alwaysDesc": "Disponibilité totale, ponctualité garantie.",

  // /a-propos
  "about.eyebrow": "À propos",
  "about.title": "Voyager, avec le cœur.",
  "about.p1":
    "Capital Tours est une agence de voyages marocaine qui compose depuis des années des expériences soigneusement conçues : circuits en groupe, séjours sur mesure, Hajj & Omra et voyages d'affaires.",
  "about.p2":
    "Notre force : une équipe passionnée, un réseau international de partenaires triés sur le volet et un suivi personnalisé avant, pendant et après votre voyage.",
  "about.statYears": "années d'expérience",
  "about.statTravellers": "voyageurs conquis",
  "about.statDestinations": "destinations couvertes",

  // /contact
  "contact.title": "Parlons de votre prochain voyage.",
  "contact.lead": "Notre équipe vous répond sous 24h ouvrées.",
  "contact.city": "Fès, Maroc",
  "contact.firstName": "Prénom",
  "contact.lastName": "Nom",
  "contact.email": "Email",
  "contact.subject": "Sujet",
  "contact.message": "Message",
  "contact.send": "Envoyer",

  // /gallery
  "gallery.title": "Photos de nos voyages",
  "gallery.lead":
    "Quelques souvenirs de nos dernières sorties et pèlerinages.",

  // Hajj & Omra pages
  "hajj.omra": "Omra",
  "hajj.hajj": "Hajj",
  "hajj.eyebrow": "Omra & Hajj",
  "hajj.heroTitle": "Partez l'esprit tranquille vers les Lieux Saints",
  "hajj.heroLead":
    "Des programmes complets, un encadrement religieux, des hôtels proches du Haram et un vol direct — au départ du Maroc.",
  "hajj.omraCta": "Programme Omra",
  "hajj.hajjCta": "Programme Hajj 2027",
  "hajj.ourPrograms": "Nos programmes",
  "hajj.chooseTitle": "Choisissez votre programme",
  "hajj.chooseLead":
    "Cliquez sur un programme pour voir les prix, les hôtels et tous les détails.",
  "hajj.seeDetails": "Voir les détails et les prix",
  "hajj.allIncluded": "Tout est compris",
  "hajj.ourServices": "Nos services inclus",
  "hajj.svcFlight": "Billet d'avion aller / retour",
  "hajj.svcHotel": "Hébergement en hôtel",
  "hajj.svcTransfers": "Transferts en Arabie Saoudite",
  "hajj.svcVisits": "Visites à La Mecque et Médine",
  "hajj.svcGuide": "Guide accompagnateur du groupe",
  "hajj.svcVisa": "Frais de visa inclus",
  "hajj.whyUs": "Pourquoi Capital Tours",
  "hajj.whyTitle": "Un accompagnement de confiance",
  "hajj.why1": "Des groupes encadrés et confortables",
  "hajj.why2": "Des guides religieux expérimentés",
  "hajj.why3": "Un accompagnement spirituel",
  "hajj.why4": "Des hôtels proches du Haram",
  "hajj.why5": "Une assistance 24h/24",
  "hajj.why6": "Vol direct — agence de confiance",
  "hajj.bookNow": "Réservez votre place",
  "hajj.bookLead":
    "Nos conseillers vous accompagnent pour choisir la formule idéale. Contactez Capital Tours :",
  "hajj.socials": "Facebook : Capitaltours · Instagram : Capitaltoursmaroc",
  "hajj.programDetail": "Détail du programme",
  "hajj.duration": "Durée",
  "hajj.departures": "Départs",
  "hajj.flight": "Vol",
  "hajj.pricesTitle": "Prix et hôtels",
  "hajj.pricesLead": "Prix par personne, en dirhams.",
  "hajj.hotel": "Hôtel",
  "hajj.included": "Le programme comprend",
  "hajj.goodToKnow": "Bon à savoir",
  "hajj.gallery": "Photos de nos pèlerinages",
  "hajj.contactTitle": "Une question sur ce programme ?",
  "hajj.whatsapp": "Écrire sur WhatsApp",
  "hajj.backToPrograms": "Retour aux programmes",
  "hajj.notFound": "Programme introuvable",
  "nav.home": "Accueil",
  "hajj.via": "Via",
  "hajj.multiDates":
    "Plusieurs dates de départ — choisissez la vôtre dans le formulaire de réservation.",
  "hajj.tripDescription": "Description du voyage",
  "hajj.priceNote":
    "Prix par personne en dirhams, selon le type de chambre.",
  "hajj.note": "À noter",
  "hajj.galleryEyebrow": "Galerie photo",
  "hajj.photo": "photo",
  "hajj.roomDouble": "Double",
  "hajj.roomTriple": "Triple",
  "hajj.roomQuad": "Quadruple",
  "book.title": "Réserver maintenant",
  "book.lead":
    "Réservez votre voyage en quelques clics en remplissant ce formulaire :",
  "book.program": "Programme",
  "book.chooseProgram": "Choisissez le programme",
  "book.date": "Date du voyage",
  "book.chooseDate": "Choisissez la date de départ",
  "book.chooseHotel": "Choisissez l'hôtel",
  "book.room": "Chambre",
  "book.chooseRoom": "Choisissez le type de chambre",
  "book.people": "Nombre de personnes",
  "book.fullName": "Nom complet",
  "book.phone": "Numéro de téléphone",
  "book.submit": "Poursuivre la réservation",
  "book.privacy":
    "Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification et d'opposition au traitement de vos données personnelles.",
  "book.sentTitle": "Votre demande a bien été envoyée",
  "book.sentBody":
    "Merci. Un conseiller Capital Tours vous contactera sous 24 heures pour confirmer votre réservation sur « {program} ».",

  "meta.hajj.title": "Omra et Hajj — Capital Tours",
  "meta.hajj.desc":
    "Programmes Omra (vol direct vers Médine) et Hajj 1448H / 2027 avec Capital Tours. Prix, hotels et dates au départ du Maroc.",
  "meta.hajj.ogDesc":
    "Omra et Hajj au départ du Maroc — prix, hôtels et dates.",

  // /reservation — the demo checkout
  "res.notFound": "Programme introuvable",
  "res.seePrograms": "Voir nos programmes",
  "res.step1": "Informations",
  "res.step2": "Paiement",
  "res.step3": "Confirmation",
  "res.pricePerPerson": "Prix / personne",
  "res.depositDue": "Acompte à payer",
  "res.balance": "Solde à l'agence",
  "res.beforeDeparture": "Avant le départ",
  "res.secureNote":
    "Paiement sécurisé — acompte remboursable sous conditions.",
  "res.demoNote":
    "Démonstration — paiement simulé. En production, cette étape est connectée à la passerelle bancaire marocaine (Payzone / CMI). Aucune carte n'est réellement débitée.",
  "res.yourInfo": "Vos informations",
  "res.mainTraveller": "Renseignez le voyageur principal.",
  "res.phone": "Téléphone",
  "res.travellers": "Nombre de voyageurs",
  "res.departureCity": "Ville de départ",
  "res.continue": "Continuer vers le paiement",
  "res.payTitle": "Paiement de l'acompte",
  "res.secureBadge": "Sécurisé",
  "res.payLead": "Réglez {amount} pour confirmer votre réservation.",
  "res.cardHolder": "Titulaire de la carte",
  "res.cardNumber": "Numéro de carte",
  "res.expiry": "Expiration",
  "res.cvc": "CVC",
  "res.processing": "Traitement…",
  "res.pay": "Payer",
  "res.back": "Retour",
  "res.confirmed": "Réservation confirmée !",
  "res.thanks":
    "Merci — votre acompte de {amount} pour {tour} a bien été reçu.",
  "res.reference": "Référence",
  "res.followUp":
    "Un conseiller Capital Tours vous contactera sous 24h pour finaliser votre dossier.",
  "res.otherPrograms": "Découvrir d'autres programmes",
  "meta.reservation": "Réservation",

  // page titles and descriptions (<head>)
  "meta.voyages.title": "Nos voyages organisés — Capital Tours",
  "meta.voyages.desc":
    "Découvrez tous nos voyages organisés en groupe avec billet d'avion : Asie, Europe, Amériques et plus.",
  "meta.maroc.title": "Départs Maroc — Circuits & séjours au Maroc | Capital Tours",
  "meta.maroc.desc":
    "Découvrez le Maroc avec nos circuits soignés : Marrakech, Fès, Sahara, villes impériales et côte atlantique.",
  "meta.mice.title": "MICE — Séminaires, congrès & incentives | Capital Tours",
  "meta.mice.desc":
    "Organisation de séminaires, conférences, congrès et voyages incentives. Capital Tours MICE.",
  "meta.transport.title": "Transport privé & chauffeurs — Capital Tours",
  "meta.transport.desc":
    "Flotte haut de gamme, chauffeurs professionnels : transferts, mise à disposition et VIP au Maroc.",
  "meta.about.title": "Qui sommes-nous ? — Capital Tours",
  "meta.about.desc":
    "Capital Tours, agence de voyages marocaine passionnée : circuits, croisières, Hajj & Omra et MICE.",
  "meta.contact.title": "Contact — Capital Tours",
  "meta.contact.desc":
    "Contactez notre équipe pour un devis, une réservation ou un renseignement.",
  "meta.gallery.title": "Photos de nos voyages — Capital Tours",

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
