import pinkyContent from "./pinkyResourceContent.json";

export type ResourceAuthor = {
  name: string;
  handle: string;
  role: string;
  type: "Person" | "Organization";
};

export type ResourceLink = {
  title: string;
  href: string;
  description: string;
};

export type ResourceCard = {
  title: string;
  href: string;
  description: string;
  category: string;
  author: string;
  updated: string;
};

export type ResourceFaq = {
  question: string;
  answer: string;
};

export type ResourcePage = {
  pageNumber: number;
  sourceHeading: string;
  route: string;
  kind: "main" | "hub" | "article" | "update";
  pageType: string;
  parentRoute: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  author: ResourceAuthor;
  datePublished: string;
  dateModified: string;
  heroImage: string;
  excerpt: string;
  body: string;
  secondTake: (ResourceAuthor & { label: string; body: string }) | null;
  linkRoutes: string[];
  childRoutes: string[];
  relatedRoutes: string[];
  commercialLinks: ResourceLink[];
  cards: ResourceCard[];
  faqs: ResourceFaq[];
};

export const SITE_URL = "https://www.janefinchcannabis.ca";
export const STORE_NAME = "Jane Finch Cannabis";
export const STORE_ROUTE = "/weed-dispensary-north-york";

const TEAM: ResourceAuthor = {
  name: "Jane Finch Cannabis Team",
  handle: "@JaneFinchCannabis",
  role: "Store Team",
  type: "Organization",
};

const MENU: ResourceAuthor = {
  name: "Jane Finch Menu Desk",
  handle: "@JaneFinchMenu",
  role: "Menu Guide",
  type: "Organization",
};

const LOCAL: ResourceAuthor = {
  name: "Jane Street Store Desk",
  handle: "@JaneFinchLocal",
  role: "Local Guide",
  type: "Organization",
};

type PageSeed = {
  route: string;
  kind: ResourcePage["kind"];
  pageType: string;
  parentRoute: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  body: string;
  author?: ResourceAuthor;
  childRoutes?: string[];
  relatedRoutes?: string[];
  commercialLinks?: ResourceLink[];
  faqs?: ResourceFaq[];
  datePublished?: string;
  dateModified?: string;
};

const menuLink = (title: string, href: string, description: string): ResourceLink => ({
  title,
  href,
  description,
});

