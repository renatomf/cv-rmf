import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://renatomf.is-a.dev";

  return [
    {
      url: `${baseUrl}/pt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "pt-BR": `${baseUrl}/pt`,
          "en-US": `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "pt-BR": `${baseUrl}/pt`,
          "en-US": `${baseUrl}/en`,
        },
      },
    },
  ];
}