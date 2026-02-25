# React H5 Template

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89)

基于 **React 19 + TypeScript + Vite 7** 构建的移动端 H5 开发模板，开箱即用。

## 技术栈

| 分类 | 技术方案                                     |
| ---- | -------------------------------------------- |
| 框架 | React 19 + TypeScript 5.9                    |
| 构建 | Vite 7 + SWC                                 |
| 路由 | TanStack Router（文件路由）                  |
| 请求 | Axios + TanStack Query                       |
| 状态 | Zustand                                      |
| UI   | antd-mobile 5                                |
| 样式 | UnoCSS + Sass                                |
| 动画 | Framer Motion                                |
| 图标 | UnoCSS Icons（Iconify）                      |
| 规范 | ESLint + Prettier + Husky + Commitlint + czg |

## 功能特性

- **移动端自适应布局** — `postcss-px-to-viewport` 自动将 px 转为 vw，行内样式提供 `pxToVw()` 工具函数，支持 PC 端和横屏适配
- **原子化 CSS** — UnoCSS 预置 Wind4 + Attributify + Icons + RemToPx + Scrollbar
- **文件路由** — TanStack Router 插件自动生成路由，新建页面即新路由
- **请求封装** — Axios 拦截器 + 统一错误处理 + 请求日志（开发环境彩色输出）
- **图标系统** — 内置 Carbon 图标集（纯 CSS 渲染零 JS 开销），可按需安装更多 `@iconify-json/*` 图标包
- **环境变量驱动** — 端口、代理、调试工具、构建选项均通过 `.env` 配置
- **移动端调试** — eruda 集成，环境变量控制 + URL 参数 `?eruda` 临时开启
- **DevTools** — TanStack Router / Query DevTools 通过环境变量控制显隐
- **构建优化** — 分包策略（core / router / query / motion 独立 chunk）、gzip + brotli 预压缩、生产环境自动移除 console
- **代码规范** — ESLint Flat Config + Prettier + Husky pre-commit + Commitlint commit-msg + czg 交互式提交
- **CSS 前缀** — autoprefixer 自动补全浏览器前缀
- **全局错误兜底** — ErrorBoundary 防止白屏，渲染错误可恢复
- **页面骨架屏** — PageContainer 内置 Skeleton 加载态，一个 prop 即可开启
- **公共组件** — PageContainer（导航 + 骨架屏 + 安全区） / ErrorBoundary

## 项目结构

```
├── public/                   # 静态资源
├── src/
│   ├── api/                  # 接口模块（每个模块一个文件夹）
│   │   ├── todo/index.ts
│   │   └── post/index.ts
│   ├── assets/               # 静态资源 + 样式
│   │   ├── react.svg
│   │   └── styles/
│   │       ├── global.scss          # 全局样式入口
│   │       ├── reset.scss           # 基础重置
│   │       ├── variables.scss       # SCSS 变量
│   │       └── antd-overrides.scss  # antd-mobile 样式覆盖
│   ├── components/           # 公共组件
│   │   ├── ErrorBoundary/index.tsx  # 全局错误边界
│   │   └── PageContainer/index.tsx  # 页面容器（导航+骨架屏+安全区）
│   ├── hooks/                # 自定义 Hooks
│   │   └── useApi.ts
│   ├── pages/                # 页面（文件路由）
│   │   ├── __root.tsx
│   │   ├── index.tsx
│   │   ├── about.tsx
│   │   └── demo/
│   ├── stores/               # Zustand 状态管理
│   ├── types/                # TypeScript 类型
│   │   ├── api/index.ts
│   │   ├── todo/index.ts
│   │   ├── post/index.ts
│   │   └── user/index.ts
│   ├── utils/                # 工具函数
│   │   ├── request.ts        # Axios 封装
│   │   ├── log.ts            # 请求日志
│   │   ├── storage.ts        # localStorage 封装
│   │   ├── pxToVw.ts         # 行内样式 px→vw
│   │   ├── initEruda.ts      # eruda 初始化
│   │   └── patchAntdMobile.ts # React 19 兼容补丁
│   ├── App.tsx               # 根组件（Provider 聚合）
│   ├── main.tsx              # 入口
│   └── vite-env.d.ts         # 环境变量类型
├── .env                      # 通用环境变量
├── .env.development          # 开发环境
├── .env.production           # 生产环境
├── uno.config.ts             # UnoCSS 配置
├── vite.config.ts            # Vite 配置
├── postcss.config.js         # PostCSS 配置
├── commitlint.config.js      # Commitlint 配置
├── eslint.config.js          # ESLint 配置
├── .prettierrc               # Prettier 配置
└── tsconfig.json             # TypeScript 配置
```

## 环境变量

| 变量                   | 说明                          | 默认值                                 |
| ---------------------- | ----------------------------- | -------------------------------------- |
| `VITE_APP_TITLE`       | 应用标题（用于 HTML title）   | `React H5 Template`                    |
| `VITE_PORT`            | 开发服务器端口                | `3000`                                 |
| `VITE_OPEN`            | 是否自动打开浏览器            | `false`                                |
| `VITE_API_BASE_URL`    | API 请求基础路径              | `/api`                                 |
| `VITE_PROXY_TARGET`    | 开发环境代理目标地址          | `https://jsonplaceholder.typicode.com` |
| `VITE_API_TIMEOUT`     | 请求超时时间（ms）            | `15000`                                |
| `VITE_ENABLE_ERUDA`    | 是否启用 eruda 移动端调试     | `false`                                |
| `VITE_ENABLE_DEVTOOLS` | 是否启用 TanStack DevTools    | `false`                                |
| `VITE_BUILD_GZIP`      | 是否开启 gzip + brotli 预压缩 | `false`                                |
| `VITE_DROP_CONSOLE`    | 构建时是否移除 console        | `false`                                |
| `VITE_OUT_DIR`         | 构建输出目录                  | `dist`                                 |

## 快速开始

### 环境要求

- Node.js >= 22
- pnpm >= 9

### 安装

```bash
pnpm install
```

### 开发

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

### 预览

```bash
pnpm preview
```

### 其他命令

```bash
# 类型检查
pnpm typecheck

# 代码检查 + 修复
pnpm lint

# 代码格式化
pnpm format

# 交互式 Git 提交
pnpm commit
```

## 内置工具库

| 库              | 用途                                |
| --------------- | ----------------------------------- |
| `axios`         | HTTP 请求                           |
| `dayjs`         | 日期处理                            |
| `clsx`          | 条件 className 拼接                 |
| `query-string`  | URL 查询参数解析                    |
| `es-toolkit`    | 轻量 lodash 替代（tree-shake 友好） |
| `framer-motion` | 动画与手势交互                      |
| `zustand`       | 轻量状态管理                        |
| `eruda`         | 移动端调试工具                      |

## 许可证

[MIT](https://opensource.org/licenses/MIT)