const seeds: PageSeed[] = [
  {
    route: "/resources",
    kind: "main",
    pageType: "Resource Centre",
    parentRoute: "",
    h1: "Jane Finch Cannabis Resource Centre",
    seoTitle: "Jane Finch Cannabis Resources | North York Menu Guides",
    metaDescription: "Browse Jane Finch Cannabis guides for menu categories, flower tiers, pre-rolls, edibles, vapes, value, native smokes, specialty formats, and North York visits.",
    excerpt: "Clear routes into the Jane Finch Cannabis menu, product categories, flower tiers, and Jane Street visit information.",
    body: "Choose the section that matches what you want to browse. Each guide explains the menu structure and points back to the current category page.\n\n## Start with a category\n\nFlower, pre-rolls, edibles, vapes, value, native smokes, and specialty formats each have their own section.\n\n## Plan a Jane Street visit\n\nUse the local guide for store navigation, then use the store page for the current contact and visit details.",
    childRoutes: [
      "/resources/cannabis-101",
      "/resources/cannabis-dispensary-vs-weed-dispensary",
      "/resources/weed-flower-guides",
      "/resources/pre-roll-guides",
      "/resources/edibles-guides",
      "/resources/vape-guides",
      "/resources/value-guides",
      "/resources/local-guides",
      "/resources/native-smokes",
      "/resources/magic-mushroom-guides",
      "/resources/store-updates",
    ],
    commercialLinks: [
      menuLink("Open the store page", STORE_ROUTE, "Find Jane Finch Cannabis store and visit information."),
      menuLink("Browse the menu", "/#menu", "Open the main menu categories."),
    ],
  },
  {
    route: "/resources/cannabis-dispensary-vs-weed-dispensary",
    kind: "article",
    pageType: "Local Dispensary Guide",
    parentRoute: "/resources",
    h1: "Dispensary, Cannabis Dispensary or Weed Dispensary: Understanding the Search",
    seoTitle: "Dispensary vs Weed Dispensary | Jane Finch Cannabis North York",
    metaDescription: "What is the difference between a cannabis dispensary and weed dispensary? Jane Finch Cannabis explains the language behind local dispensary searches in North York.",
    excerpt: "Customers rarely think in exact SEO phrases. They use whichever words feel natural: cannabis, weed, cannabis store, weed dispensary, or simply dispensary. For a local business, the useful job of a website is to connect those words to one clear real-world location without forcing repetitive keyword language.",
    body: "## What Changes — and What Does Not\n\nThe wording changes, but the business a customer is trying to identify may be the same.\n\n**Cannabis dispensary** is formal and explicit.  \n**Weed dispensary** is more conversational.  \n**Cannabis store** is another common retail description.  \n**Dispensary near me** is shorter and strongly local.\n\nA useful page should explain those relationships naturally instead of repeating every exact phrase in every heading.\n\n## From Search Phrase to Real Store Information\n\nFor someone searching in North York, the terminology is only the first step. Jane Finch Cannabis should be represented as one clear local entity across the website and Business Profile.\n\nThe existing local store page remains the primary destination for visit intent. This article explains the vocabulary and then points readers toward that established local resource.",
    author: LOCAL,
    datePublished: "2026-09-04",
    dateModified: "2026-09-04",
    commercialLinks: [
      menuLink("Open the Jane Finch Cannabis local store page", STORE_ROUTE, "Use the established North York dispensary page for store and visit information."),
    ],
    faqs: [
      {
        question: "Is a weed dispensary different from a cannabis dispensary?",
        answer: "Usually the main difference is wording. Cannabis is the more formal term, while weed is common conversational language.",
      },
      {
        question: "Does “dispensary near me” include cannabis dispensaries?",
        answer: "In a cannabis-related search context, people commonly use the shorter phrase to look for a nearby cannabis dispensary.",
      },
      {
        question: "Is “cannabis store near me” related?",
        answer: "Yes. Cannabis store is another common way to describe a nearby cannabis retail business.",
      },
      {
        question: "Should every keyword variation have a separate page?",
        answer: "No. Closely related local-search phrases are generally better supported by a strong local page plus useful supporting content than by multiple thin duplicate pages.",
      },
    ],
  },
  {
    route: "/resources/cannabis-101",
    kind: "hub",
    pageType: "Menu Basics",
    parentRoute: "/resources",
    h1: "Cannabis Menu Basics",
    seoTitle: "Cannabis Menu Basics | Jane Finch Cannabis",
    metaDescription: "Learn how Jane Finch Cannabis organizes menu categories, flower tiers, product formats, weights, and listing details.",
    excerpt: "A simple starting point for reading category pages and product listings.",
    body: "A large menu is easier to use when you choose the format first. Flower, pre-rolls, edibles, vapes, concentrates, accessories, cigarettes, and specialty items belong in separate categories.\n\n## Read the whole listing\n\nCheck the product name, format, package size, listed price, and notes together.\n\n## Use tiers as navigation\n\nBudget Weed, AA Weed, AAA+ Weed, Premium Weed, and Exotic Weed are flower collections that help narrow the menu.",
    childRoutes: ["/resources/cannabis-101/how-to-read-a-cannabis-menu"],
  },
  {
    route: "/resources/weed-flower-guides",
    kind: "hub",
    pageType: "Flower Guides",
    parentRoute: "/resources",
    h1: "Jane Finch Cannabis Weed & Flower Guides",
    seoTitle: "Weed & Cannabis Flower Guides North York | Jane Finch Cannabis",
    metaDescription: "Browse Jane Finch Cannabis Weed and Cannabis Flower guides for Exotic Weed, Premium Weed, AAA+ Weed, AA Weed, and Budget Weed.",
    excerpt: "Compare Jane Finch Cannabis flower collections through clear Weed tier guides.",
    body: "Jane Finch Cannabis brings together flower guides for shoppers comparing Exotic Weed, Premium Weed, AAA+ Weed, AA Weed and Budget Weed. Explore the collections that interest you or start with the broader North York Weed selection before narrowing your browsing.\n\n## Browse one collection at a time\n\nUse each collection page to explore its selections and the product information presented with individual items.",
    childRoutes: [
      "/resources/weed-flower-guides/aa-vs-aaa-vs-premium-vs-exotic",
      "/resources/weed-flower-guides/budget-vs-premium-flower",
    ],
    commercialLinks: [
      menuLink("Explore Budget Weed", "/budget-weed", "Open the Budget Weed collection."),
      menuLink("Explore Premium Weed", "/premium-weed", "Open the Premium Weed collection."),
      menuLink("Explore Jane Finch Cannabis Weed in North York", STORE_ROUTE, "Open the broader Jane Finch Cannabis Weed page."),
    ],
  },
  {
    route: "/resources/pre-roll-guides",
    kind: "hub",
    pageType: "Pre-Roll Guides",
    parentRoute: "/resources",
    h1: "Pre-Roll Menu Guides",
    seoTitle: "Pre-Roll Menu Guides | Jane Finch Cannabis",
    metaDescription: "Use Jane Finch Cannabis pre-roll guides to compare single pre-rolls, packs, weights, and current menu details.",
    excerpt: "Understand pre-roll listing formats before opening individual products.",
    body: "Pre-roll listings may differ by pack count, weight, and item details. Read those fields together before comparing options.\n\n## Start with the format\n\nConfirm whether the listing describes one pre-roll or a pack, then compare like with like.",
    childRoutes: ["/resources/pre-roll-guides/pre-rolls-vs-flower"],
    commercialLinks: [menuLink("Browse pre-rolls", "/items/prerolls", "Open the current pre-roll category.")],
  },
  {
    route: "/resources/edibles-guides",
    kind: "hub",
    pageType: "Edibles Guides",
    parentRoute: "/resources",
    h1: "Edibles Menu and Label Guides",
    seoTitle: "Edibles Menu and Label Guides | Jane Finch Cannabis",
    metaDescription: "Browse Jane Finch Cannabis edibles by product format, package type, count, and menu label information.",
    excerpt: "Use product format and package labels to navigate the edibles category.",
    body: "The edibles category may include gummies, chocolates, beverages, baked items, and other packaged formats. The menu title identifies the item; the package label carries its product details.\n\n## Compare the same format\n\nChoose a format first, then read package type, count, and listed details together.",
    childRoutes: ["/resources/edibles-guides/how-to-read-an-edibles-menu"],
    commercialLinks: [menuLink("Browse edibles", "/items/edibles", "Open the current edibles category.")],
  },
  {
    route: "/resources/vape-guides",
    kind: "hub",
    pageType: "Vape Guides",
    parentRoute: "/resources",
    h1: "THC Vape Menu Guides",
    seoTitle: "THC Vape Menu Guides | Jane Finch Cannabis",
    metaDescription: "Browse Jane Finch Cannabis vape guides for cartridges, disposables, product formats, and category navigation.",
    excerpt: "Separate THC vape formats from nicotine-vape and flower categories.",
    body: "THC vape listings can use cartridge, disposable, and other format labels. Confirm the format before comparing names or package details.\n\n## Open the matching category\n\nTHC vapes and nicotine vapes use separate menu categories. Choose the category that matches the listing you want to browse.",
    childRoutes: ["/resources/vape-guides/thc-vapes-vs-flower"],
    commercialLinks: [
      menuLink("Browse THC vapes", "/items/vape-disposables", "Open the THC Vape category."),
      menuLink("Browse nicotine vapes", "/items/vapes", "Open the Nicotine Vape category."),
    ],
  },
  {
    route: "/resources/value-guides",
    kind: "hub",
    pageType: "Value Guides",
    parentRoute: "/resources",
    h1: "Value and Flower Price Guides",
    seoTitle: "Value and Flower Price Guides | Jane Finch Cannabis",
    metaDescription: "Compare Jane Finch Cannabis flower listings by tier, weight, package size, and posted price.",
    excerpt: "Keep price and quantity together when comparing menu listings.",
    body: "A useful price comparison includes the listed quantity, flower section, product name, and posted price.\n\n## Compare equal quantities\n\nStart inside one flower section and compare listings with the same weight before moving across tiers.",
    childRoutes: ["/resources/value-guides/how-to-compare-flower-prices"],
    commercialLinks: [menuLink("Explore Budget Weed", "/budget-weed", "Open the Budget Weed collection.")],
  },
  {
    route: "/resources/local-guides",
    kind: "hub",
    pageType: "Local Guides",
    parentRoute: "/resources",
    h1: "Jane Street and North York Visit Guides",
    seoTitle: "Jane Street North York Visit Guides | Jane Finch Cannabis",
    metaDescription: "Use Jane Finch Cannabis local guides to find the store page, menu routes, and Jane Street visit information.",
    excerpt: "Connect the store page with the right menu category before a visit.",
    body: "Start with the Jane Finch Cannabis store page for location, contact, and visit information. Then open the category that matches what you want to browse.\n\n## Keep the route simple\n\nStore page first, menu category second, individual listing third.",
    author: LOCAL,
    childRoutes: ["/resources/local-guides/weed-dispensary-in-jane-and-finch"],
    commercialLinks: [menuLink("Open the store page", STORE_ROUTE, "Review Jane Finch Cannabis visit information.")],
  },
  {
    route: "/resources/store-updates",
    kind: "hub",
    pageType: "Store Updates",
    parentRoute: "/resources",
    h1: "Jane Finch Cannabis Store Updates",
    seoTitle: "Jane Finch Cannabis Store Updates",
    metaDescription: "Read dated Jane Finch Cannabis updates about site features and shopper resources.",
    excerpt: "Dated store-site updates kept in one easy-to-find section.",
    body: "This section is reserved for useful, dated Jane Finch Cannabis site updates.\n\n## Check the date\n\nUse the store page for current visit information and this archive for dated announcements.",
    childRoutes: ["/resources/store-updates/resource-centre-launch"],
  },
  {
    route: "/resources/native-smokes",
    kind: "hub",
    pageType: "Native Smokes Guides",
    parentRoute: "/resources",
    h1: "Native Smokes Menu Guides",
    seoTitle: "Native Smokes Menu Guides | Jane Finch Cannabis",
    metaDescription: "Navigate Jane Finch Cannabis cigarette listings by brand, variety, pack or carton wording, and current menu details.",
    excerpt: "Understand cigarette menu units and move to the current category page.",
    body: "Cigarette listings can differ by brand, variety, and package unit. Use the category page to review the current menu rather than relying on a fixed list in a guide.\n\n## Check pack or carton\n\nConfirm the package unit before comparing listing details.",
    childRoutes: [
      "/resources/native-smokes/native-cigarettes-guide",
      "/resources/native-smokes/packs-vs-cartons",
    ],
    commercialLinks: [
      menuLink("Browse cigarettes", "/items/cigarettes", "Open the current cigarette category."),
      menuLink("Read the store information page", "/info/native-cigarettes-north-york", "Open the existing Native cigarettes information page."),
    ],
  },
  {
    route: "/resources/magic-mushroom-guides",
    kind: "hub",
    pageType: "Specialty Menu Guides",
    parentRoute: "/resources",
    h1: "Magic Mushroom and Specialty Menu Guides",
    seoTitle: "Magic Mushroom Menu Guides | Jane Finch Cannabis",
    metaDescription: "Navigate Magic Stuff listings by product format, package type, label wording, and current menu category.",
    excerpt: "Menu-navigation help for specialty formats and package labels.",
    body: "The Magic Stuff category can use different format and package labels. These guides explain how those labels organize the menu.\n\n## Begin with the format\n\nIdentify the listed format and package type, then use the category page for the current menu.",
    childRoutes: [
      "/resources/magic-mushroom-guides/magic-mushroom-formats-explained",
      "/resources/magic-mushroom-guides/how-to-read-a-magic-mushroom-menu",
    ],
    commercialLinks: [menuLink("Browse Magic Stuff", "/items/magic", "Open the current specialty category.")],
  },
  {
    route: "/resources/cannabis-101/how-to-read-a-cannabis-menu",
    kind: "article",
    pageType: "Menu Guide",
    parentRoute: "/resources/cannabis-101",
    h1: "How to Read a Cannabis Menu",
    seoTitle: "How to Read a Cannabis Menu | Jane Finch Cannabis",
    metaDescription: "Read a cannabis menu by choosing a category, checking format, weight, package size, posted price, and item notes.",
    excerpt: "A category-by-category method for navigating a large menu.",
    body: "Start with the product category instead of scanning every listing at once.\n\n## Choose the format\n\nOpen flower, pre-rolls, edibles, vapes, concentrates, accessories, cigarettes, or specialty items.\n\n## Read the complete line\n\nCheck product name, format, weight or package size, posted price, and item notes.\n\n## Continue with the current menu\n\nUse the category page for the newest listing details.",
  },
  {
    route: "/resources/weed-flower-guides/aa-vs-aaa-vs-premium-vs-exotic",
    kind: "article",
    pageType: "Flower Guide",
    parentRoute: "/resources/weed-flower-guides",
    h1: "AA Weed, AAA+ Weed, Premium Weed, and Exotic Weed",
    seoTitle: "AA Weed vs AAA+ Weed vs Premium Weed vs Exotic Weed | Jane Finch",
    metaDescription: "Explore how AA Weed, AAA+ Weed, Premium Weed, and Exotic Weed organize the Jane Finch Cannabis flower menu.",
    excerpt: "Use named Weed flower collections to narrow the Jane Finch Cannabis menu.",
    body: "AA Weed, AAA+ Weed, Premium Weed, and Exotic Weed are separate paths into the Jane Finch Cannabis flower menu.\n\n## Pick one collection first\n\nReview the product information presented with individual selections inside the same collection.\n\n## Move between collections when useful\n\nA tier name organizes the menu; it does not replace the details shown with each selection.",
    commercialLinks: [
      menuLink("Explore AA Weed", "/aa-weed", "Open the AA Weed collection."),
      menuLink("Explore AAA+ Weed", "/aaa-weed", "Open the AAA+ Weed collection."),
      menuLink("Explore Premium Weed", "/premium-weed", "Open the Premium Weed collection."),
      menuLink("Explore Exotic Weed", "/exotic-weed", "Open the Exotic Weed collection."),
    ],
  },
  {
    route: "/resources/weed-flower-guides/budget-vs-premium-flower",
    kind: "article",
    pageType: "Flower Guide",
    parentRoute: "/resources/weed-flower-guides",
    h1: "Budget Weed and Premium Weed: Two Starting Points",
    seoTitle: "Budget Weed vs Premium Weed | Jane Finch Cannabis",
    metaDescription: "Compare the Budget Weed and Premium Weed collections through the product information shown with Jane Finch Cannabis selections.",
    excerpt: "Two named Weed flower collections for different browsing paths.",
    body: "Budget Weed and Premium Weed are different flower collections. Start with the one that matches what you want to explore.\n\n## Browse one collection at a time\n\nReview the product information shown with individual selections before moving between collections.\n\n## Read each selection\n\nThe information presented with each product completes the menu picture.",
    commercialLinks: [
      menuLink("Explore Budget Weed", "/budget-weed", "Open the Budget Weed collection."),
      menuLink("Explore Premium Weed", "/premium-weed", "Open the Premium Weed collection."),
    ],
  },
  {
    route: "/resources/pre-roll-guides/pre-rolls-vs-flower",
    kind: "article",
    pageType: "Pre-Roll Guide",
    parentRoute: "/resources/pre-roll-guides",
    h1: "Pre-Rolls and Flower: Reading the Menu Formats",
    seoTitle: "Pre-Rolls vs Flower Menu Guide | Jane Finch",
    metaDescription: "Compare pre-roll and flower menu formats by pack count, weight, product name, and listing details.",
    excerpt: "A format-focused comparison for menu navigation.",
    body: "Flower and pre-rolls use different menu formats. Keep each category separate while reading listings.\n\n## Pre-roll listings\n\nLook for pack count, total weight, product name, and details.\n\n## Flower listings\n\nStart with the flower tier, then compare the listed weight, price, and item details.",
    commercialLinks: [
      menuLink("Browse pre-rolls", "/items/prerolls", "Open the pre-roll category."),
      menuLink("Browse flower", "/#menu", "Open the flower tier menu."),
    ],
  },
  {
    route: "/resources/edibles-guides/how-to-read-an-edibles-menu",
    kind: "article",
    pageType: "Edibles Guide",
    parentRoute: "/resources/edibles-guides",
    h1: "How to Read an Edibles Menu",
    seoTitle: "How to Read an Edibles Menu | Jane Finch Cannabis",
    metaDescription: "Navigate edible listings by product format, package type, count, flavour, and menu label details.",
    excerpt: "Category and label navigation for gummies, chocolates, beverages, and other edible formats.",
    body: "Begin by identifying the listed format: gummy, chocolate, beverage, baked item, or another packaged edible.\n\n## Check the package description\n\nRead the package type, count, flavour, and other label details shown with the listing.\n\n## Compare like with like\n\nKeep gummies with gummies and beverages with beverages when comparing menu entries.\n\n## Use the category page\n\nOpen the current edibles menu for product names and listing details.",
    commercialLinks: [menuLink("Browse edibles", "/items/edibles", "Open the current edibles category.")],
  },
  {
    route: "/resources/vape-guides/thc-vapes-vs-flower",
    kind: "article",
    pageType: "Vape Guide",
    parentRoute: "/resources/vape-guides",
    h1: "THC Vapes and Flower: Two Menu Formats",
    seoTitle: "THC Vapes vs Flower Menu Guide | Jane Finch",
    metaDescription: "Compare THC vape and flower menu formats by category, device type, weight, package, and listing details.",
    excerpt: "Keep device-format questions separate from flower-tier questions.",
    body: "THC vapes and flower belong to different menu categories.\n\n## THC vape listings\n\nIdentify cartridge, disposable, or another listed device format and read the package details.\n\n## Flower listings\n\nChoose a flower tier, then compare product name, weight, posted price, and notes.",
    commercialLinks: [
      menuLink("Browse THC vapes", "/items/vape-disposables", "Open the THC Vape category."),
      menuLink("Browse flower", "/#menu", "Open the flower tier menu."),
    ],
  },
  {
    route: "/resources/value-guides/how-to-compare-flower-prices",
    kind: "article",
    pageType: "Value Guide",
    parentRoute: "/resources/value-guides",
    h1: "How to Compare Flower Prices and Weights",
    seoTitle: "How to Compare Flower Prices | Jane Finch",
    metaDescription: "Compare flower menu listings by weight, posted price, tier, product name, and item notes.",
    excerpt: "A clear way to keep quantity and price in the same comparison.",
    body: "A price only makes sense beside the quantity attached to it.\n\n## Match the weight\n\nCompare listings that use the same quantity.\n\n## Stay inside one tier first\n\nBudget Weed selections are easiest to compare with other Budget Weed selections, and the same approach works for AA Weed, AAA+ Weed, Premium Weed, and Exotic Weed.\n\n## Read the whole listing\n\nKeep product name, weight, posted price, and notes together.",
    commercialLinks: [menuLink("Browse flower tiers", "/#menu", "Open the flower menu sections.")],
  },
  {
    route: "/resources/local-guides/weed-dispensary-in-jane-and-finch",
    kind: "article",
    pageType: "Local Visit Guide",
    parentRoute: "/resources/local-guides",
    h1: "Jane Finch Cannabis on Jane Street",
    seoTitle: "Jane Finch Cannabis Jane Street North York Guide",
    metaDescription: "Find the Jane Finch Cannabis store page, menu categories, and North York visit information.",
    excerpt: "A direct path from local store information to the menu.",
    body: "Jane Finch Cannabis has a dedicated store page for location, contact, and visit information.\n\n## Confirm the store page\n\nUse the store page before travelling.\n\n## Choose the menu category\n\nAfter confirming the store, open flower, pre-rolls, edibles, vapes, concentrates, accessories, cigarettes, or specialty items.\n\n## Keep the next click useful\n\nMove from store information to the category that matches the visit.",
    author: LOCAL,
    commercialLinks: [menuLink("Open the store page", STORE_ROUTE, "Review Jane Finch Cannabis visit information.")],
  },
  {
    route: "/resources/native-smokes/native-cigarettes-guide",
    kind: "article",
    pageType: "Native Smokes Guide",
    parentRoute: "/resources/native-smokes",
    h1: "Native Cigarette Menu Guide for North York",
    seoTitle: "Native Cigarette Menu Guide | Jane Finch Cannabis",
    metaDescription: "Navigate cigarette listings by brand, variety, pack or carton wording, package quantity, and current menu details.",
    excerpt: "A menu-navigation guide for cigarette categories and package units.",
    body: "Use the cigarette category to review the current brand and variety listings. This guide does not freeze a product list or price.\n\n## Check the package unit\n\nConfirm whether the listing describes a pack or a carton.\n\n## Read the complete listing\n\nLook for brand, variety, package unit, quantity, and posted price.\n\n## Return to the menu\n\nUse the current category page when a specific listing matters.",
    commercialLinks: [
      menuLink("Browse cigarettes", "/items/cigarettes", "Open the current cigarette category."),
      menuLink("Open Native cigarettes information", "/info/native-cigarettes-north-york", "Read the existing store information page."),
    ],
  },
  {
    route: "/resources/native-smokes/packs-vs-cartons",
    kind: "article",
    pageType: "Native Smokes Guide",
    parentRoute: "/resources/native-smokes",
    h1: "Cigarette Packs and Cartons on the Menu",
    seoTitle: "Cigarette Packs vs Cartons Menu Guide | Jane Finch",
    metaDescription: "Understand pack and carton wording as cigarette menu units and compare listings using the same package type.",
    excerpt: "A simple guide to package-unit wording.",
    body: "A pack and a carton are different menu units. Read the package type beside the quantity and posted price.\n\n## Pack listings\n\nA pack listing describes an individual retail pack.\n\n## Carton listings\n\nA carton listing describes a larger package containing multiple packs.\n\n## Compare the same unit\n\nKeep pack listings with packs and carton listings with cartons when comparing menu details.",
    commercialLinks: [menuLink("Browse cigarettes", "/items/cigarettes", "Open the current cigarette category.")],
  },
  {
    route: "/resources/magic-mushroom-guides/magic-mushroom-formats-explained",
    kind: "article",
    pageType: "Specialty Menu Guide",
    parentRoute: "/resources/magic-mushroom-guides",
    h1: "Magic Mushroom Formats on a Specialty Menu",
    seoTitle: "Magic Mushroom Menu Formats | Jane Finch",
    metaDescription: "Understand how dried items, chocolates, gummies, capsules, and other specialty formats may be labelled on a menu.",
    excerpt: "A format-and-label guide for the Magic Stuff category.",
    body: "Specialty menus may group items by format. The format tells shoppers how the listing is organized.\n\n## Dried items\n\nListings may show a product name, package weight, and label notes.\n\n## Chocolates and gummies\n\nListings may show package type, piece count, and label wording.\n\n## Capsules and other formats\n\nUse the product title and package description to identify the format.\n\n## Open the category\n\nUse the Magic Stuff menu for the current set of listings.",
    commercialLinks: [menuLink("Browse Magic Stuff", "/items/magic", "Open the specialty category.")],
  },
  {
    route: "/resources/magic-mushroom-guides/how-to-read-a-magic-mushroom-menu",
    kind: "article",
    pageType: "Specialty Menu Guide",
    parentRoute: "/resources/magic-mushroom-guides",
    h1: "How to Read a Magic Mushroom Menu",
    seoTitle: "How to Read a Magic Mushroom Menu | Jane Finch",
    metaDescription: "Navigate specialty listings by product name, format, package type, amount wording, and label notes.",
    excerpt: "A menu-navigation guide for specialty product labels.",
    body: "Read a specialty listing in layers: product name, format, package type, amount wording, and label notes.\n\n## Identify the format\n\nLook for dried item, chocolate, gummy, capsule, beverage, or another listed format.\n\n## Read amount wording carefully\n\nA number may describe package weight, piece count, or another label field. Use the listing wording as written.\n\n## Keep the question specific\n\nIf the package description is unclear, ask which field the listed number describes.",
    commercialLinks: [menuLink("Browse Magic Stuff", "/items/magic", "Open the specialty category.")],
  },
  {
    route: "/resources/store-updates/resource-centre-launch",
    kind: "update",
    pageType: "Store Update",
    parentRoute: "/resources/store-updates",
    h1: "Jane Finch Cannabis Resource Centre Launch",
    seoTitle: "Jane Finch Cannabis Resource Centre Launch",
    metaDescription: "Read about the Jane Finch Cannabis Resource Centre and its menu, category, and North York visit guides.",
    excerpt: "A new home for practical menu and visit guides.",
    body: "Jane Finch Cannabis now has a Resource Centre that groups practical guides by topic.\n\n## What the section covers\n\nThe first set includes menu basics, flower, pre-rolls, edibles, vapes, value, local visits, native smokes, specialty formats, and store updates.\n\n## Where to begin\n\nOpen the Resource Centre and choose the section that matches what you want to browse.",
  },
];

