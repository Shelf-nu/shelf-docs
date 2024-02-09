export default {
    base: '/',
    lang: 'en-US',
    title: 'Remix Docs',
    description: 'Just playing around.',
    publicURL: 'http://localhost:300',
    nav: [
        { text: 'Docs', link: '/docs' },
        { text: 'Blog', link: '/blog' },
    ],
    head: [

    ],
    sidebar: [
        {
            title: 'Documentation',
            links: [
                { title: 'Introduction', href: '/docs' },
                { title: 'Getting started', href: '/docs/getting-started' },
                { title: 'Asset search', href: '/docs/asset-search' },
                { title: 'Contribute', href: '/docs/contribute' },
            ],
        },

    ],
    search: {
        enabled: true,
    },
    editLink: {
        enabled: true,
        link: 'https://github.com/Shelf-nu/shelf.nu',
        text: 'Edit this page on GitHub',
    },
};