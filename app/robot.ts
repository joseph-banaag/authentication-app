import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://acme.com/sitemap.xml",
  };
}
// TODO: update this once deployed
// source here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata
