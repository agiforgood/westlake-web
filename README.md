# 西湖区智能向善社会创新网络中心官网

这是西湖区智能向善社会创新网络中心的官方网站项目，基于 Next.js 构建。

## 项目简介

本项目是西湖区智能向善社会创新网络中心的官方网站，旨在展示和传播智能向善的理念、项目成果和最新动态。网站部署在 [westlakeaiforgood.com](https://westlakeaiforgood.com)。

## 技术栈

- [Next.js](https://nextjs.org) - React 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript
- [Tailwind CSS](https://tailwindcss.com) - 实用优先的 CSS 框架
- [ESLint](https://eslint.org/) - 代码质量检查工具
- [PostCSS](https://postcss.org/) - CSS 转换工具

## 开始使用

### 环境要求

- Node.js 18.0.0 或更高版本
- npm 9.0.0 或更高版本

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
npm run build
```

### 运行生产版本

```bash
npm start
```

## 项目结构

```
├── src/               # 源代码目录
│   ├── app/          # Next.js 13+ App Router 页面
│   ├── components/   # React 组件
│   ├── lib/          # 工具库和第三方集成
│   ├── utils/        # 通用工具函数
│   └── type/         # TypeScript 类型定义
├── public/           # 静态资源文件
├── .next/            # Next.js 构建输出目录
├── node_modules/     # 项目依赖
├── next.config.ts    # Next.js 配置文件
├── tsconfig.json     # TypeScript 配置
├── postcss.config.mjs # PostCSS 配置
├── eslint.config.mjs # ESLint 配置
└── Dockerfile        # Docker 构建文件
```

## 开发规范

- 使用 TypeScript 进行开发，确保类型安全
- 遵循 ESLint 规则进行代码规范检查
- 使用 Tailwind CSS 进行样式开发
- 组件和页面放置在对应的目录中
- 工具函数和类型定义分别放在 utils 和 type 目录中

## 贡献指南

我们欢迎社区贡献！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解如何参与项目开发。

## 许可证

本项目采用 [AGPL-3.0](./LICENSE) 许可证。
