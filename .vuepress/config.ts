import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  title: "凹凸的个人网站",
  description: "凹凸的个人网站",
  bundler: viteBundler(),
  theme: recoTheme({
    logo: "/logo.png",
    author: "凹凸",
    authorAvatar: "/head.png",
    lastUpdatedText: "最后更新时间",
    docsDir: "/docs",
    autoSetBlogCategories: true,
    autoSetSeries: true,
    catalogTitle: '目录',
    navbar: [
      { text: "首页", link: "/" },
      { text: "分类", link: "/categories/javaScript/1.html" },
      { text: "标签", link: "/tags/javaScript/1.html" },
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
