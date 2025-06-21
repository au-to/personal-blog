---
title: Docker入门指南
date: 2025/06/20
tags:
 - Docker
---

## 什么是 Docker？

在深入学习之前，我们先简单理解一下 **Docker** 是什么。

想象一下，你开发了一个应用程序，它在你的电脑上运行得好好的。但当你把它部署到另一台电脑（比如服务器）上时，却突然无法运行了，或者出现各种奇奇怪怪的问题。这通常是因为两台电脑的环境（操作系统、库文件、依赖项等）不完全一致造成的。

**Docker 的出现就是为了解决这个问题。** 它像是一个“打包机”，能把你的应用程序及其所有依赖项（代码、运行时环境、系统工具、系统库等）全部打包成一个独立的、可移植的“容器”（Container）。这个容器可以在任何安装了 Docker 的机器上运行，并且运行结果都是一致的，因为它自带了所有必要的环境。

你可以把容器想象成一个轻量级的虚拟机，但它比虚拟机更高效、启动更快。

## Docker 的核心概念

在开始动手之前，了解几个 Docker 的核心概念非常重要：

* **镜像 (Image)**：镜像是一个只读的模板，包含了创建 Docker 容器所需的所有指令、应用程序、库、配置文件等。可以把它看作是容器的“蓝图”或“模具”。比如，你可以有一个 Ubuntu 镜像，或者一个包含了 Node.js 运行环境的镜像。
* **容器 (Container)**：容器是镜像的运行实例。你可以从一个镜像创建多个容器，每个容器都是相互隔离的、独立的运行环境。容器是轻量级、可移植且可执行的。
* **Dockerfile**：Dockerfile 是一个文本文件，包含了一系列指令，用来自动化构建 Docker 镜像。你可以编写 Dockerfile 来定义你的应用程序如何被打包成一个镜像。
* **Docker Hub**：Docker Hub 是一个官方的 Docker 镜像仓库，里面包含了大量的公共镜像，你可以直接下载使用。同时，你也可以将自己构建的镜像上传到 Docker Hub，方便分享和管理。

## 快速上手 Docker：三步走

接下来，让我们来实际操作一下，快速上手 Docker！

### 第一步：安装 Docker

首先，需要在你的电脑上安装 Docker。Docker 官方提供了详细的安装指南，根据你的操作系统选择对应的安装方式：

