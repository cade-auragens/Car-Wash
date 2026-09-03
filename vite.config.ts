import { defineConfig } from "vite";

// Multi-page app. Each .html file is its own route; Vercel's cleanUrls
// (see vercel.json) serves them at /plans, /locations, etc.
// base "/" because the production site is served at the domain root on Vercel.
export default defineConfig({
  base: "/",
  build: {
    assetsInlineLimit: 4096,
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "index.html",
        plans: "plans.html",
        locations: "locations.html",
        foundation: "foundation.html",
        story: "story.html",
        community: "community.html",
        contact: "contact.html",
      },
    },
  },
});
