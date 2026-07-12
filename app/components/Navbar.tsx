"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Navbar.module.css";

const FLOWER_LINKS = [
  { href: "/exotic", label: "Exotic" },
  { href: "/premium", label: "Premium" },
  { href: "/aaa", label: "AAA+" },
  { href: "/aa", label: "AA" },
  { href: "/budget", label: "Budget" },
];

const CATEGORY_LINKS = [
  { href: "/items/edibles", label: "Edibles" },
  { href: "/items/prerolls", label: "Pre-Rolls" },
  { href: "/items/vapes", label: "Nic Vape" },
  { href: "/items/vape-disposables", label: "THC Vape" },
  { href: "/items/concentrates", label: "Concentrates" },
  { href: "/items/magic", label: "Magic Stuff" },
  { href: "/items/cigarettes", label: "Cigarettes" },
  { href: "/items/add-ons", label: "Accessories" },
];

const SUPPORT_LINKS = [
  { href: "/resources", label: "Resources" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const menuLinks = [...FLOWER_LINKS, ...CATEGORY_LINKS];
  const isStoreMenuActive = menuLinks.some((link) => pathname === link.href);
  const isDeliveryActive = pathname === "/delivery";

  return (
    <nav className={styles.navbar} id="main-nav">
      <div className={styles.topBar}>
        <Link href="/" className={styles.logo}>
          <img src="/storeFavicon.webp" alt="Jane Finch Cannabis Logo" className={styles.logoMark} />
          <span className={styles.brandText}>Jane Finch Cannabis</span>
        </Link>

        <div className={styles.actionDock} aria-label="Primary navigation">
          <Link
            href="/exotic"
            className={`${styles.commandBtn} ${isStoreMenuActive ? styles.commandBtnActive : ""}`}
          >
            <span className={styles.commandTitle}>Store Menu</span>
            <span className={styles.commandMeta}>Flower + products</span>
          </Link>
          <Link
            href="/delivery"
            className={`${styles.commandBtn} ${styles.deliveryBtn} ${isDeliveryActive ? styles.commandBtnActive : ""}`}
          >
            <span className={styles.commandTitle}>Delivery</span>
            <span className={styles.commandMeta}>Coming soon</span>
          </Link>
          <span className={styles.open}>
            <span className={styles.dot}></span>
            Open Now
          </span>
        </div>
      </div>

      <div className={styles.menuRail} aria-label="Store menu categories">
        <div className={styles.menuInner}>
          <div className={styles.menuGroup}>
            <span className={styles.groupLabel}>Flower</span>
            {FLOWER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.menuLink} ${pathname === link.href ? styles.menuLinkActive : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.menuGroup}>
            <span className={styles.groupLabel}>Products</span>
            {CATEGORY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.menuLink} ${pathname === link.href ? styles.menuLinkActive : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className={`${styles.menuGroup} ${styles.helpGroup}`}>
            <span className={styles.groupLabel}>Help</span>
            {SUPPORT_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.menuLink} ${pathname === link.href ? styles.menuLinkActive : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
