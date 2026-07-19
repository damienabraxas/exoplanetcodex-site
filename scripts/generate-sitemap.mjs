import { readdir, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(scriptDirectory, "..");
const origin = "https://exoplanetcodex.org";
const excludedDirectories = new Set([".git", "assets", "docs", "scripts"]);

const findHtmlFiles = async (directory) => {
  const entries = await readdir(directory);
  const files = [];

  for (const entry of entries) {
    if (excludedDirectories.has(entry)) continue;
    const absolutePath = join(directory, entry);
    const details = await stat(absolutePath);

    if (details.isDirectory()) files.push(...await findHtmlFiles(absolutePath));
    if (details.isFile() && entry.endsWith(".html")) files.push(absolutePath);
  }

  return files;
};

const urlForFile = (file) => {
  const path = relative(siteRoot, file).split(sep).join("/");
  if (path === "index.html") return `${origin}/`;
  if (path.endsWith("/index.html")) return `${origin}/${path.slice(0, -"index.html".length)}`;
  return `${origin}/${path}`;
};

const files = await findHtmlFiles(siteRoot);
const urls = [...new Set(files.map(urlForFile))]
  .filter((url) => ![
    `${origin}/confirmed/`,
    `${origin}/roadmap.html`,
  ].includes(url))
  .sort((first, second) => first.localeCompare(second));

const entries = urls.map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`).join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

await writeFile(resolve(siteRoot, "sitemap.xml"), sitemap);
console.log(`Wrote sitemap.xml with ${urls.length} canonical page URLs.`);
