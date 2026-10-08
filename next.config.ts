import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statische export: levert een `out/` map met platte HTML/CSS/JS.
  // Nodig omdat het spel volledig client-side draait en later door Capacitor
  // als native app wordt ingepakt. Let op: hierdoor zijn API-routes en
  // server-side rendering niet beschikbaar. Zie CONCEPT.md.
  output: "export",

  // Zonder server is er geen image-optimalisatie.
  images: { unoptimized: true },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
