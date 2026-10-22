"use client";

import { createContext, useContext } from "react";
import { SHOW_CIGARETTES } from "../lib/siteConfig";

export type CigaretteWording = {
  bannerText: string;
  promoBrands: string;
  tv2BoardTitle: string;
  wrapsTitle: string;
  tickerLine1: string;
  priceTwoPack: string;
  priceCarton: string;
  priceBelmont: string;
  priceBB2Pack: string;
};

const WORDING: CigaretteWording = {
  bannerText: "2 packs $5 mix & match · $25 carton · Shop cigarettes",
  promoBrands: "BB Full Flavor + Lights — 2 packs $5 · Marlboro & Belmont — $10/pack · Shop cigarettes",
  tv2BoardTitle: "🚬 CIGARETTES",
  wrapsTitle: "🚬 BACKWOODS",
  tickerLine1: "",
  priceTwoPack: "2 PACKS $5",
  priceCarton: "$25 CARTON",
  priceBelmont: "$10/pack",
  priceBB2Pack: "2 packs $5",
};

export type PublicCigaretteState = {
  web: boolean;
  tv: boolean;
  wording: CigaretteWording;
};

const CODED: PublicCigaretteState = {
  web: SHOW_CIGARETTES,
  tv: SHOW_CIGARETTES,
  wording: WORDING,
};

const CigaretteStateContext = createContext<PublicCigaretteState>(CODED);

export default function CigaretteStateProvider({
  value,
  children,
}: {
  value: PublicCigaretteState;
  children: React.ReactNode;
}) {
  return <CigaretteStateContext.Provider value={value}>{children}</CigaretteStateContext.Provider>;
}

export function useCigaretteState(): PublicCigaretteState {
  return useContext(CigaretteStateContext);
}
