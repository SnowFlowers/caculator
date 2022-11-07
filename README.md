# PC 系统模板

## 项目启动


install deps

```
cnpm install --registry=http://192.168.92.24:7001
```

开发环境:
```
npm run dev || npm start
```
项目打包命令:
```
npm run build
```

## Directory Structure
- src 
  - api（后端接口目录） 
  - assets（存放静态文件目录）
    - images（图片） 
    - sass（公共 sass 文件） 
  - components (常用公共组件目录)
  - constants（常量定义）
  - models（redux数据处理）
  - ==routes（页面动态路由）==
    - pages （主路由文件）
  - utils （公用方法文件）
  - feed.config.js （项目配置参数）
  - index.js (react 的 index 页)
  - index.template.html（html 的 index 页）
- feed.config.js（项目运行端口 config）
- package.json（外部包）
- README.md（项目说明）

