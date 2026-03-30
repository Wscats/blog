import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Wscats Blog",
  description: "Waving wild hands in the wind, writing brilliant poems",
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['meta', { name: 'author', content: 'Eno Yao' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Wscats Blog' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'JavaScript', link: '/javascript/' },
      { text: 'CSS', link: '/css/' },
      { text: 'Framework', link: '/framework/' },
      { text: 'Tools', link: '/tools/' },
      {
        text: 'GitHub',
        link: 'https://github.com/Wscats/blog',
      },
    ],

    sidebar: {
      '/javascript/': [
        {
          text: 'JavaScript',
          items: [
            { text: 'Overview', link: '/javascript/' },
            { text: 'ES6+ Features', link: '/javascript/es6' },
            { text: 'Async Programming', link: '/javascript/async' },
            { text: 'Design Patterns', link: '/javascript/patterns' },
            { text: 'Performance Tips', link: '/javascript/performance' },
          ],
        },
      ],
      '/css/': [
        {
          text: 'CSS',
          items: [
            { text: 'Overview', link: '/css/' },
            { text: 'Flexbox & Grid', link: '/css/layout' },
            { text: 'Animations', link: '/css/animations' },
            { text: 'CSS Variables', link: '/css/variables' },
          ],
        },
      ],
      '/framework/': [
        {
          text: 'Framework',
          items: [
            { text: 'Overview', link: '/framework/' },
            { text: 'Vue 3', link: '/framework/vue3' },
            { text: 'React 18', link: '/framework/react18' },
            { text: 'Virtual DOM', link: '/framework/virtual-dom' },
          ],
        },
      ],
      '/tools/': [
        {
          text: 'Tools',
          items: [
            { text: 'Overview', link: '/tools/' },
            { text: 'VSCode Extensions', link: '/tools/vscode' },
            { text: 'Build Tools', link: '/tools/build' },
            { text: 'Git Workflow', link: '/tools/git' },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search docs',
              },
              modal: {
                noResultsText: 'No results for',
                resetButtonTitle: 'Clear search',
                footer: {
                  selectText: 'to select',
                  navigateText: 'to navigate',
                },
              },
            },
          },
        },
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Wscats' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Eno Yao',
    },

    editLink: {
      pattern: 'https://github.com/Wscats/blog/edit/refactor/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    lineNumbers: true,
  },
})
