import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'
// import { webpackBundler } from '@vuepress/bundler-webpack'

export default defineUserConfig({
  title: "凹凸的个人网站",
  description: "Just playing around",
  bundler: viteBundler(),
  // bundler: webpackBundler(),
  theme: recoTheme({
    // style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "凹凸",
    authorAvatar: "/head.png",
    docsRepo: "https://github.com/au-to",
    lastUpdatedText: "",
    // docsBranch: "main", //文档所在的git分支
    // docsDir: "example", //文档在仓库中的目录
    // 定义侧边栏结构
    series: {
      "/docs/theme-reco/": [
        {
          text: "module one",
          children: ["home", "theme"],
        },
        {
          text: "module two",
          children: ["api", "plugin"],
        },
      ],
    },
    // 导航栏
    navbar: [
      { text: "首页", link: "/" },
      { text: "分类", link: "/categories/reco/1/" },
      { text: "标签", link: "/tags/tag1/1/" },
      {
        text: "文档",
        children: [
          { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
          { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
        ],
      },
    ],
    // 公告
    // bulletin: {
    //   body: [
    //     {
    //       type: "text",
    //       content: `我是凹凸`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "QQ 群",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li>QQ群1：1037296104</li>
    //         <li>QQ群2：1061561395</li>
    //         <li>QQ群3：962687802</li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "GitHub",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "buttongroup",
    //       children: [
    //         {
    //           text: "打赏",
    //           link: "/docs/others/donate.html",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // 评论
    // commentConfig: {
    //   type: 'valine',
    //   options: {
    //     appId: 'xxx',
    //     appKey: 'xxx',
    //     placeholder: '填写邮箱可以收到回复提醒哦！',
    //     verify: true, // 验证码服务
    //     notify: true,
    //     recordIP: true,
    //     hideComments: true // 隐藏评论
    //   },
    // },
  }),
  // debug: true,
});
