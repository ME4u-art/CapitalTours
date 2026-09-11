import type { Tour } from "@/lib/tours";
import type { PilgrimageProgram } from "@/lib/pilgrimage";

/**
 * Where the site reads its programmes from.
 *
 * Two implementations: the bundled TypeScript files (./local) and the
 * agency's WordPress (./wordpress). ./index picks one at build time.
 *
 * Everything stays `Localized` — the CMS stores each text once per language
 * and the provider hands all three back, exactly like the TS files do. That
 * way no page had to learn where its content came from.
 */
export interface ContentProvider {
  getTours(): Promise<Tour[]>;
  getTour(slug: string): Promise<Tour | undefined>;
  getPilgrimagePrograms(): Promise<PilgrimageProgram[]>;
  getPilgrimageProgram(slug: string): Promise<PilgrimageProgram | undefined>;
}
