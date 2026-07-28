import Image from "next/image";
import Link from "next/link";
import styles from "./DeliveryBanner.module.css";

export default function DeliveryBanner() {
  return (
    <section className={styles.section} aria-label="Jane Finch Cannabis delivery">
      <Link className={styles.link} href="/delivery" aria-label="Open the Jane Finch Cannabis delivery menu">
        <Image
          className={styles.image}
          src="/delivery/jfc-delivery-banner.webp"
          alt="Jane Finch Cannabis delivery — web orders and text-only ordering"
          width={1774}
          height={887}
          sizes="(max-width: 520px) calc(100vw - 16px), (max-width: 1488px) calc(100vw - 48px), 1440px"
          priority
        />
      </Link>
    </section>
  );
}