export const RESOURCE_ROUTE_LABELS: Record<string, string> = {
  "/": "Home",
  [STORE_ROUTE]: "Jane Finch Cannabis store page",
  "/#menu": "Menu",
  "/budget-weed": "Budget Weed",
  "/aa-weed": "AA Weed",
  "/aaa-weed": "AAA+ Weed",
  "/premium-weed": "Premium Weed",
  "/exotic-weed": "Exotic Weed",
  "/items/prerolls": "Pre-rolls",
  "/items/edibles": "Edibles",
  "/items/vapes": "Nicotine Vape",
  "/items/vape-disposables": "THC Vape",
  "/items/cigarettes": "Cigarettes",
  "/items/magic": "Magic Stuff",
  "/info/native-cigarettes-north-york": "Native cigarettes information",
  ...Object.fromEntries(seeds.map((page) => [page.route, page.h1])),
  ...Object.fromEntries(pinkyContent.pages.map((page) => [page.route, page.h1])),
};

const PUBLISHED = "2026-07-15";

const originalPages: ResourcePage[] = seeds.map((seed, index) => ({
  pageNumber: index + 1,
  sourceHeading: seed.pageType,
  route: seed.route,
  kind: seed.kind,
  pageType: seed.pageType,
  parentRoute: seed.parentRoute,
  h1: seed.h1,
  seoTitle: seed.seoTitle,
  metaDescription: seed.metaDescription,
  primaryKeyword: seed.h1,
  supportingKeywords: [],
  author: seed.author || (seed.kind === "article" ? MENU : TEAM),
  datePublished: seed.datePublished || PUBLISHED,
  dateModified: seed.dateModified || PUBLISHED,
  heroImage: "/storeFavicon.webp",
  excerpt: seed.excerpt,
  body: seed.body,
  secondTake: null,
  linkRoutes: seed.commercialLinks?.map((link) => link.href) || [],
  childRoutes: seed.childRoutes || [],
  relatedRoutes: seed.relatedRoutes || [],
  commercialLinks: seed.commercialLinks || [],
  cards: [],
  faqs: seed.faqs || [],
}));

