import { defineConfig } from "vite";

// Relative base so the built site works from the GitHub Pages project
// sub-path (https://cade-auragens.github.io/Car-Wash/) without hardcoding it.
export default defineConfig({
  base: "./",
  build: {
    // The hero video is ~8 MB; keep it as a copied asset rather than inlined.
    assetsInlineLimit: 4096,
    outDir: "dist",
  },
});
