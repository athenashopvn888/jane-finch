import Link from "next/link";
import styles from "./Footer.module.css";
import {
  CITY,
  COUNTRY,
  HOURS_LABEL,
  PHONE_DISPLAY,
  PHONE_INTL,
  POSTAL_CODE,
  SITE_ORIGIN,
  STORE_NAME,
  STREET_ADDRESS,
} from "../lib/nap";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.brand}>{STORE_NAME.toUpperCase()}</div>
            <p className={styles.desc}>
              Your local cannabis dispensary at {STREET_ADDRESS}, {CITY}. Visit
              {" "}{STORE_NAME} for flower, edibles, vapes, pre-rolls, cigarettes, and menu resources.
              {" "}Hours: {HOURS_LABEL}.
            </p>
            <div className={styles.buttons}>
              <a href={`tel:${PHONE_INTL}`} className={styles.btnPrimary}>Call Now</a>
            </div>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Contact Info</h3>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Address:</span>
              <span>{STREET_ADDRESS}</span>
              <span>{CITY}, ON {POSTAL_CODE}</span>
              <span>{COUNTRY === "CA" ? "Canada" : COUNTRY}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Phone:</span>
              <span><a href={`tel:${PHONE_INTL}`} style={{color: "inherit"}}>{PHONE_DISPLAY}</a></span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Website:</span>
              <span><a href={SITE_ORIGIN} style={{color: "inherit"}}>janefinchcannabis.ca</a></span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Hours:</span>
              <span className={styles.highlight}>{HOURS_LABEL}</span>
            </div>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <nav className={styles.links}>
              <Link href="/">Home</Link>
              <Link href="/exotic-weed">Exotic Weed</Link>
              <Link href="/premium-weed">Premium Weed</Link>
              <Link href="/aaa-weed">AAA+ Weed</Link>
              <Link href="/aa-weed">AA Weed</Link>
              <Link href="/budget-weed">Budget Weed</Link>
              <Link href="/items/edibles">Edibles</Link>
              <Link href="/items/cigarettes">Cigarettes</Link>
              <Link href="/items/vapes">Nicotine Vape</Link>
              <Link href="/info/nicotine-vapes-north-york">Nicotine Vapes North York</Link>
              <Link href="/resources">Resources</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/delivery">Delivery Menu</Link>
              <Link href="/info/cheap-weed-north-york">Cheap Weed North York</Link>
              <Link href="/info/native-cigarettes-north-york">Native Cigarettes North York</Link>
              <Link href="/weed-dispensary-north-york">Jane Finch Cannabis Weed Dispensary in North York</Link>
              <Link href="/visit">Visit Jane Finch Cannabis</Link>
              <Link href="/24-hour-dispensary-north-york">24-Hour North York FAQ</Link>
              <Link href="/contact">Contact Us</Link>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>(c) {new Date().getFullYear()} {STORE_NAME}. Adults 19+ only.</p>
        </div>
      </div>
    </footer>
  );
}
