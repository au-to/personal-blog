---
title: 本地搭建 Python 开发环境完整指南
date: 2025/07/02
tags:
 - python
---

在开始 Python 项目开发之前，拥有一个干净、可控、可重复的本地开发环境至关重要。本篇博客将详细讲解如何在 **Mac 和 Windows** 系统中分别搭建本地 Python 开发环境，适用于学习、项目开发和前后端联调等场景。

---

## 1. 开发环境准备

### 工具准备（适用于 Mac 和 Windows）

- Python（建议使用 `pyenv` / `官方安装包`）
- 虚拟环境工具：`venv`（标准库内置）
- 依赖管理：`pip` + `requirements.txt`
- 可选：VS Code、Postman、curl、httpie、git

---

## 2. macOS 开发环境搭建步骤

### （1）安装 Homebrew（如未安装）

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### （2）安装 pyenv 并配置环境变量

```bash
brew install pyenv
```

在 `~/.zshrc` 或 `~/.bashrc` 中添加：

```bash
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv init -)"
```

然后执行：

```bash
source ~/.zshrc  # 或 source ~/.bashrc
```

### （3）安装并切换 Python 版本

```bash
pyenv install 3.11.9
pyenv global 3.11.9
```

### （4）创建虚拟环境

```bash
mkdir my-python-project && cd my-python-project
python -m venv venv
source venv/bin/activate
```

---

## 3. Windows 开发环境搭建步骤

### （1）安装 Python（建议使用官网）

官网下载地址：https://www.python.org/downloads/windows/

安装时勾选 **“Add Python to PATH”**

### （2）创建项目和虚拟环境

```powershell
mkdir my-python-project
cd my-python-project
python -m venv venv
.env\Scriptsctivate
```

> Windows 激活虚拟环境的路径为 `venv\Scriptsctivate`

---

## 4. 安装依赖包

### （1）安装依赖

```bash
pip install flask  # 例如安装 Flask
```

### （2）保存依赖列表

```bash
pip freeze > requirements.txt
```

### （3）从依赖文件安装

```bash
pip install -r requirements.txt
```

---

## 5. 本地联调（Python + Vite + Vue）

假设：

- Python 服务运行在 `http://localhost:5000`
- 前端 Vue 项目运行在 `http://localhost:5173`

### （1）后端处理 CORS

Flask 示例：

```bash
pip install flask-cors
```

```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 或 CORS(app, origins=["http://localhost:5173"])

@app.route("/api/data")
def data():
    return {"message": "Hello from Flask"}
```

### （2）前端设置 Vite 代理（vite.config.ts）

```ts
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
}
```

### （3）Vue 请求接口

```js
// 使用 fetch
fetch("/api/data")
  .then(res => res.json())
  .then(data => console.log(data))

// 或使用 axios
import axios from 'axios'
axios.get('/api/data').then(res => console.log(res.data))
```

---

## 6. 常用调试命令

| 命令 | 说明 |
|------|------|
| `source venv/bin/activate` | 激活虚拟环境（Mac/Linux） |
| `.env\Scriptsctivate` | 激活虚拟环境（Windows） |
| `pip install -r requirements.txt` | 安装依赖 |
| `pip freeze > requirements.txt` | 保存依赖 |
| `python app.py` | 启动后端服务 |
| `npm run dev` | 启动前端 Vite 项目 |

---

## 7. 总结建议

- 使用虚拟环境隔离依赖
- 后端配置好 CORS，避免跨域问题
- 前端通过 Vite 代理实现简洁请求路径
- 联调时使用浏览器控制台查看请求/响应
- 最终部署时请关闭通配 CORS（限制来源）

---

## 8. 延伸阅读

- [Python 官方文档](https://docs.python.org/3/)
- [Flask 官方文档](https://flask.palletsprojects.com/)
- [Vite 官方文档](https://vitejs.dev/)
- [Vue 3 官方文档](https://vuejs.org/)