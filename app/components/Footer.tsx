import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.brand}>JANE FINCH CANNABIS</div>
            <p className={styles.desc}>
              Your local cannabis dispensary at 2728 Jane St, North York. Visit
              Jane Finch Cannabis for flower, edibles, vapes, pre-rolls, cigarettes, and menu resources.
              Open: Open 24 Hours.
            </p>
            <div className={styles.buttons}>
              <a href="tel:+14375249336" className={styles.btnPrimary}>Call Now</a>
            </div>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Contact Info</h3>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Address:</span>
              <span>2728 Jane St</span>
              <span>North York, ON M3L 2G6</span>
              <span>Canada</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Phone:</span>
              <span><a href="tel:+14375249336" style={{color: "inherit"}}>+1 (437) 524-9336</a></span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Hours:</span>
              <span className={styles.highlight}>Open 24 Hours</span>
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
              <Link href="/info/north-york-weed-dispensary">North York Dispensary</Link>
              <Link href="/info/cheap-weed-north-york">Cheap Weed North York</Link>
              <Link href="/info/native-cigarettes-north-york">Native Cigarettes North York</Link>
              <Link href="/info/weed-store-near-jane-and-finch-north-york">Jane and Finch Visit Notes</Link>
              <Link href="/weed-dispensary-north-york">Jane Finch Cannabis Weed Dispensary in North York</Link>
              <Link href="/contact">Contact Us</Link>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>(c) {new Date().getFullYear()} Jane Finch Cannabis. Adults 19+ only.</p>
        </div>
      </div>
    </footer>
  );
}
