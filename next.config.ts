import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: produces an `out/` folder of plain HTML/CSS/JS. The game
  // runs entirely client-side and gets wrapped by Capacitor later, which needs
  // exactly this. Note that it rules out API routes and server-side rendering.
  output: "export",

  // Write /nl as nl/index.html rather than nl.html. A web server can paper
  // over the difference with try_files, but Capacitor serves the files
  // straight from the bundle with no such fallback, so without this the
  // native app opens on a blank screen.
  trailingSlash: true,

  // Without a server there is no image optimisation.
  images: { unoptimized: true },

  // Herd proxies mrwhite.test to the dev server. Next blocks cross-origin
  // requests to dev assets by default, which silently breaks hot reload and
  // leaves the page unhydrated — every button stops responding.
  allowedDevOrigins: ["mrwhite.test", "*.mrwhite.test"],
};

export default nextConfig;
