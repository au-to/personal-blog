import{_ as s,c as a,a as e,o as l}from"./app-DGW7XSyZ.js";const i={};function t(p,n){return l(),a("div",null,n[0]||(n[0]=[e(`<p>随着现代软件开发的快速迭代，如何保证代码的质量、减少部署错误、并提高团队的开发效率，成为了每个团队面临的挑战。CI/CD（持续集成与持续交付/部署）正是解决这些问题的有效方案。本文将介绍 CI/CD 的概念及其在前端开发中的应用，并展示如何初步搭建一个简单的 CI/CD 流水线。</p><h2 id="什么是-ci-cd" tabindex="-1"><a class="header-anchor" href="#什么是-ci-cd"><span>什么是 CI/CD</span></a></h2><p><strong>持续集成（CI）</strong><br> 持续集成是一种软件开发实践，开发者可以频繁地将代码提交到代码库，并且每次提交后都会通过自动化测试和构建工具，验证代码的质量和兼容性。这种方式确保了团队成员之间的协作更加顺畅，减少了“集成地狱”的风险。</p><p><strong>持续交付/持续部署（CD）</strong><br> 持续交付是将持续集成扩展到部署阶段。每次通过测试的构建都会准备好部署到生产环境，但通常还需要手动批准。而持续部署则是完全自动化的，只要代码通过所有测试，就会自动部署到生产环境。</p><p>CI/CD 能让开发流程更加平稳，减少了人工操作带来的错误，提高了发布速度。</p><h2 id="为什么前端开发也需要-ci-cd" tabindex="-1"><a class="header-anchor" href="#为什么前端开发也需要-ci-cd"><span>为什么前端开发也需要 CI/CD</span></a></h2><p>虽然 CI/CD 最初多应用于后端服务，但前端开发同样能从中受益：</p><ul><li>自动化测试：每次代码提交后，自动运行测试，确保新代码没有破坏已有功能。</li><li>自动化构建：自动将代码打包、压缩和优化，减少手动操作的麻烦。</li><li>一致的部署流程：将代码发布到不同环境（如测试环境、生产环境）完全自动化，减少人为错误。</li><li>提高协作效率：团队成员可以频繁提交代码，不用担心集成过程中出现冲突或错误。</li></ul><h2 id="如何搭建一个简单的前端-ci-cd-流水线" tabindex="-1"><a class="header-anchor" href="#如何搭建一个简单的前端-ci-cd-流水线"><span>如何搭建一个简单的前端 CI/CD 流水线</span></a></h2><p>接下来我们将以一个 React 应用为例，逐步介绍如何搭建一个简单的 CI/CD 流水线。</p><p><strong>1. 设置代码仓库</strong><br> 首先，我们需要一个代码仓库来管理代码。使用 Git 是最常见的选择，这里以 GitHub 为例：</p><ol><li>在 GitHub 上创建一个新的仓库。</li><li>将本地的 React 项目 push 到这个仓库。</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">git</span> init</span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;Initial commit&quot;</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token function">add</span> origin <span class="token operator">&lt;</span>你的GitHub仓库地址<span class="token operator">&gt;</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-u</span> origin master</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 配置 CI 工具</strong><br> GitHub 提供了内置的 CI 工具——GitHub Actions。它可以在每次代码提交或合并请求时自动运行测试、打包项目。</p><ol><li>在项目根目录下创建 .github/workflows/ci.yml 文件。</li><li>配置 GitHub Actions 的工作流，以下是一个简单的示例：</li></ol><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> CI</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">push</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> master</span>
<span class="line">  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> master</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">build</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line"></span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout repository</span>
<span class="line">      <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2</span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Set up Node.js</span>
<span class="line">      <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v2</span>
<span class="line">      <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">&#39;16&#39;</span></span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies</span>
<span class="line">      <span class="token key atrule">run</span><span class="token punctuation">:</span> npm install</span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Run tests</span>
<span class="line">      <span class="token key atrule">run</span><span class="token punctuation">:</span> npm test</span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build the project</span>
<span class="line">      <span class="token key atrule">run</span><span class="token punctuation">:</span> npm run build</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个工作流将在每次代码 push 或 pull request 时自动运行，安装依赖、运行测试、并构建项目。</p><p><strong>3. 自动化测试</strong><br> 测试是 CI/CD 流水线中十分重要的一环。对于前端项目，我们可以使用 Jest 来编写和运行单元测试。</p><ol><li>安装 Jest：</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="line"><span class="token function">npm</span> <span class="token function">install</span> jest --save-dev</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="2"><li>在 package.json 中添加测试脚本：</li></ol><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre class="language-json"><code><span class="line"><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token string">&quot;jest&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>编写测试文件，然后每次提交代码时，CI 工具将自动运行这些测试。</li></ol><p><strong>4. 持续部署</strong><br> 部署可以通过 GitHub Actions 进行自动化部署。假设我们要将打包好的项目发布到 Netlify 或 Vercel 上，我们可以借助它们的 CLI 工具来实现自动化。 以 Netlify 为例：</p><ol><li>在 Netlify 上创建一个新站点，并获取一个 API Token。</li><li>在 GitHub Actions 中新增部署步骤，配置 .github/workflows/ci.yml 文件：</li></ol><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="line"><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to Netlify</span>
<span class="line">  <span class="token key atrule">run</span><span class="token punctuation">:</span> npx netlify<span class="token punctuation">-</span>cli deploy <span class="token punctuation">-</span><span class="token punctuation">-</span>prod <span class="token punctuation">-</span><span class="token punctuation">-</span>dir=build <span class="token punctuation">-</span><span class="token punctuation">-</span>auth=$NETLIFY_AUTH_TOKEN</span>
<span class="line">  <span class="token key atrule">env</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">NETLIFY_AUTH_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.NETLIFY_AUTH_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>在 GitHub 仓库的 Settings -&gt; Secrets 中添加 NETLIFY_AUTH_TOKEN，以便 GitHub Actions 能够安全地访问它。</li></ol><p>每次代码提交后，项目将自动构建并部署到 Netlify，你的最新版本会立即上线。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2><p>本文适合刚接触CI/CD的朋友，如果你还没有尝试过 CI/CD，不妨从一个小项目开始，逐步引入自动化构建、测试和部署流程。未来，你可以根据团队的需求，逐步优化和扩展你的 CI/CD 流水线，进一步提升团队的开发效率。</p>`,30)]))}const o=s(i,[["render",t],["__file","tishengqianduankaifaxiaolvdeshijian.html.vue"]]),u=JSON.parse('{"path":"/blogs/gongchenghua/tishengqianduankaifaxiaolvdeshijian.html","title":"初探CI/CD，提升前端开发效率的实践","lang":"en-US","frontmatter":{"title":"初探CI/CD，提升前端开发效率的实践","date":"2024/04/05","tags":["工程化"],"categories":["工程化"]},"headers":[{"level":2,"title":"什么是 CI/CD","slug":"什么是-ci-cd","link":"#什么是-ci-cd","children":[]},{"level":2,"title":"为什么前端开发也需要 CI/CD","slug":"为什么前端开发也需要-ci-cd","link":"#为什么前端开发也需要-ci-cd","children":[]},{"level":2,"title":"如何搭建一个简单的前端 CI/CD 流水线","slug":"如何搭建一个简单的前端-ci-cd-流水线","link":"#如何搭建一个简单的前端-ci-cd-流水线","children":[]},{"level":2,"title":"小结","slug":"小结","link":"#小结","children":[]}],"git":{"createdTime":1725544094000,"updatedTime":1733557286000,"contributors":[{"name":"“zhaohb”","email":"“2996442165@qq.com”","commits":3},{"name":"Ryan","email":"2996442165@qq.com","commits":1}]},"filePathRelative":"blogs/工程化/提升前端开发效率的实践.md"}');export{o as comp,u as data};