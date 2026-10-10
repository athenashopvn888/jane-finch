import Link from "next/link";
import styles from "./VapeActionPanel.module.css";
import { MAPS_CID_URL, PHONE_DISPLAY, PHONE_INTL } from "../lib/nap";

export default function VapeActionPanel({ compact = false }: { compact?: boolean }) {
  const message = encodeURIComponent("Hi Jane Finch Cannabis, please hold this nicotine vape/flavour if available: ");
  return (
    <aside className={styles.panel} aria-label="Nicotine vape contact options">
      <div>
        <strong>{compact ? "Confirm a nicotine vape before travelling" : "Need a nicotine vape held for pickup?"}</strong>
        <p>Adults 19+ with valid government photo ID. Nicotine is addictive. A hold is confirmed only when staff reply.</p>
      </div>
      <div className={styles.actions}>
        <a href={`tel:${PHONE_INTL}`}>Call {PHONE_DISPLAY}</a>
        <a href={MAPS_CID_URL}>Directions</a>
        <a href={`sms:${PHONE_INTL}?&body=${message}`}>Text to hold</a>
        <Link href="/vape-shop-north-york">Vape shop page</Link>
      </div>
    </aside>
  );
}
