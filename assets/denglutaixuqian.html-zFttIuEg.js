import{_ as s,c as a,a as p,o as e}from"./app-ByagjAXb.js";const t={};function l(c,n){return e(),a("div",null,n[0]||(n[0]=[p(`<h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景"><span>背景</span></a></h2><p>公司目前的技术架构，用户的登录态主要记录在后端，若30min内前端没有调用后端接口，就会自动登出。但有些页面需要大量的文本录入，可能出现用户在30min内无法填写完成的情况，没有调接口导致自动登出，当再次登录，已经填写的信息就会丢失，比较崩溃。为了解决这个问题，设计开发了此方案。</p><h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案"><span>解决方案</span></a></h2><ol><li>前端捕获用户活动：比如鼠标移动、键盘输入、滚动等行为，如果检测到用户活动，则每隔一段时间请求一次后端接口（比如5分钟），保持登录态。</li><li>自动保存进度：在用户填写表单时，自动保存用户输入的数据到本地存储或者后端。</li><li>增加用户提示：在用户即将登出的前几分钟提示用户即将登出，用户手动触发延长会话按钮，向后端发请求续签会话。</li></ol><p>我们希望把最终方案做成一个公共方法，在需要的页面（例如长表单页面）按需引入；考虑到系统已经成熟，在不影响系统稳定性、用户体验和保证性能的前提下，最终选择了方案一。</p><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现"><span>实现</span></a></h2><ol><li>由于希望该工具是页面级的，所以在router路由配置文件中给需要支持该功能的页面加一个meta元信息<code>isSessionRenew</code>,值为<code>true</code>或<code>false</code>；代表该页面是否需要定时续签。以下为原生<code>JS</code>结合<code>Vue</code>实现：</li></ol><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/long-form&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;long-form&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">component</span><span class="token operator">:</span> LongForm<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">meta</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">isSessionRenew</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>监听路由，当路由改变时，根据当前路由的<code>isSessionRenew</code>判断当前页是否启用续签功能，若启用，则调用封装的方法，监听用户行为，以延长会话。</li></ol><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token string-property property">&#39;$route.path&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">immediate</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">handler</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">newVal<span class="token punctuation">,</span> oldVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>meta<span class="token operator">?.</span>isSessionRenew<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token function">initSessionRenew</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>具体功能函数的封装：</li></ol><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token comment">// 防抖</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">debounce</span> <span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> time</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">let</span> timer<span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">,</span> time<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 网络请求</span></span>
<span class="line"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">fetch</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 此处调用后端提供的续签接口</span></span>
<span class="line">  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token string">&#39;get&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;/api/renew&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>isOk<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;-------续签成功--------&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">let</span> clickHandler <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 初始化事件监听</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">initSessionRenew</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> node <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;.wrap&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    clickHandler <span class="token operator">=</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">// 阻止事件冒泡</span></span>
<span class="line">      event<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    node<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> clickHandler<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 移除事件监听</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">removeSessionRenew</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> node <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;.wrap&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">&amp;&amp;</span> clickHandler<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    node<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> clickHandler<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    clickHandler <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token punctuation">{</span> initSessionRenew<span class="token punctuation">,</span> removeSessionRenew <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>在页面卸载前，移除事件监听，防止全局监听损耗性能，由于是页面级的，选择在<code>beforeEach</code>全局守卫钩子中处理。</li></ol><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 路由跳转时，如果当前页开启了续签功能，则移除事件监听，防止全局监听</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>from<span class="token punctuation">.</span>meta<span class="token operator">?.</span>sessionRenew<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">removeSessionRenew</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>上述，我们实现了一个简单的登录态续签方案：在需要支持的项目中引入该工具，在路由变化时调用<code>initSessionRenew</code>方法；并在需要续签的页面对应的路由配置中加上<code>isSessionRenew: true</code>的<code>meta</code>信息，即可实现自动捕获用户活动以维持登录态，同时别忘了在页面卸载时调用<code>removeSessionRenew</code>方法，防止事件全局监听。</p>`,16)]))}const i=s(t,[["render",l]]),u=JSON.parse('{"path":"/blogs/gongjulian/denglutaixuqian.html","title":"记一次登录态续签方案","lang":"en-US","frontmatter":{"title":"记一次登录态续签方案","date":"2024/02/03","tags":["工具链"],"categories":["工具链"]},"headers":[{"level":2,"title":"背景","slug":"背景","link":"#背景","children":[]},{"level":2,"title":"解决方案","slug":"解决方案","link":"#解决方案","children":[]},{"level":2,"title":"实现","slug":"实现","link":"#实现","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1725342183000,"updatedTime":1733557286000,"contributors":[{"name":"Ryan","email":"2996442165@qq.com","commits":1},{"name":"“zhaohb”","email":"“2996442165@qq.com”","commits":1}]},"filePathRelative":"blogs/工具链/登录态续签.md"}');export{i as comp,u as data};
