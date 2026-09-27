import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jane Finch Cannabis In-Store Flower Display",
  description: "Operational in-store flower menu display for Jane Finch Cannabis.",
  robots: { index: false, follow: false },
};

export default function TvLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