const contentByRoute = new Map(pinkyContent.pages.map((page) => [page.route, page]));
const supportByRoute = pinkyContent.support as Record<string, { appendBody?: string; addLinks?: string[]; dateModified?: string }>;

function withPinkyContent(page: ResourcePage): ResourcePage {
  const approved = contentByRoute.get(page.route);
  const support = supportByRoute[page.route];
  const hubAppend = page.route === "/resources" ? pinkyContent.hub.appendBody : "";
  const appendBody = [hubAppend, support?.appendBody].filter(Boolean).join("\n\n");
  const addedLinks = support?.addLinks || [];
  return {
    ...page,
    ...(approved
      ? {
          h1: approved.h1,
          seoTitle: approved.seoTitle,
          metaDescription: approved.metaDescription,
          excerpt: approved.excerpt,
          body: approved.body,
          faqs: approved.faqs,
          commercialLinks: approved.commercialLinks,
          linkRoutes: approved.commercialLinks.map((link) => link.href),
          dateModified: approved.dateModified,
        }
      : {}),
    body: approved?.body || [page.body, appendBody].filter(Boolean).join("\n\n"),
    dateModified: approved?.dateModified || support?.dateModified || (hubAppend ? pinkyContent.hub.dateModified : page.dateModified),
    commercialLinks: [
      ...(approved?.commercialLinks || page.commercialLinks),
      ...addedLinks.map((href) => menuLink(RESOURCE_ROUTE_LABELS[href] || "Open the current Resource Centre", href, `Continue to ${RESOURCE_ROUTE_LABELS[href] || "the current Resource Centre"}.`)),
    ],
    linkRoutes: [...new Set([...(approved?.commercialLinks || page.commercialLinks).map((link) => link.href), ...addedLinks])],
  };
}

