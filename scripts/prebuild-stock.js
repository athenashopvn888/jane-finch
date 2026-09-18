/**
 * Prebuild script: Fetches live stock data from Apps Script
 * and writes flowers.json + items.json before Next.js builds.
 *
 * This runs automatically via "prebuild" in package.json.
 * If the fetch fails, the existing JSON files are kept as fallback.
 *
 * Preferred path: ?store=JFC01&stock=1 + ?store=JFC01&catalog=1
 * Fallback: combined ?store=JFC01 (catalog already filtered by ONHAND)
 */

const fs = require('fs');
const path = require('path');

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || '';
const STORE_CODE = 'JFC01';
const FETCH_TIMEOUT_MS = 120000;
const FLOWERS_PATH = path.join(__dirname, '..', 'app', 'lib', 'flowers.json');
const ITEMS_PATH = path.join(__dirname, '..', 'app', 'lib', 'items.json');
const SNAPSHOT_PATH = path.join(__dirname, '..', 'app', 'lib', 'stock-snapshot.json');

async function fetchJson(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText} (${url})`);
  }
  return res.json();
}

function mergeCatalogWithStock(catalog, stockData) {
  const stock = (stockData && stockData.stock) || {};
  const flowers = [];

  for (const flower of catalog.flowers || []) {
    const sku = String(flower.sku);
    const skuStock = stock[sku];
    if (stockData && !skuStock) continue;

    const next = { ...flower };
    if (skuStock) {
      if (!skuStock['3g'] || skuStock['3g'] <= 0) next.price3g = null;
      if (!skuStock['5g'] || skuStock['5g'] <= 0) next.price5g = null;
      if (!skuStock['14g'] || skuStock['14g'] <= 0) next.price14g = null;
      if (!skuStock['28g'] || skuStock['28g'] <= 0) next.price28g = null;
    }

    if (!next.price3g && !next.price5g && !next.price14g && !next.price28g) continue;
    flowers.push(next);
  }

  const items = [];
  for (const item of catalog.items || []) {
    const skus = String(item.sku || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const inStock = !stockData || skus.some((sku) => stock[sku]);
    if (!inStock) continue;
    items.push(item);
  }

  return { flowers, items };
}

async function loadLiveProducts() {
  const stockUrl = `${APPS_SCRIPT_URL}?store=${STORE_CODE}&stock=1`;
  console.log(`[prebuild] Fetching ONHAND stock: ${stockUrl}`);
  const stockData = await fetchJson(stockUrl);
  if (!stockData || !stockData.stock) {
    throw new Error('Invalid stock=1 response: missing stock');
  }
  console.log(`[prebuild] ONHAND ${stockData.storeCode || STORE_CODE} ${stockData.date || 'unknown'} (${stockData.skuCount || Object.keys(stockData.stock).length} SKUs)`);

  try {
    const catalogUrl = `${APPS_SCRIPT_URL}?store=${STORE_CODE}&catalog=1`;
    console.log(`[prebuild] Fetching catalog: ${catalogUrl}`);
    const catalog = await fetchJson(catalogUrl);
    if (!catalog.flowers || !catalog.items) {
      throw new Error('Invalid catalog=1 response: missing flowers or items');
    }
    const merged = mergeCatalogWithStock(catalog, stockData);
    return {
      flowers: merged.flowers,
      items: merged.items,
      storeCode: stockData.storeCode || STORE_CODE,
      stockDate: stockData.date || null,
      skuCount: stockData.skuCount || Object.keys(stockData.stock).length,
      source: 'stock=1+catalog=1',
    };
  } catch (err) {
    console.warn(`[prebuild] catalog=1 merge failed: ${err.message}`);
    console.warn('[prebuild] Falling back to combined ?store=JFC01');
    const combined = await fetchJson(`${APPS_SCRIPT_URL}?store=${STORE_CODE}`);
    if (!combined.flowers || !combined.items) {
      throw new Error('Invalid combined response: missing flowers or items');
    }
    return {
      flowers: combined.flowers,
      items: combined.items,
      storeCode: combined.storeCode || stockData.storeCode || STORE_CODE,
      stockDate: combined.stockDate || stockData.date || null,
      skuCount: stockData.skuCount || Object.keys(stockData.stock).length,
      source: 'combined?store=JFC01',
    };
  }
}

async function main() {
  if (!APPS_SCRIPT_URL) {
    console.log('[prebuild] No APPS_SCRIPT_URL set — using existing static JSON files');
    return;
  }

  console.log('[prebuild] Fetching live stock from Apps Script...');

  try {
    const data = await loadLiveProducts();

    if (!data.flowers || !data.items) {
      throw new Error('Invalid response: missing flowers or items');
    }

    // ── Post-process flowers: derive sale flags + clean names ──
    const SALE_RE = /\bSALE\b/i;
    const ON_SALE_RE = /ON\s*SALE/i;
    function hasSalePrice(f) {
      return !!(
        (f.price3g && f.price3g.sale !== null) ||
        (f.price5g && f.price5g.sale !== null) ||
        (f.price14g && f.price14g.sale !== null) ||
        (f.price28g && f.price28g.sale !== null)
      );
    }
    function cleanName(name) {
      return name
        .replace(/\s*\(?\s*AAA\+?\s*ON\s*SALE\s*\)?\s*$/i, '')
        .replace(/\s*\(?\s*AAA\+?\s*SALE!?\s*\)?\s*$/i, '')
        .replace(/\s*\bSALE!?\s*$/i, '')
        .replace(/\s*\bON\s*SALE\s*$/i, '')
        .trim();
    }
    let saleFixed = 0;
    for (const f of data.flowers) {
      // Derive isSale from name or prices
      if (!f.isSale) {
        if (SALE_RE.test(f.name) || ON_SALE_RE.test(f.name) || hasSalePrice(f)) {
          f.isSale = true;
          saleFixed++;
        }
      }
      // Clean display name
      f.name = cleanName(f.name);
    }
    if (saleFixed > 0) console.log(`[prebuild] Fixed ${saleFixed} sale flags from names`);

    // Write flowers.json
    fs.writeFileSync(FLOWERS_PATH, JSON.stringify(data.flowers, null, 2), 'utf-8');
    console.log(`[prebuild] flowers.json updated: ${data.flowers.length} products`);

    // Tier breakdown
    const tiers = {};
    data.flowers.forEach(f => { tiers[f.tier] = (tiers[f.tier] || 0) + 1; });
    Object.entries(tiers).forEach(([t, c]) => console.log(`  ${t}: ${c}`));

    // ── Post-process items: fix '$[object Object]' prices ──
    let itemsFixed = 0;
    for (const it of data.items) {
      if (typeof it.price === 'string' && it.price.includes('[object')) {
        // Price was mangled by parsePriceCell_ returning an object
        // Try to extract from the raw price data
        it.price = '';
        itemsFixed++;
      }
    }
    if (itemsFixed > 0) console.log(`[prebuild] Fixed ${itemsFixed} mangled item prices`);

    // Write items.json
    fs.writeFileSync(ITEMS_PATH, JSON.stringify(data.items, null, 2), 'utf-8');
    console.log(`[prebuild] items.json updated: ${data.items.length} products`);

    // Category breakdown
    const cats = {};
    data.items.forEach(i => { cats[i.category] = (cats[i.category] || 0) + 1; });
    Object.entries(cats).sort().forEach(([c, n]) => console.log(`  ${c}: ${n}`));

    const snapshot = {
      storeCode: data.storeCode || STORE_CODE,
      stockDate: data.stockDate || null,
      skuCount: data.skuCount || null,
      flowerCount: data.flowers.length,
      itemCount: data.items.length,
      source: data.source || null,
    };
    fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2) + '\n', 'utf-8');
    console.log(`[prebuild] stock-snapshot.json written`);

    console.log(`[prebuild] Stock date: ${data.stockDate || 'unknown'}`);
    console.log('[prebuild] Done!');

  } catch (err) {
    console.warn(`[prebuild] Live fetch failed: ${err.message}`);
    console.warn('[prebuild] Keeping existing JSON files as fallback');
  }
}

main();
