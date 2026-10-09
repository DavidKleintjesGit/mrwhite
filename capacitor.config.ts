import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "nl.mtvtd.mrwhite",
  appName: "Mr. White",

  // The Next.js static export. Build with `npm run build` before syncing.
  webDir: "out",

  // The whole game runs from the bundle, so the app works with no network
  // at all. Nothing here may point at a remote server.
  server: {
    androidScheme: "https",
  },

  plugins: {
    SplashScreen: {
      launchShowDuration: 600,
      backgroundColor: "#0d0d0d",
      showSpinner: false,
    },
  },
};

export default config;
