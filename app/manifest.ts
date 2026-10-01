import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Luxury Real Estate",
    short_name: "Real Estate",
    description: "Explore our exclusive collection of luxury real estate properties.",
    start_url: "/",
    display: "standalone",
    background_color: "#0C0C0C",
    theme_color: "#0C0C0C",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
