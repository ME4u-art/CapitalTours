import { localProvider } from "./local";
import { createWordPressProvider } from "./wordpress";
import type { ContentProvider } from "./provider";

export type { ContentProvider } from "./provider";

/**
 * The switch: set `VITE_CMS_URL` and the site reads its programmes from
 * WordPress; leave it unset and it serves the bundled TypeScript files.
 *
 * Unset is the default on purpose — a fresh clone, and every build until
 * someone points it at a CMS, keeps working with no WordPress anywhere.
 *
 *   VITE_CMS_URL=http://capital-cms.local   # local
 *   VITE_CMS_URL=https://cms.capitaltours.ma # production (set in Vercel)
 */
const cmsUrl = import.meta.env.VITE_CMS_URL?.trim();

export const content: ContentProvider = cmsUrl ? createWordPressProvider(cmsUrl) : localProvider;
