// Regenerates dist/sitemap.xml with every static page plus one <url> entry
// per live product, fetched from the real production API. Runs automatically
// after `npm run build` via package.json's "postbuild" script, so a fresh
// sitemap ships with every deploy without needing a separate manual step.
//
// If the API is unreachable at build time (e.g. building offline), this
// falls back to just the static pages rather than failing the whole build —
// a stale-but-present sitemap is better than a build that can't ship at all.

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const SITE_URL = "https://meraya.co.in";
const API_URL = "https://api.meraya.co.in";
const PAGE_LIMIT = 200; // comfortably above the current catalog size per page

const STATIC_PAGES = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/products", changefreq: "daily", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.5" },
  { path: "/about-us", changefreq: "monthly", priority: "0.5" },
  { path: "/privacy-policy", changefreq: "monthly", priority: "0.3" },
  { path: "/return-policy", changefreq: "monthly", priority: "0.3" },
  { path: "/shipping-policy", changefreq: "monthly", priority: "0.3" },
  { path: "/terms-of-service", changefreq: "monthly", priority: "0.3" },
];

async function fetchAllProductSlugs() {
  const slugs = [];
  let page = 1;
  let totalPages = 1;

  do {
    const res = await fetch(`${API_URL}/get_all_products?page=${page}&limit=${PAGE_LIMIT}`);
    if (!res.ok) throw new Error(`get_all_products returned ${res.status}`);
    const data = await res.json();
    for (const product of data.products || []) {
      if (product.slug) slugs.push(product.slug);
    }
    totalPages = data.total_pages || 1;
    page += 1;
  } while (page <= totalPages);

  return slugs;
}

function buildXml(urls) {
  const entries = urls
    .map(
      ({ loc, changefreq, priority }) => `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

async function main() {
  const urls = STATIC_PAGES.map((p) => ({
    loc: `${SITE_URL}${p.path}`,
    changefreq: p.changefreq,
    priority: p.priority,
  }));

  try {
    const slugs = await fetchAllProductSlugs();
    for (const slug of slugs) {
      urls.push({
        loc: `${SITE_URL}/product/${slug}`,
        changefreq: "weekly",
        priority: "0.7",
      });
    }
    console.log(`sitemap: included ${slugs.length} product URLs`);
  } catch (err) {
    console.warn(
      `sitemap: could not fetch products from ${API_URL} (${err.message}) — writing static pages only`
    );
  }

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const outPath = resolve(__dirname, "../dist/sitemap.xml");
  await writeFile(outPath, buildXml(urls), "utf-8");
  console.log(`sitemap: wrote ${urls.length} URLs to ${outPath}`);
}

main();
