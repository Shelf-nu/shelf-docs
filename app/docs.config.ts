export default {
  base: "/",
  lang: "en-US",
  title: "Shelf Docs",
  description: "Documentation for Shelf.nu repository",
  publicURL: "http://localhost:300",
  nav: [
    { text: "Docs", link: "/docs" },
    { text: "Blog", link: "/blog" },
  ],
  head: [],
  sidebar: [
    {
      title: "Documentation",
      links: [
        { title: "Getting started", href: "/docs" },
        { title: "Docker Support", href: "/docs/docker-support" },
        { title: "Shelf.config.ts", href: "/docs/shelf.config.ts" },
        { title: "Asset search", href: "/docs/asset-search" },
        { title: "Contribute", href: "/docs/contribute" },
      ],
    },
  ],
  search: {
    enabled: true,
  },
  editLink: {
    enabled: true,
    link: "https://github.com/Shelf-nu/shelf.nu",
    text: "Edit this page on GitHub",
  },
};
