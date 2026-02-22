# AI工具箱 🧰

免费好用的AI效率工具集合，基于 Next.js + TailwindCSS 构建。

## 功能

- ✍️ **AI文本改写/润色** — 智能优化中英文表达
- 📝 **AI摘要生成** — 长文一键提取核心内容
- 🌐 AI翻译（开发中）
- 📱 Markdown转公众号排版（开发中）

## 技术栈

- Next.js 14 (App Router)
- TailwindCSS
- DeepSeek API

## 本地运行

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.local.example .env.local
# 编辑 .env.local，填入你的 DeepSeek API Key
# 从 https://platform.deepseek.com/ 获取

# 3. 启动开发服务器
npm run dev
```

打开 http://localhost:3000 即可使用。

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 在 Vercel 项目设置中添加环境变量 `DEEPSEEK_API_KEY`
4. 部署完成

## 环境变量

| 变量名 | 说明 |
|--------|------|
| `DEEPSEEK_API_KEY` | DeepSeek API密钥 |

## License

MIT
