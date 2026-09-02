"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Navbar.module.css";

const FLOWER_LINKS = [
  { href: "/exotic-weed", label: "Exotic Weed" },
  { href: "/premium-weed", label: "Premium Weed" },
  { href: "/aaa-weed", label: "AAA+ Weed" },
  { href: "/aa-weed", label: "AA Weed" },
  { href: "/budget-weed", label: "Budget Weed" },
];

const CATEGORY_LINKS = [
  { href: "/items/edibles", label: "Edibles" },
  { href: "/items/prerolls", label: "Pre-Rolls" },
  { href: "/items/vapes", label: "Nicotine Vape" },
  { href: "/items/vape-disposables", label: "THC Vape" },
  { href: "/items/concentrates", label: "Concentrates" },
  { href: "/items/magic", label: "Magic Stuff" },
  { href: "/items/cigarettes", label: "Cigarettes" },
  { href: "/items/add-ons", label: "Accessories" },
];

const SUPPORT_LINKS = [
  { href: "/careers/budtender", label: "Hiring" },
  { href: "/resources", label: "Resources" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

/* Critical geometry stays inline so a stale CSS chunk can never produce a giant
   natural-size logo or a collapsed wall of navigation text. Module CSS still
   owns the finished theme, responsive polish, hover, and active states. */
const FALLBACK: Record<string, CSSProperties> = {
  navbar: { position: "fixed", inset: "0 0 auto", zIndex: 1000, background: "#050f0a", color: "#fff" },
  topBar: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, minHeight: 56, maxWidth: 1440, margin: "0 auto", padding: "0 16px" },
  logo: { display: "inline-flex", alignItems: "center", gap: 10, minWidth: 0, textDecoration: "none" },
  logoMark: { width: 34, height: 34, flex: "0 0 auto", objectFit: "contain", borderRadius: 8 },
  brandText: { overflow: "hidden", fontSize: 16, fontWeight: 900, lineHeight: 1.05, textOverflow: "ellipsis", textTransform: "uppercase", whiteSpace: "nowrap" },
  actionDock: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, overflowX: "auto" },
  commandBtn: { display: "grid", flex: "0 0 auto", gap: 1, minWidth: 112, minHeight: 44, padding: "8px 12px", border: "1px solid rgba(255,255,255,.16)", borderRadius: 8, textDecoration: "none" },
  commandTitle: { fontSize: 12, fontWeight: 900, lineHeight: 1.1, textTransform: "uppercase" },
  commandMeta: { fontSize: 10, fontWeight: 700, lineHeight: 1.1, opacity: 0.72 },
  menuRail: { overflowX: "auto", overflowY: "hidden" },
  menuInner: { display: "flex", alignItems: "center", gap: 10, width: "max-content", minWidth: "min(calc(100% - 32px), 1440px)", minHeight: 44, margin: "0 auto", padding: "7px 58px 7px 0" },
  menuGroup: { display: "flex", alignItems: "center", gap: 5 },
  groupLabel: { display: "inline-flex", alignItems: "center", padding: "0 7px", fontSize: 10, fontWeight: 900, textTransform: "uppercase" },
  menuLink: { display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 30, padding: "6px 10px", borderRadius: 7, color: "rgba(255,255,255,.82)", fontSize: 12, fontWeight: 800, lineHeight: 1, textDecoration: "none", whiteSpace: "nowrap" },
};

