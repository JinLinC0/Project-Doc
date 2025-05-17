import { defineConfig } from 'vitepress'
import nav from './nav'
import sidebar from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JinLinC个人在线文档库",
  description: "分享个人的开发学习文档",
  srcDir: "./docs/",
  base: '/Project-Doc/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    search: {
      provider: 'local'
    },
    nav,
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/JinLinC0' },
      { icon: 'gitee', link: 'https://gitee.com/jin-linchao' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present JinLinC'
    }
  }
})
