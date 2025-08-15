import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the use cases data
const useCasesPath = path.join(__dirname, 'src/data/useCases.json');
const useCasesData = JSON.parse(fs.readFileSync(useCasesPath, 'utf8'));

// Extract categories for category pages
const categories = Array.from(new Set(useCasesData.useCases.map(uc => uc.category))).sort();

const generateSitemap = () => {
  const baseUrl = 'https://library.desktopcommander.app';
  const currentDate = new Date().toISOString().split('T')[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Main Pages -->
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${baseUrl}/prompts</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
`;

  // Add individual prompt URLs
  useCasesData.useCases.forEach(useCase => {
    sitemap += `    <url>
        <loc>${baseUrl}/?i=${useCase.id}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
`;
  });

  // Close the sitemap
  sitemap += `</urlset>
`;

  return sitemap;
};

// Generate and write the sitemap
const sitemapContent = generateSitemap();
const outputPath = path.join(__dirname, 'public/sitemap.xml');

fs.writeFileSync(outputPath, sitemapContent, 'utf8');

console.log(`Sitemap generated with ${useCasesData.useCases.length} individual prompt URLs`);
console.log(`Sitemap saved to: ${outputPath}`);
