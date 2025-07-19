---
title: Next.js上手指南
date: 2025/07/19
tags:
 - next.js
---

你可能听说过 React，那个能让我们用组件构建用户界面的强大 JavaScript 库。但当你用 React 构建一个完整的网站时，很快就会遇到一些棘手的问题：如何处理不同页面的路由？如何让网站在搜索引擎上表现更好（SEO）？如何优化首屏加载速度？

这时，**Next.js** 闪亮登场。

### **第一站：Next.js 是什么？为什么要用它？**

简单来说，**Next.js 是一个基于 React 的开源框架**。你可以把它想象成一个为 React 配备了“全套装备”的超级英雄。React 本身是核心英雄，负责构建界面的超能力，而 Next.js 则为它提供了装甲、推进器和导航系统，让它能轻松应对各种复杂任务。

**对于小白来说，选择 Next.js 的三大核心理由：**

1.  **开箱即用，无需配置：** 你不需要自己去配置 Webpack、Babel 等复杂的工具。Next.js 把这一切都做好了，让你能专注于编写应用逻辑。
2.  **颠覆性的渲染方式（提升性能和 SEO）：** 这是 Next.js 最核心的优势。传统的 React 应用（称为客户端渲染 CSR）是把一堆 JavaScript 发送到浏览器，浏览器再执行代码、渲染页面。这会导致首屏加载慢，且不利于搜索引擎抓取内容。Next.js 提供了**预渲染 (Pre-rendering)** 的能力，它可以在服务器上提前生成页面的 HTML，再发送到浏览器。这样一来：
      * **速度更快：** 用户能立刻看到页面内容，无需等待 JS 加载执行。
      * **SEO 友好：** 搜索引擎可以直接读取到完整的 HTML 内容，轻松收录你的网站。
3.  **约定优于配置的文件路由：** 你不需要安装额外的路由库。在 Next.js 中，你只需要在特定文件夹 (`app`) 中创建文件或文件夹，路由系统就自动生成了。非常直观！



### **第二站：创建你的第一个 Next.js 项目**

理论说再多，不如动手敲一遍。让我们来创建你的第一个 Next.js 应用。

