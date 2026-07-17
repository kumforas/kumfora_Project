import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/shop",
          "/product/",
          "/about",
          "/guide",
          "/faqs",
          "/contact",
          "/feedback",
          "/press",
          "/careers",
          "/partnerships",
          "/privacy",
          "/terms",
          "/returns",
          "/shipping",
          "/cookies",
        ],
        disallow: [
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
          "/account",
          "/cart",
          "/checkout",
          "/wishlist",
          "/track",
        ],
      },
    ],
    sitemap: "https://www.kumfora.com/sitemap.xml",
  };
}
