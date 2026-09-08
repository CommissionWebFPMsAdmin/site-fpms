import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import tailwind from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/cercles": "/cercles&commissions",
    "/houzeau": "/cite-houzeau",
  },
  integrations: [
    react(),
    sitemap(),
    robotsTxt(),
  ],
  vite: {
    plugins: [tailwind()],
  },
  site: "https://fede.fpms.ac.be",
  output: "static",
  compressHTML: true,
  adapter: vercel({webAnalytics: true,
    serverOptions: {
    headers: {
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self';",
    },
  },  }),
});
