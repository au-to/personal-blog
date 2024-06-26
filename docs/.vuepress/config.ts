import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  lang: 'zh-CN',
  theme: plumeTheme({
    profile: {
      name: 'auto',
      description: '梦想是成为一名优秀的全栈',
      avatar: '/auto.jpg',
      circle: true // 是否为圆形头像
    }
  }),
  bundler: viteBundler(),
})