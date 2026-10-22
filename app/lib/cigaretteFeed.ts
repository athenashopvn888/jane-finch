import { cache } from "react";
import { SHOW_CIGARETTES } from "./siteConfig.ts";

export type CigaretteSnapshot = {
  web: { show: boolean };
  tv: { show: boolean };
  guides: { show: boolean };
};

/**
 * Diagnostic snapshot for /api/content-status.
 * Jane Finch hides cigarette URLs with the existing 302s in middleware.ts
 * and next.config.ts. This snapshot does not replace those redirects.
 */
export async function readCigaretteFeed(): Promise<CigaretteSnapshot> {
  const show = SHOW_CIGARETTES;
  return { web: { show }, tv: { show }, guides: { show } };
}

export const getCigaretteSnapshot = cache(readCigaretteFeed);