export default function Navbar() {
  const pathname = usePathname();
  const menuRailRef = useRef<HTMLDivElement>(null);
  const [canAdvanceMenu, setCanAdvanceMenu] = useState(false);
  const menuLinks = [...FLOWER_LINKS, ...CATEGORY_LINKS];
  const isStoreMenuActive =
    menuLinks.some((link) => pathname === link.href) ||
    pathname.startsWith("/item/");
  const isDeliveryActive = pathname === "/delivery";

  const updateMenuRail = useCallback(() => {
    const rail = menuRailRef.current;
    if (!rail) return;

    setCanAdvanceMenu(rail.scrollWidth - rail.clientWidth - rail.scrollLeft > 2);
  }, []);

  useEffect(() => {
    const rail = menuRailRef.current;
    if (!rail) return;

    updateMenuRail();
    rail.addEventListener("scroll", updateMenuRail, { passive: true });
    window.addEventListener("resize", updateMenuRail);

    const resizeObserver = new ResizeObserver(updateMenuRail);
    resizeObserver.observe(rail);
    if (rail.firstElementChild) resizeObserver.observe(rail.firstElementChild);

    return () => {
      rail.removeEventListener("scroll", updateMenuRail);
      window.removeEventListener("resize", updateMenuRail);
      resizeObserver.disconnect();
    };
  }, [pathname, updateMenuRail]);

  const advanceMenuRail = () => {
    const rail = menuRailRef.current;
    if (!rail) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({
      left: Math.max(180, rail.clientWidth * 0.75),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <nav className={styles.navbar} id="main-nav" style={FALLBACK.navbar}>
      <div className={styles.topBar} style={FALLBACK.topBar}>
        <Link href="/" className={styles.logo} style={FALLBACK.logo}>
          <img src="/storeFavicon.webp" alt="Jane Finch Cannabis Logo" className={styles.logoMark} style={FALLBACK.logoMark} />
          <span className={styles.brandText} style={FALLBACK.brandText}>Jane Finch Cannabis</span>
        </Link>

        <div className={styles.actionDock} aria-label="Primary navigation" style={FALLBACK.actionDock}>
          <Link
            href="/exotic-weed"
            className={`${styles.commandBtn} ${isStoreMenuActive ? styles.commandBtnActive : ""}`}
            style={FALLBACK.commandBtn}
            aria-current={isStoreMenuActive ? "page" : undefined}
          >
            <span className={styles.commandTitle} style={FALLBACK.commandTitle}>Store Menu</span>
            <span className={styles.commandMeta} style={FALLBACK.commandMeta}>Flower + products</span>
          </Link>
          <Link
            href="/delivery"
            className={`${styles.commandBtn} ${styles.deliveryBtn} ${isDeliveryActive ? styles.deliveryBtnActive : ""}`}
            style={FALLBACK.commandBtn}
            aria-current={isDeliveryActive ? "page" : undefined}
          >
            <span className={styles.commandTitle} style={FALLBACK.commandTitle}>Delivery Menu</span>
            <span className={styles.commandMeta} style={FALLBACK.commandMeta}>Live 10 a.m.–10 p.m.</span>
          </Link>
          <Link
            href="/careers/budtender"
            className={styles.commandBtn}
            style={FALLBACK.commandBtn}
          >
            <span className={styles.commandTitle} style={FALLBACK.commandTitle}>Hiring</span>
            <span className={styles.commandMeta} style={FALLBACK.commandMeta}>Apply online</span>
          </Link>
        </div>
      </div>

      <div className={styles.menuRailWrap}>
        <div
          ref={menuRailRef}
          id="store-menu-rail"
          className={styles.menuRail}
          aria-label="Store menu categories"
          style={FALLBACK.menuRail}
        >
          <div className={styles.menuInner} style={FALLBACK.menuInner}>
          <div className={styles.menuGroup} style={FALLBACK.menuGroup}>
            <span className={styles.groupLabel} style={FALLBACK.groupLabel}>Flower</span>
            {FLOWER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.menuLink} ${pathname === link.href ? styles.menuLinkActive : ""}`}
                style={FALLBACK.menuLink}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.menuGroup} style={FALLBACK.menuGroup}>
            <span className={styles.groupLabel} style={FALLBACK.groupLabel}>Products</span>
            {CATEGORY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.menuLink} ${pathname === link.href ? styles.menuLinkActive : ""}`}
                style={FALLBACK.menuLink}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className={`${styles.menuGroup} ${styles.helpGroup}`} style={FALLBACK.menuGroup}>
            <span className={styles.groupLabel} style={FALLBACK.groupLabel}>Help</span>
            {SUPPORT_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.menuLink} ${pathname === link.href ? styles.menuLinkActive : ""}`}
                style={FALLBACK.menuLink}
              >
                {link.label}
              </Link>
            ))}
          </div>
          </div>
        </div>
        {canAdvanceMenu && (
          <button
            type="button"
            className={styles.menuAdvance}
            aria-label="Show more store menu categories"
            aria-controls="store-menu-rail"
            onClick={advanceMenuRail}
          >
            <span aria-hidden="true">›</span>
          </button>
        )}
      </div>
    </nav>
  );
}