* **macOS**: 访问 [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
* **Windows**: 访问 [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
* **Linux**: 访问 [Docker Engine for Linux](https://docs.docker.com/engine/install/)

安装完成后，打开命令行工具（Mac/Linux 是终端，Windows 是 PowerShell 或 CMD），输入以下命令检查 Docker 是否安装成功：

```bash
docker --version
docker run hello-world
```

如果看到 Docker 的版本信息，并且 `docker run hello-world` 命令成功运行并输出了“Hello from Docker!”的信息，说明 Docker 已经成功安装并运行了。

### 第二步：运行你的第一个 Docker 容器

现在我们来运行一个简单的 Nginx Web 服务器，感受一下 Docker 的魔力。

在命令行中输入：

```bash
docker run -d -p 80:80 --name my-nginx nginx
```

解释一下这个命令：

* `docker run`: 这是运行 Docker 容器的命令。
* `-d`: 表示“detached”模式，让容器在后台运行，不会占用你的命令行界面。
* `-p 80:80`: 这是端口映射。它将容器内部的 80 端口映射到你主机上的 80 端口。这样，你就可以通过访问你主机的 80 端口来访问 Nginx 服务。
* `--name my-nginx`: 给你的容器指定一个易于记忆的名字，这里是 `my-nginx`。
* `nginx`: 这是我们要运行的镜像名称。Docker 会自动从 Docker Hub 下载 `nginx` 镜像（如果本地没有的话）。

运行完这条命令后，你应该会看到一串很长的字符串，那是容器的 ID。

现在，打开你的浏览器，访问 `http://localhost`。你应该能看到 Nginx 的欢迎页面。

要停止并删除这个容器，你可以执行：

```bash
docker stop my-nginx
docker rm my-nginx
```

* `docker stop my-nginx`: 停止名为 `my-nginx` 的容器。
* `docker rm my-nginx`: 删除名为 `my-nginx` 的容器。

### 第三步：构建你自己的 Docker 镜像

现在，我们来尝试构建一个简单的 Node.js 应用程序的 Docker 镜像。

1.  **创建一个项目目录**：
    ```bash
    mkdir my-node-app
    cd my-node-app
    ```

2.  **创建 `index.js` 文件**：
    在这个文件中写入一个简单的 Node.js Web 服务器：
    ```javascript
    // index.js
    const http = require('http');

    const hostname = '0.0.0.0'; // 监听所有网络接口
    const port = 3000;

    const server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello from Docker Node.js App!\n');
    });

    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
    ```

3.  **创建 `Dockerfile` 文件**：
    在 `my-node-app` 目录下创建一个名为 `Dockerfile` 的文件（注意没有文件扩展名），并写入以下内容：
    ```dockerfile
    # 使用官方 Node.js LTS 镜像作为基础镜像
    FROM node:lts-alpine

    # 设置工作目录
    WORKDIR /app

    # 将当前目录下的所有文件复制到容器的 /app 目录
    COPY . .

    # 安装依赖 (如果你的项目有 package.json 和 node_modules)
    # RUN npm install

    # 暴露容器的 3000 端口
    EXPOSE 3000

    # 定义容器启动时运行的命令
    CMD ["node", "index.js"]
    ```

    解释一下 `Dockerfile` 中的指令：
    * `FROM node:lts-alpine`: 指定基础镜像。我们使用 Node.js 的 LTS 版本（长期支持版），基于 Alpine Linux，它非常小巧。
    * `WORKDIR /app`: 设置容器内的工作目录为 `/app`。
    * `COPY . .`: 将当前目录（你的 `my-node-app` 目录）下的所有文件复制到容器内的 `/app` 目录。
    * `EXPOSE 3000`: 声明容器会监听 3000 端口。这只是一个声明，要让外部访问还需要在 `docker run` 时进行端口映射。
    * `CMD ["node", "index.js"]`: 定义容器启动时要执行的命令。

4.  **构建 Docker 镜像**：
    在 `my-node-app` 目录下，打开命令行，执行以下命令：
    ```bash
    docker build -t my-node-app .
    ```
    * `docker build`: 构建 Docker 镜像的命令。
    * `-t my-node-app`: 给你构建的镜像指定一个标签（tag），这里是 `my-node-app`。
    * `.`: 表示 Dockerfile 所在路径为当前目录。

    如果一切顺利，你会看到 Docker 开始构建镜像的过程，最后会显示成功构建的信息。

5.  **运行你构建的镜像**：
    现在，从你刚刚构建的镜像运行一个容器：
    ```bash
    docker run -d -p 8080:3000 --name my-running-app my-node-app
    ```
    这里我们将主机的 8080 端口映射到容器的 3000 端口。

    打开浏览器，访问 `http://localhost:8080`，你应该能看到“Hello from Docker Node.js App!”的信息！

    同样，停止并删除容器：
    ```bash
    docker stop my-running-app
    docker rm my-running-app
    ```

## 常用 Docker 命令

掌握这些常用命令，可以提高你使用 Docker 的效率：

* `docker images`: 列出本地所有的 Docker 镜像。
* `docker ps`: 列出所有正在运行的容器。
* `docker ps -a`: 列出所有容器（包括已停止的）。
* `docker stop <容器ID或名称>`: 停止一个运行中的容器。
* `docker rm <容器ID或名称>`: 删除一个已停止的容器。
* `docker rmi <镜像ID或名称>`: 删除一个本地镜像。
* `docker logs <容器ID或名称>`: 查看容器的日志输出。
* `docker exec -it <容器ID或名称> bash`: 进入正在运行的容器内部进行交互式操作。

## 接下来你可以学习什么？

* **Docker Compose**: 用于定义和运行多容器 Docker 应用程序的工具。当你的项目需要多个服务（如 Web 服务器、数据库、缓存等）协同工作时，Docker Compose 会非常有帮助。
* **数据卷 (Volumes)**: 如何在容器和主机之间持久化数据。
* **网络 (Networking)**: 容器之间如何进行通信。
* **私有仓库 (Private Registry)**: 搭建自己的 Docker 镜像仓库。
* **Docker Swarm / Kubernetes**: 用于容器编排和管理大规模容器集群的工具。