**准备工作：**
确保你的电脑上安装了 [Node.js](https://nodejs.org/)（建议下载 LTS 长期支持版本）。

1.  **打开你的终端（Terminal）**
    在 Windows 上可以是 PowerShell 或 CMD，在 macOS 上是 Terminal.app。

2.  **运行创建命令**
    输入以下命令，然后按回车：

    ```bash
    npx create-next-app@latest
    ```

3.  **跟随引导进行配置**
    接下来，命令行会像一个友好的向导，问你几个问题。作为初学者，可以参考以下建议：

      * `What is your project named?` (你的项目叫什么名字？) -\> `my-first-next-app` (可以自定义)
      * `Would you like to use TypeScript?` (是否使用 TypeScript？) -\> **Yes** (强烈推荐！它能提供更好的代码提示和错误检查)
      * `Would you like to use ESLint?` (是否使用 ESLint？) -\> **Yes** (帮助你编写更规范的代码)
      * `Would you like to use Tailwind CSS?` (是否使用 Tailwind CSS？) -\> **Yes** (一个非常流行的 CSS 框架，让写样式变得简单)
      * ` Would you like to use  `src/`  directory? ` (是否使用 `src` 目录？) -\> **Yes** (将应用代码放在 `src` 目录中是更好的项目组织方式)
      * `Would you like to use App Router?` (是否使用 App Router？) -\> **Yes** (这是 Next.js 推荐的最新、最强大的功能)
      * `Would you like to customize the default import alias?` (是否自定义导入别名？) -\> **No** (保持默认即可)

    等待所有依赖安装完成。

4.  **启动你的应用**
    进入刚刚创建的项目目录并启动开发服务器：

    ```bash
    cd my-first-next-app
    npm run dev
    ```

5.  **见证奇迹！**
    在浏览器中打开 `http://localhost:3000`。



### **第三站：核心概念，一次搞懂**

现在，让我们打开项目文件夹，看看里面的结构，并理解几个最重要的概念。

#### **1. `app` 目录与文件路由**

在 `src/app` 目录下：

  * **`page.tsx` 是页面的核心文件。** `src/app/page.tsx` 就是你的网站主页（`/`）。
  * **创建文件夹就是创建路由。**
      * 想创建一个 "关于我们" 页面，URL 是 `/about`？只需在 `app` 目录下新建一个 `about` 文件夹，然后在里面创建一个 `page.tsx` 文件 (`src/app/about/page.tsx`)。
      * 想创建一个 `/blog/my-first-post` 页面？只需创建 `src/app/blog/my-first-post/page.tsx`。

**动手试试：**
在 `src/app` 下创建一个 `about` 文件夹，并在其中新建 `page.tsx` 文件，写入以下内容：

```typescript
// src/app/about/page.tsx

export default function AboutPage() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>关于我们</h1>
      <p>这是一个由 Next.js 驱动的关于页面！</p>
    </main>
  );
}
```

保存文件，然后在浏览器中访问 `http://localhost:3000/about`，看看你的新页面是不是已经出现了？

#### **2. 神奇的组件：服务端 vs. 客户端**

这是 Next.js App Router 最具革命性的概念，我们用一个简单的比喻来理解它。

想象一下你在做一道菜（渲染一个网页）：

  * **服务端组件 (Server Components)：默认选项**

      * **比喻：** 厨师在餐厅后厨就把菜做好了，直接端给客人。
      * **工作方式：** 组件的代码**只在服务器上运行**。它可以直接访问数据库、读取文件，进行各种计算。计算完成后，它生成最终的 HTML，然后发送给用户的浏览器。
      * **优点：** 用户的浏览器不需要下载和执行这部分组件的 JS 代码，所以页面加载飞快。非常适合展示静态内容，如文章标题、产品信息等。
      * **规则：** 不能使用交互功能，比如 `onClick` 事件，也不能使用 `useState`、`useEffect` 这些 React Hooks。

  * **客户端组件 (Client Components)**

      * **比喻：** 餐厅提供的是“自助火锅”。食材（JS代码）被端到客人的桌上，由客人自己动手涮（浏览器执行代码）。
      * **工作方式：** 组件的代码会发送到用户的浏览器上运行。
      * **优点：** 因为在浏览器里运行，所以它可以响应用户的交互，比如点击按钮、填写表单等。可以使用 `useState` 来管理状态。
      * **如何使用：** 你只需要在组件文件的最顶部加上一行 `"use client";` 指令，Next.js 就知道该把它作为客户端组件处理了。

**黄金法则：**
**把所有组件都先当成服务端组件。只有当你的组件需要“交互”时，才把它标记为 `"use client";`。** 尽量将交互部分拆分成最小的独立组件，以保持大部分页面仍在服务端渲染。

**代码示例：一个计数器**

```typescript
// src/app/components/Counter.tsx

"use client"; // <--- 告诉 Next.js 这是客户端组件！

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点我
      </button>
    </div>
  );
}
```

然后你可以在你的主页 (`src/app/page.tsx`) 中使用这个计数器组件。

#### **3. 链接与导航：`<Link>` 组件**

在网站中跳转页面，不要使用普通的 `<a>` 标签，因为它会导致整个页面重新加载，丢失了单页应用的流畅体验。

使用 Next.js 提供的 `<Link>` 组件。

**用法：**

```typescript
// 在 src/app/page.tsx 中修改

import Link from 'next/link';
import Counter from './components/Counter'; // 假设你创建了计数器组件

export default function HomePage() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>我的第一个 Next.js 应用</h1>
      
      {/* 使用 Link 组件进行导航 */}
      <Link href="/about">
        跳转到关于我们页面
      </Link>
      
      <div style={{ marginTop: '20px' }}>
        <Counter />
      </div>
    </main>
  );
}
```

`<Link>` 组件会在后台智能地预加载链接页面的资源，当你点击时，页面几乎是瞬时切换，体验极佳。



### **第四站：数据获取与渲染**

你的网站通常需要从外部获取数据来展示，比如博客文章列表、产品信息等。

在 Next.js 的服务端组件中，获取数据变得异常简单，就像写普通的 Node.js 代码一样。

```typescript
// src/app/posts/page.tsx
// (首先创建 posts 文件夹和 page.tsx 文件)

// 这是一个异步的服务端组件
async function PostsPage() {
  // 1. 在服务端直接 fetch 数据
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
    // next: { revalidate: 10 } // 👈 如果需要，可以开启 ISR，每10秒更新一次
  });
  const posts = await response.json();

  // 2. 在服务端渲染 JSX
  return (
    <main style={{ padding: '20px' }}>
      <h1>文章列表</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}

export default PostsPage;
```

**发生了什么？**

1.  当用户请求 `/posts` 页面时，`PostsPage` 组件在**服务器**上运行。
2.  服务器发送 `fetch` 请求，获取文章数据。
3.  服务器用获取到的数据渲染出完整的 HTML 列表。
4.  最终的 HTML 被直接发送到用户的浏览器。

这就是 **服务端渲染 (SSR)** 的过程。如果数据不经常变，Next.js 会在构建时就获取数据生成静态页面，即 **静态网站生成 (SSG)**，速度更快。你甚至可以通过 `revalidate` 选项实现 **增量静态再生 (ISR)**，让静态页面也能定期更新。作为初学者，你只需要知道，默认的数据获取方式已经为你做好了最佳的性能优化。


### **第五站：核心变革，拥抱 App Router**

自 Next.js 13 发布以来，**App Router** 已成为官方推荐的路由和应用架构方案，相较于传统的 **Pages Router**，它带来了革命性的变化。

**App Router 与 Pages Router 的核心区别:**

| 特性 | App Router (推荐) | Pages Router (旧版) |
| --- | --- | --- |
| **架构** | 基于目录的路由，`app` 目录下创建文件夹即为路由 | 基于文件的路由，`pages` 目录下创建文件即为路由 |
| **组件** | 默认使用 **React Server Components (RSC)**，实现服务端渲染 | 默认使用客户端组件 |
| **数据获取**| 可在组件层级直接使用 `async/await` | 依赖 `getServerSideProps` 或 `getStaticProps` 等特定函数 |
| **布局** | 通过 `layout.js` 文件轻松实现嵌套布局和状态保持 | 需要通过 `_app.js` 和组件嵌套实现 |
| **灵活性** | 更灵活、可组合，支持并行路由、拦截路由等高级模式 | 相对简单直接，适合小型项目 |

**为何选择 App Router？**

App Router 的设计旨在提升应用性能、降低客户端 JavaScript 负载并优化开发体验。通过默认启用服务端组件，将大部分计算和渲染工作保留在服务器，从而实现更快的页面加载速度和更优的用户体验。



#### **渲染策略：SSR, SSG, 和 ISR**

Next.js 提供了多种渲染策略，以适应不同的应用场景。

  * **服务端渲染 (SSR - Server-Side Rendering):** 每个请求都会在服务器上重新渲染页面。适用于高度动态、数据频繁变化的内容。在 `fetch` 中设置 `{ cache: 'no-store' }` 即可实现。

  * **静态网站生成 (SSG - Static Site Generation):** 在构建时生成所有页面。性能极佳，非常适合博客、文档等内容不常变的网站。这是 `fetch` 的默认行为。

  * **增量静态再生 (ISR - Incremental Static Regeneration):** SSG 的增强版。在构建时生成页面，但可以设置一个 `revalidate` 时间。当用户访问时，如果页面已过期，Next.js 会在后台重新生成页面，确保数据在一定程度上保持最新，同时不影响用户的访问速度。

<!-- end list -->

```javascript
// 在 fetch 中使用 revalidate 实现 ISR
fetch('https://api.example.com/data', { next: { revalidate: 60 } }); // 每60秒重新验证一次
```



### **第六站：高级路由技巧**

App Router 不仅简化了基础路由，还带来了一系列强大的高级路由模式。

  * **动态路由:** 通过在文件夹或文件名中使用中括号 `[]` 来创建，例如 `app/blog/[slug]/page.js`。
  * **并行路由 (Parallel Routes):** 允许你在同一个视图中同时渲染两个或多个页面，且它们可以独立导航。非常适合仪表盘 (Dashboard) 这种复杂的布局。
  * **拦截路由 (Intercepting Routes):** 可以在不离开当前页面的情况下，加载另一个路由的内容。常用于实现模态框 (Modal) 效果，例如在图片流页面点击一张图片，在当前页面以模态框形式展示图片详情。



### **第七站：API 路由与中间件**

  * **API 路由 (Route Handlers):** 在 `app` 目录下创建 `route.js` 文件，即可轻松构建后端 API 端点。它支持标准的 Web API `Request` 和 `Response` 对象。

<!-- end list -->

```javascript
// app/api/hello/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  return NextResponse.json({ message: 'Hello, World!' });
}
```

  * **中间件 (Middleware):** 中间件允许你在请求完成之前运行代码。它在 Edge Runtime 上运行，速度极快。常用于实现认证、A/B 测试、重定向等功能。在项目的根目录创建 `middleware.js` 文件即可。



### **第八站：状态管理与认证**

  * **状态管理:** 对于简单的状态，可以利用 React 的 `useState` 和 `Context` API，并将其封装在客户端组件中。对于复杂的全局状态，**Zustand** 因其简洁的 API 和对服务端渲染的良好支持而备受推崇。Redux 也可以使用，但需要进行适当的配置以避免在服务端创建全局 store。

  * **认证:** Next.js 支持多种认证模式。**NextAuth.js** 是一个功能齐全、易于集成的开源库，支持 OAuth、邮箱/密码、Magic Links 等多种认证方式。结合中间件，可以方便地保护你的路由。

-----

### **第九站：性能优化清单**

  * **善用服务端组件：** 这是最核心的性能优化手段。
  * **图片优化：** 使用 `<Image>` 组件，它能自动实现图片大小优化、格式转换 (WebP/AVIF) 和懒加载。
  * **字体优化：** 使用 `next/font` 来加载本地或 Google 字体，它可以自动优化字体文件，避免布局偏移。
  * **动态导入 (Dynamic Imports):** 使用 `next/dynamic` 按需加载组件，减小初始包体积。
  * **分析打包文件：** 使用 `@next/bundle-analyzer` 工具分析你的应用打包后的大小，找出可以优化的部分。
