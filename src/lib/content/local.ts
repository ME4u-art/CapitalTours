import { featuredTours } from "@/lib/tours";
import { pilgrimagePrograms } from "@/lib/pilgrimage";
import type { ContentProvider } from "./provider";

/** The bundled programmes. Also the fallback when WordPress is unreachable. */
export const localProvider: ContentProvider = {
  getTours: async () => featuredTours,
  getTour: async (slug) => featuredTours.find((t) => t.slug === slug),
  getPilgrimagePrograms: async () => pilgrimagePrograms,
  getPilgrimageProgram: async (slug) => pilgrimagePrograms.find((p) => p.slug === slug),
};
