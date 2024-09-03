import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  title: "凹凸的个人网站",
  description: "欢迎访问凹凸的个人网站，这里分享最新的软件开发技巧、编程项目和技术文章，帮助您提升开发技能。关注我们，获取实用的实战项目、开发教程及更多技术资源",
  bundler: viteBundler(),
  base: '/personal-blog/',
  theme: recoTheme({
    logo: "/logo.png",
    author: "凹凸",
    authorAvatar: "/head.png",
    lastUpdatedText: "最后更新时间",
    docsDir: "/docs",
    autoSetBlogCategories: true,
    autoSetSeries: true,
    catalogTitle: '目录',
    commentConfig: {
      type: 'giscus',
      options: {
        lang: 'zh-CN',
        theme: 'preferred_color_scheme',
        loading: 'lazy',
        repo: 'au-to/personal-blog',
        repoId: 'R_kgDOMNxQsA',
        category: 'Announcements',
        categoryId: 'DIC_kwDOMNxQsM4ChYOx',
        mapping: 'title',
        hideComments: false,
      },
    },
    navbar: [
      { text: "首页", link: "/" },
      { text: "分类", link: "/categories/gongjulian/1.html" },
      { text: "标签", link: "/tags/gongjulian/1.html" },
      { text: "归档", link: "/timeline.html" },
      {
        text: "文档",
        children: [
          { text: "关于我", link: "/docs/introduce/myself" }
        ]
      },
      { text: "github", link: "https://github.com/au-to" }
    ]
  })
})
