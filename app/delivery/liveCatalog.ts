import menu from "./delivery-menu.json";
import type { Product } from "./DeliveryCatalog";

const CATALOG_URL = "https://milestone-1-demo.vercel.app/api/catalog?store=JFC";

const bundledProducts = menu.products as Product[];

export type DeliveryCatalogResult = {
  products: Product[];
  live: boolean;
};

function bundledCatalog(): DeliveryCatalogResult {
  return { products: bundledProducts, live: false };
}

function isLiveCatalog(products: unknown): products is Product[] {
  return Array.isArray(products)
    && products.length >= 50
    && products.every((product) => {
      if (!product || typeof product !== "object") return false;
      const item = product as Partial<Product>;
      return Boolean(item.publicProductId) && Boolean(item.tier) && Array.isArray(item.images);
    });
}

/**
 * Server fetch sends no Origin header, so the SOD apex-Origin allowlist does not apply.
 * Browsers on https://janefinchcannabis.ca still get 403 if they call SOD directly.
 */
export async function getDeliveryProducts(): Promise<DeliveryCatalogResult> {
  try {
    const response = await fetch(CATALOG_URL, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.warn(`[delivery] SOD catalog HTTP ${response.status}; using bundled menu.`);
      return bundledCatalog();
    }

    const payload: unknown = await response.json();
    const products = payload && typeof payload === "object" && "products" in payload
      ? (payload as { products?: unknown }).products
      : undefined;
    if (!isLiveCatalog(products)) {
      console.warn("[delivery] SOD catalog rejected; using bundled menu.");
      return bundledCatalog();
    }

    return { products, live: true };
  } catch (error) {
    console.warn("[delivery] SOD catalog fetch failed; using bundled menu.", error);
    return bundledCatalog();
  }
}
