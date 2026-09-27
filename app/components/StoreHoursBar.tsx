"use client";

import { usePathname } from "next/navigation";

/** Site-wide hours strip. In-store boards draw their own 24-hour alert. */
export default function StoreHoursBar() {
  const pathname = usePathname() || "";
  if (pathname.startsWith("/tv")) return null;

  return (
    <div className="deliveryAnnouncement" role="status" aria-label="Store hours">
      OPEN 24 HOURS
    </div>
  );
}
