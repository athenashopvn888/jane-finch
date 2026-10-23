import { cache } from "react";
import {
  cigarettePublicHeaders,
  decideCigaretteGuide,
  decideCigaretteSurface,
  decideWebsiteSurface,
  publicWebsiteCigaretteFlag,
  reconcileSurfaceItems,
  type CigaretteSurfaceDecision,
  type CigaretteWording,
} from "./cigDecision.ts";
import { allFlowers, allItems, type ItemProduct } from "./products.ts";
import { cigaretteEnvHardOff, SHOW_CIGARETTES } from "./siteConfig.ts";
import { getCigaretteDataset } from "./tvStock";

export type CigaretteSnapshot = {
  web: CigaretteSurfaceDecision;
  tv: CigaretteSurfaceDecision;
  guides: CigaretteSurfaceDecision;
  wording: CigaretteWording;
  live: boolean;
  items: ItemProduct[];
};

export type PublicCigaretteState = {
  web: boolean;
  tv: boolean;
  wording: CigaretteWording;
};

function snapshotFrom(cig: unknown, items: ItemProduct[], live: boolean, errored: boolean): CigaretteSnapshot {
  const web = decideWebsiteSurface({ cig, items, errored });
  const tv = decideCigaretteSurface({ cig, items, surface: "tv", errored });
  const guides = decideCigaretteGuide({ cig, items, errored });
  return { web, tv, guides, wording: tv.wording, live, items };
}

export async function readCigaretteFeed(): Promise<CigaretteSnapshot> {
  if (cigaretteEnvHardOff()) return snapshotFrom(null, [], false, false);
  try {
    const dataset = await getCigaretteDataset({
      staticFlowers: allFlowers,
      staticItems: allItems,
    });
    const live = dataset?.source === "live";
    const items = Array.isArray(dataset?.items) ? dataset.items as ItemProduct[] : allItems;
    const cig = dataset?.cig ?? null;
    // A live miss with no cig block fails closed. A cached last-good snapshot still carries its saved tvOn.
    return snapshotFrom(cig, items.length ? items : allItems, live, !live && !cig);
  } catch {
    return snapshotFrom(null, allItems, false, true);
  }
}

export const getCigaretteSnapshot = cache(readCigaretteFeed);

export function toPublicCigaretteState(snap: CigaretteSnapshot): PublicCigaretteState {
  return {
    web: publicWebsiteCigaretteFlag(snap.web, SHOW_CIGARETTES),
    tv: snap.tv.show,
    wording: snap.wording,
  };
}

export function snapshotHeaders(snap: CigaretteSnapshot): Record<string, string> {
  const state = toPublicCigaretteState(snap);
  return cigarettePublicHeaders({
    web: SHOW_CIGARETTES ? state.web : false,
    tv: state.tv,
    wording: state.wording,
  });
}

export { reconcileSurfaceItems };
