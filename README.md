<div align="center">

# 🧰 AI Toolbox

**A free, open-source collection of AI-powered productivity tools.**

*基于 DeepSeek API 的免费 AI 效率工具集合，开箱即用。*

[![Stars](https://img.shields.io/github/stars/Lifa-su/ai-toolbox?style=flat-square&logo=github&color=yellow)](https://github.com/Lifa-su/ai-toolbox/stargazers)
[![Forks](https://img.shields.io/github/forks/Lifa-su/ai-toolbox?style=flat-square&logo=github)](https://github.com/Lifa-su/ai-toolbox/network/members)
[![License](https://img.shields.io/github/license/Lifa-su/ai-toolbox?style=flat-square&color=blue)](./LICENSE)
[![Issues](https://img.shields.io/github/issues/Lifa-su/ai-toolbox?style=flat-square)](https://github.com/Lifa-su/ai-toolbox/issues)
[![Last Commit](https://img.shields.io/github/last-commit/Lifa-su/ai-toolbox?style=flat-square)](https://github.com/Lifa-su/ai-toolbox/commits/main)

[🎯 Live Demo](https://lifa-su.github.io/ai-toolbox) · [🐛 Report Bug](https://github.com/Lifa-su/ai-toolbox/issues) · [💡 Request Feature](https://github.com/Lifa-su/ai-toolbox/issues)

</div>

---

<!-- Screenshot placeholder / 截图占位 -->
<!-- <p align="center"><img src="./docs/screenshot.png" alt="AI Toolbox Screenshot" width="800" /></p> -->

## ✨ Features

| Tool | Description | Status |
|------|-------------|--------|
| ✍️ **AI Rewrite & Polish** | Intelligently optimize Chinese & English text expressions | ✅ Available |
| 📝 **AI Summary** | Extract key points from long articles in one click | ✅ Available |
| 🌐 **AI Translation** | Accurate cross-language translation | 🚧 Coming Soon |
| 📱 **Markdown → WeChat** | Convert Markdown to WeChat article formatting | 🚧 Coming Soon |

> 💡 All tools are powered by [DeepSeek](https://deepseek.com) — fast, accurate, and cost-effective.

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A [DeepSeek API Key](https://platform.deepseek.com/) (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/Lifa-su/ai-toolbox.git
cd ai-toolbox

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your DeepSeek API Key

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're good to go! 🎉

## 🎯 Demo

👉 **Try it now:** [https://lifa-su.github.io/ai-toolbox](https://lifa-su.github.io/ai-toolbox)

No sign-up required. Just open and use.

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 14](https://nextjs.org/) | React framework (App Router) |
| [React 18](https://react.dev/) | UI library |
| [TailwindCSS](https://tailwindcss.com/) | Utility-first CSS |
| [DeepSeek API](https://platform.deepseek.com/) | AI model backend |

## 📦 Project Structure

```
ai-toolbox/
├── src/
│   ├── app/
│   │   ├── api/          # API routes (rewrite, summary)
│   │   ├── rewrite/      # AI rewrite page
│   │   ├── summary/      # AI summary page
│   │   ├── layout.js     # Root layout
│   │   ├── page.js       # Home page
│   │   └── globals.css   # Global styles
│   └── components/       # Reusable UI components
│       ├── Header.js
│       ├── Footer.js
│       ├── ToolCard.js
│       └── TextProcessor.js
├── .env.local.example    # Environment variable template
├── next.config.js
├── tailwind.config.js
└── package.json
```

## ⚙️ Environment Variables

| Variable | Description |
|----------|-------------|
| `DEEPSEEK_API_KEY` | Your DeepSeek API key ([Get one here](https://platform.deepseek.com/)) |

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Feel free to open an [issue](https://github.com/Lifa-su/ai-toolbox/issues) for bug reports, feature requests, or questions.

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="center">

**If you find this project useful, please consider giving it a ⭐️**

Made with ❤️ by [Lifa-su](https://github.com/Lifa-su)

</div>
