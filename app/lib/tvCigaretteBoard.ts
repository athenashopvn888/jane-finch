import { isRealCigaretteItem } from "./cigMarkers.ts";
import { isNicotineItem } from "../tv/flashMessages.ts";

type ShelfItem = { category?: string; name?: string; slug?: string };

/**
 * Items for one TV2 card.
 * Cigarette cartons follow the live TV flag. During Toronto daytime the
 * cigarette shelf stays up when that flag is on (the 8:00–9:00 overlap);
 * when the flag is off the card keeps today's daytime hide.
 * Wraps, papers, Backwoods, and pouches are never treated as cigarettes.
 */
export function visibleTvCardItems<T extends ShelfItem>(
  items: T[],
  cardId: string,
  matches: (item: T) => boolean,
  showCigarettes: boolean,
  daytime: boolean,
): T[] {
  return items.filter(matches).filter((item) => {
    if (daytime && isNicotineItem(item)) {
      const keepCigBoard =
        cardId === "CIGARETTES" &&
        showCigarettes &&
        (item.category || "").toUpperCase() === "CIGARETTES";
      if (!keepCigBoard) return false;
    }
    if (!showCigarettes && isRealCigaretteItem(item)) return false;
    return true;
  });
}
