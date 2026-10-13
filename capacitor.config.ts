import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  // Android's application id. iOS does not use this one: its bundle
  // identifier is online.misterwhite.app, set in the Xcode project.
  // online.misterwhite.game turned out to be registered to another Apple
  // account, and an App ID is unique across all of them. The two platforms
  // keep their own identifier anyway, and Android's is already fixed by
  // what has been uploaded to Google.
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
      // iOS laat de storyboard los zodra de WebView er is, en dat is te snel
      // om te zien. De plugin houdt hem vast; Android had zijn eigen
      // opstartscherm al via het systeem.
      launchShowDuration: 1100,
      launchAutoHide: true,
      // Papier, niet inkt: het spel opent in het lichte thema, dus een
      // donker opstartscherm gaf een zwart kader dat omsloeg zodra de
      // pagina verfde.
      backgroundColor: "#f3f0e8",
      showSpinner: false,
    },
  },
};

export default config;