const expandedPages = originalPages.map(withPinkyContent);
const newPages: ResourcePage[] = pinkyContent.pages
  .filter((page) => page.action === "NEW")
  .map((page, index) => ({
    pageNumber: originalPages.length + index + 1,
    sourceHeading: page.pageType,
    route: page.route,
    kind: "article",
    pageType: page.pageType,
    parentRoute: page.parentRoute,
    h1: page.h1,
    seoTitle: page.seoTitle,
    metaDescription: page.metaDescription,
    primaryKeyword: page.h1,
    supportingKeywords: [],
    author: MENU,
    datePublished: page.datePublished || "2026-09-06",
    dateModified: page.dateModified,
    heroImage: "/storeFavicon.webp",
    excerpt: page.excerpt,
    body: page.body,
    secondTake: null,
    linkRoutes: page.commercialLinks.map((link) => link.href),
    childRoutes: [],
    relatedRoutes: [],
    commercialLinks: page.commercialLinks,
    cards: [],
    faqs: page.faqs,
  }));

const basePages: ResourcePage[] = [...expandedPages, ...newPages].map((page) => {
  if (page.route === "/resources/cannabis-101") {
    return { ...page, childRoutes: [...new Set([...page.childRoutes, ...newPages.filter((child) => child.parentRoute === page.route).map((child) => child.route)])] };
  }
  if (page.route === "/resources/weed-flower-guides") {
    return { ...page, childRoutes: [...new Set([...page.childRoutes, ...newPages.filter((child) => child.parentRoute === page.route).map((child) => child.route)])] };
  }
  if (page.route === "/resources/local-guides") {
    return { ...page, childRoutes: [...new Set([...page.childRoutes, "/resources/local-guides/weed-dispensary-in-jane-and-finch"])] };
  }
  return page;
});

