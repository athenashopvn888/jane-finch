import type { Metadata } from "next";
import GamesContent from "./GamesContent";

export const metadata: Metadata = {
  title: "Cannabis Arcade Games — Jane Finch Cannabis | North York",
  description: "Play free online cannabis-themed games like Flappy Bud and Snake Munchies while you wait at Jane Finch Cannabis.",
  alternates: {
    canonical: "https://janefinchcannabis.ca/games",
  },
};

export default function GamesPage() {
  return <GamesContent />;
}
