import Link from "next/link";
import { FLOWER_TIER_PAGES, hubPagesExcept, siblingTierPages } from "../lib/sccHub";
import styles from "./SccHubLinks.module.css";

type SccHubLinksProps = {
  currentPath: string;
  heading?: string;
  includeHub?: boolean;
  includeTiers?: boolean;
};

export default function SccHubLinks({
  currentPath,
  heading = "Jane Finch hubs",
  includeHub = true,
  includeTiers = true,
}: SccHubLinksProps) {
  const hubLinks = includeHub ? hubPagesExcept(currentPath) : [];
  const tierLinks = includeTiers
    ? currentPath.startsWith("/") && FLOWER_TIER_PAGES.some((tier) => tier.href === currentPath)
      ? siblingTierPages(currentPath)
      : FLOWER_TIER_PAGES
    : [];

  if (!hubLinks.length && !tierLinks.length) return null;

  return (
    <nav className={styles.hub} aria-label={heading}>
      <p className={styles.kicker}>{heading}</p>
      {hubLinks.length > 0 && (
        <div className={styles.grid}>
          {hubLinks.map((page) => (
            <Link className={styles.card} href={page.href} key={page.href}>
              <span>{page.label}</span>
              <small>{page.blurb}</small>
            </Link>
          ))}
        </div>
      )}
      {tierLinks.length > 0 && (
        <>
          <p className={styles.subkicker}>Five flower tiers</p>
          <div className={styles.grid}>
            {tierLinks.map((tier) => (
              <Link className={styles.card} href={tier.href} key={tier.href}>
                <span>{tier.name}</span>
                <small>{tier.blurb}</small>
              </Link>
            ))}
          </div>
        </>
      )}
    </nav>
  );
}
