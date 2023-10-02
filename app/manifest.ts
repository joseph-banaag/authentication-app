import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Authentication application",
    short_name: "Auth-App",
    description:
      "A user log-in page with sign-in and sign-up option that can be used to another projects the needs user credentials.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0316",
    theme_color: "#0a0316",
    icons: [
      {
        src: "/assets/logo/logo.svg",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
