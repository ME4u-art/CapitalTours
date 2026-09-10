import type { Dictionary } from "./fr";

/**
 * Arabic. Typed as Dictionary, so a key missing here fails the build.
 *
 * Numbers stay in Western digits — Moroccan agencies quote prices that way,
 * and mixing digit systems inside an RTL line is where bidi text goes wrong.
 */
export const ar: Dictionary = {
  "nav.voyages": "رحلاتنا",
  "nav.hajjOmra": "الحج والعمرة",
  "nav.maroc": "انطلاقات من المغرب",
  "nav.transport": "النقل",
  "nav.mice": "المؤتمرات والحوافز",
  "nav.about": "من نحن",
  "nav.contact": "اتصل بنا",
  "nav.menu": "القائمة",
  "nav.close": "إغلاق",
  "header.tagline": "تابعونا · وكالة أسفار بالمغرب",
  "header.langLabel": "اختر اللغة",

  "footer.ourTrips": "رحلاتنا",
  "footer.services": "خدماتنا",
  "footer.contact": "اتصل بنا",
  "footer.legal": "إشعار قانوني",
  "footer.privacy": "سياسة الخصوصية",
  "footer.cookies": "سياسة ملفات تعريف الارتباط",
  "footer.rights": "جميع الحقوق محفوظة.",
  "footer.agencyType": "وكالة أسفار",
  "footer.findUs": "أين تجدنا",
  "footer.usefulLinks": "روابط مفيدة",
  "footer.cgu": "شروط الاستخدام",
  "footer.organisedTrips": "رحلات منظمة",
  "footer.contactLink": "اتصل بنا",
  "footer.hq1": "المقر 1: 45 إقامة الوطنية، شارع الحسن الثاني، فاس",
  "footer.hq2": "المقر 2: شارع مولاي رشيد، حي الزهور 1، طريق صفرو، فاس",

  "home.heroCta": "اكتشف برنامجنا",
  "home.prevProgram": "البرنامج السابق",
  "home.nextProgram": "البرنامج التالي",
  "home.prev": "السابق",
  "home.next": "التالي",
  "home.organisedTrips": "رحلات منظمة",
  "home.destinations": "وجهاتنا",
  "home.moroccoTitle": "المغرب، بشكل مختلف.",
  "home.cruises": "رحلاتنا البحرية",
  "home.cruisesTitle": "اكتشف العالم عبر البحر.",
  "home.miceTitle": "الاجتماعات والحوافز والمؤتمرات والمعارض",
  "home.partners": "شركاؤنا",

  "action.discover": "اكتشف",
  "action.seeAll": "عرض الكل",
  "action.book": "احجز الآن",
  "action.details": "عرض البرنامج",
  "action.backHome": "العودة إلى الصفحة الرئيسية",
  "action.contactUs": "اتصل بنا",

  "tour.from": "ابتداءً من",
  "tour.perPerson": "للشخص الواحد",
  "tour.duration": "المدة",
  "tour.dates": "التواريخ",
  "tour.included": "البرنامج يشمل",
  "tour.notIncluded": "البرنامج لا يشمل",
  "tour.itinerary": "البرنامج يومًا بيوم",
  "tour.highlights": "أبرز المحطات",
  "tour.noResults": "لا يوجد برنامج يطابق بحثك.",

  "pilgrimage.title": "الحج والعمرة",
  "pilgrimage.hotels": "الفنادق",
  "pilgrimage.roomDouble": "غرفة ثنائية",
  "pilgrimage.roomTriple": "غرفة ثلاثية",
  "pilgrimage.roomQuad": "غرفة رباعية",

  "error.notFoundTitle": "الصفحة غير موجودة",
  "error.notFoundBody": "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
  "error.genericTitle": "حدث خطأ ما",
  "error.genericBody":
    "أعد المحاولة بعد لحظات. إذا استمر الأمر، لا تتردد في الاتصال بنا.",
};
