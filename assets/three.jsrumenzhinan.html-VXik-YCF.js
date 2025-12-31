import{_ as e,c as s,a,o as i}from"./app-_qvWuZqY.js";const l={};function r(t,n){return i(),s("div",null,[...n[0]||(n[0]=[a(`<p>Three.js 是一个强大的 JavaScript 库，它让我们能够轻松地在网页上创建和渲染复杂的三维场景。无论你是想构建3D游戏、数据可视化，还是交互式艺术作品，Three.js 都能帮助你快速上手。本篇文章将带你了解Three.js 的基础知识，并展示如何创建一个简单的3D场景。</p><h3 id="什么是three-js" tabindex="-1"><a class="header-anchor" href="#什么是three-js"><span>什么是Three.js？</span></a></h3><p>Three.js 是一个基于 WebGL 的开源 JavaScript 库，它为开发者提供了丰富的工具来创建3D对象、相机、光源等，并能在浏览器中高效渲染3D图形。由于WebGL 直接在 GPU 上运行，Three.js 的性能非常好，适合开发具有实时交互的应用。</p><h3 id="搭建开发环境" tabindex="-1"><a class="header-anchor" href="#搭建开发环境"><span>搭建开发环境</span></a></h3><p>要使用Three.js，我们首先需要搭建一个基本的开发环境。可以使用任何你喜欢的开发工具，这里我们使用 Vite 来快速搭建一个项目。</p><ol><li><strong>安装 Vite</strong> 如果你还没有安装 Vite，先安装它：</li></ol><div class="language-javaScript line-numbers-mode" data-highlighter="prismjs" data-ext="javaScript" data-title="javaScript"><pre><code><span class="line">npm create vite@latest threejs-demo --template vanilla</span>
<span class="line">cd threejs-demo</span>
<span class="line">npm install</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><strong>安装 Three.js</strong> 安装 Three.js 库：</li></ol><div class="language-javaScript line-numbers-mode" data-highlighter="prismjs" data-ext="javaScript" data-title="javaScript"><pre><code><span class="line">npm install three --save</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="3"><li><strong>创建基础场景</strong> 创建一个基础的场景包含三个基本元素：</li></ol><ul><li><strong>场景</strong> (Scene): 存放3D对象、光源等。</li><li><strong>相机</strong> (Camera): 用于设置观察视角。</li><li><strong>渲染器</strong> (Renderer): 负责将3D场景渲染到页面。</li></ul><h3 id="项目示例" tabindex="-1"><a class="header-anchor" href="#项目示例"><span>项目示例</span></a></h3><p>在 main.js 中编写以下代码：</p><div class="language-javaScript line-numbers-mode" data-highlighter="prismjs" data-ext="javaScript" data-title="javaScript"><pre><code><span class="line">import * as THREE from &#39;three&#39;;</span>
<span class="line"></span>
<span class="line">// 创建场景</span>
<span class="line">const scene = new THREE.Scene();</span>
<span class="line"></span>
<span class="line">// 创建相机 (透视相机)</span>
<span class="line">const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);</span>
<span class="line"></span>
<span class="line">// 创建渲染器</span>
<span class="line">const renderer = new THREE.WebGLRenderer();</span>
<span class="line">renderer.setSize(window.innerWidth, window.innerHeight);</span>
<span class="line">document.body.appendChild(renderer.domElement);</span>
<span class="line"></span>
<span class="line">// 创建一个立方体</span>
<span class="line">const geometry = new THREE.BoxGeometry();</span>
<span class="line">const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });</span>
<span class="line">const cube = new THREE.Mesh(geometry, material);</span>
<span class="line">scene.add(cube);</span>
<span class="line"></span>
<span class="line">// 设置相机位置</span>
<span class="line">camera.position.z = 5;</span>
<span class="line"></span>
<span class="line">// 渲染循环</span>
<span class="line">function animate() {</span>
<span class="line">  requestAnimationFrame(animate);</span>
<span class="line"></span>
<span class="line">  // 让立方体旋转</span>
<span class="line">  cube.rotation.x += 0.01;</span>
<span class="line">  cube.rotation.y += 0.01;</span>
<span class="line"></span>
<span class="line">  renderer.render(scene, camera);</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">animate();</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>代码解析</strong></p><ul><li><strong>创建场景和相机：</strong> 通过 THREE.Scene() 创建了一个空的3D场景。相机 THREE.PerspectiveCamera 是一个透视相机，它的参数包括视角、宽高比、近裁剪面和远裁剪面。</li><li><strong>渲染器：</strong> THREE.WebGLRenderer 用于将场景渲染到 HTML 页面上。通过 renderer.setSize 设置渲染器的大小，使其填充整个窗口。</li><li><strong>创建立方体：</strong> 使用 BoxGeometry 创建一个立方体模型，并通过 MeshBasicMaterial 设置它的材质。将这个立方体添加到场景中。</li><li><strong>动画循环：</strong> 通过 requestAnimationFrame 进行渲染循环，使立方体持续旋转，并在每帧更新场景。</li></ul><p><strong>添加光照和材质</strong> 为了让场景更逼真，可以添加光源和更复杂的材质。接下来，我们将在场景中加入一个光源，并给立方体添加一种反光的材质。</p><div class="language-javaScript line-numbers-mode" data-highlighter="prismjs" data-ext="javaScript" data-title="javaScript"><pre><code><span class="line">// 创建点光源</span>
<span class="line">const pointLight = new THREE.PointLight(0xffffff, 1, 100);</span>
<span class="line">pointLight.position.set(10, 10, 10);</span>
<span class="line">scene.add(pointLight);</span>
<span class="line"></span>
<span class="line">// 创建具有反光效果的材质</span>
<span class="line">const reflectiveMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });</span>
<span class="line">const reflectiveCube = new THREE.Mesh(geometry, reflectiveMaterial);</span>
<span class="line">scene.add(reflectiveCube);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MeshStandardMaterial 是一种支持光照的材质，适合表现更真实的物体表面。PointLight 则是一个点光源，发光点周围的对象会受到照射。</p><p><strong>鼠标交互与控件</strong> 要增加用户与3D场景的互动，可以使用 OrbitControls 插件来实现鼠标控制相机的旋转和缩放。</p><ol><li>安装 OrbitControls：</li></ol><div class="language-javaScript line-numbers-mode" data-highlighter="prismjs" data-ext="javaScript" data-title="javaScript"><pre><code><span class="line">npm install three-orbitcontrols</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="2"><li>在项目中使用：</li></ol><div class="language-javaScript line-numbers-mode" data-highlighter="prismjs" data-ext="javaScript" data-title="javaScript"><pre><code><span class="line">import { OrbitControls } from &#39;three/examples/jsm/controls/OrbitControls&#39;;</span>
<span class="line"></span>
<span class="line">const controls = new OrbitControls(camera, renderer.domElement);</span>
<span class="line">controls.enableDamping = true; // 添加阻尼效果，具有更真实的操作体验</span>
<span class="line">controls.dampingFactor = 0.25;</span>
<span class="line">controls.enableZoom = true; // 允许缩放</span>
<span class="line"></span>
<span class="line">// 在 animate 函数中更新控制器</span>
<span class="line">function animate() {</span>
<span class="line">  requestAnimationFrame(animate);</span>
<span class="line">  controls.update(); // 更新控制器</span>
<span class="line">  renderer.render(scene, camera);</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，用户可以通过鼠标轻松旋转、缩放和拖动3D场景，使得整个体验更加交互友好。</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3><p>通过这篇文章，我们从零搭建了一个简单的Three.js项目，了解了如何创建场景、渲染器、相机，并添加了一个旋转的立方体。在此基础上，你可以继续探索 Three.js，添加更多的3D对象、动画、光照效果，甚至是物理引擎等高级功能。下一步，你可以尝试构建更加复杂的项目，比如创建一个动态的3D模型展示页面，或结合 WebXR 实现虚拟现实体验。</p>`,27)])])}const c=e(l,[["render",r]]),p=JSON.parse('{"path":"/blogs/qianduan/three.jsrumenzhinan.html","title":"three.js入门指南","lang":"en-US","frontmatter":{"title":"three.js入门指南","date":"2024/07/06","tags":["three.js"],"categories":["前端"]},"headers":[{"level":3,"title":"什么是Three.js？","slug":"什么是three-js","link":"#什么是three-js","children":[]},{"level":3,"title":"搭建开发环境","slug":"搭建开发环境","link":"#搭建开发环境","children":[]},{"level":3,"title":"项目示例","slug":"项目示例","link":"#项目示例","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1728193377000,"updatedTime":1749881065000,"contributors":[{"name":"Ryan","email":"2996442165@qq.com","commits":1}]},"filePathRelative":"blogs/前端/three.js入门指南.md"}');export{c as comp,p as data};
