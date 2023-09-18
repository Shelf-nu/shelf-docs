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
            title: 'Introduction',
            links: [
                { title: 'Getting started', href: '/docs/getting-started' },
                { title: 'Installation', href: '/docs/installation' },
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