/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Headless WordPress base URL. Unset = serve the bundled programmes. */
  readonly VITE_CMS_URL?: string;
}
