export interface TierSeoData {
  seoTitle: string;
  seoIntro: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

const OTHER_TIERS: Record<string, string> = {
  EXOTIC: "Premium Weed, AAA+ Weed, AA Weed and Budget Weed",
  PREMIUM: "Exotic Weed, AAA+ Weed, AA Weed and Budget Weed",
  "AAA+": "Exotic Weed, Premium Weed, AA Weed and Budget Weed",
  AA: "Exotic Weed, Premium Weed, AAA+ Weed and Budget Weed",
  BUDGET: "Exotic Weed, Premium Weed, AAA+ Weed and AA Weed",
};

function createTierSeo(key: string, name: string): TierSeoData {
  return {
    seoTitle: `${name} in North York | Jane Finch Cannabis`,
    seoIntro: `Jane Finch Cannabis brings ${name} together as one of its Cannabis Flower collections for shoppers exploring flower in North York. Browse the selections presented in this collection and compare them with other Jane Finch flower tiers that interest you.`,
    sections: [
      {
        heading: `Explore ${name} at Jane Finch Cannabis`,
        body: `Browse the Cannabis Flower selections presented within ${name} and use the product information shown with individual items as you explore.`,
      },
      {
        heading: `Compare ${name} with Other Flower Collections`,
        body: `Jane Finch Cannabis also offers ${OTHER_TIERS[key]} for shoppers who want to explore different parts of the flower selection.`,
      },
      {
        heading: "Continue with Jane Finch Cannabis in North York",
        body: "Use the dedicated Jane Finch Cannabis Weed page for broader store information, then return to the flower collection that matches your browsing.",
      },
    ],
    faqs: [
      {
        q: `How can shoppers explore ${name}?`,
        a: `Open the ${name} collection and review the product information shown with each selection.`,
      },
      {
        q: `Can shoppers compare ${name} with other flower collections?`,
        a: `Yes. Jane Finch Cannabis keeps ${name} and the other named flower collections on separate browsing routes.`,
      },
      {
        q: "Where can shoppers find broader store information?",
        a: "Use the dedicated Jane Finch Cannabis Weed page for broader North York store information.",
      },
    ],
  };
}

export const TIER_SEO: Record<string, TierSeoData> = {
  EXOTIC: createTierSeo("EXOTIC", "Exotic Weed"),
  PREMIUM: createTierSeo("PREMIUM", "Premium Weed"),
  "AAA+": createTierSeo("AAA+", "AAA+ Weed"),
  AA: createTierSeo("AA", "AA Weed"),
  BUDGET: createTierSeo("BUDGET", "Budget Weed"),
};
