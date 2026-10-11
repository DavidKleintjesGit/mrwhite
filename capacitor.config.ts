import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "online.misterwhite.game",
  appName: "Mister White",

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
      // Papier, niet inkt: het spel opent in het lichte thema, dus een
      // donker opstartscherm gaf een zwart kader dat omsloeg zodra de
      // pagina verfde.
      backgroundColor: "#f3f0e8",
      showSpinner: false,
    },
  },
};

export default config;
