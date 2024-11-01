import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ekka Shop",
    short_name: "Ekka Shop",
    start_url: "/",
    scope: "/",
    display: "standalone",
    theme_color: "#3474d4",
    background_color: "#3474d4",
    icons: [
      {
        sizes: "64x64",
        src: "/PWA/icon64.png",
        type: "image/png",
      },
      {
        sizes: "128x128",
        src: "/PWA/icon128.png",
        type: "image/png",
      },
      {
        sizes: "512x512",
        src: "/PWA/icon512.png",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/PWA/screenshot-wide.png",
        form_factor: "wide",
        type: "image/png",
        sizes: "1902x872",
      },
      {
        src: "/PWA/screenshot-narrow.png",
        form_factor: "narrow",
        type: "image/png",
        sizes: "425x778",
      },
    ],
  };
}
