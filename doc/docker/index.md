## 常用命令

### image 文件

```bash
# 列出本机的所有 image 文件
docker image ls

# 删除 image 文件
docker image rm [imageName]

# 拉取远程image，library是组，hello-world是文件名
docker image pull library/hello-world

# 运行image
docker run hello-world
```

### container 容器

```bash
# 终止
docker kill [containID]

# 正在运行的容器
docker container ls

# 所有的容器（包括已终止）
docker container ls --all

# 删除容器
docker container rm [containerID]
```
