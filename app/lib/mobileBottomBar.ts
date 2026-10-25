import { FULL_NAME_NAP } from "./fullNameNap.ts";

/**
 * Directions target. This store has no maps.app.goo.gl short link.
 * FULL_NAME_NAP.mapsUrl is the Google Business Profile place pin.
 */
export const MOBILE_BAR_DIRECTIONS_URL = FULL_NAME_NAP.mapsUrl;

/** In-store boards. The bar is omitted on these paths only. */
export function hidesMobileBottomBar(pathname: string) {
  const path = (pathname.split("?")[0] || "/").replace(/\/+$/, "") || "/";
  return path === "/tv" || path === "/tv2";
}