export const RESOURCE_PAGES: ResourcePage[] = basePages.map((page) => ({
  ...page,
  cards: page.childRoutes
    .map((route) => basePages.find((candidate) => candidate.route === route))
    .filter((child): child is ResourcePage => Boolean(child))
    .map((child) => ({
      title: child.h1,
      href: child.route,
      description: child.excerpt,
      category: child.pageType,
      author: child.author.name,
      updated: child.dateModified,
    })),
}));

export const RESOURCE_PATHS = RESOURCE_PAGES.map((page) => page.route);

export function normalizeResourceRoute(route: string) {
  return route.length > 1 ? route.replace(/\/$/, "") : route;
}

export function getResourcePageByRoute(route: string) {
  const normalized = normalizeResourceRoute(route);
  return RESOURCE_PAGES.find((page) => page.route === normalized);
}

export function getResourcePageBySlugParts(parts: string[]) {
  const route = `/resources/${parts.join("/")}`;
  return RESOURCE_PAGES.find((page) => page.route === route);
}

export function getResourceStaticParams() {
  return RESOURCE_PAGES.filter((page) => page.route !== "/resources").map((page) => ({
    slug: page.route.replace(/^\/resources\//, "").split("/"),
  }));
}

export function getResourceChildren(page: ResourcePage) {
  return page.childRoutes
    .map((route) => getResourcePageByRoute(route))
    .filter((child): child is ResourcePage => Boolean(child));
}

export function resourceCanonical(page: ResourcePage) {
  return `${SITE_URL}${page.route}`;
}
