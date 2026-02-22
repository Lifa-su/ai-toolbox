import './globals.css'

export const metadata = {
  title: 'AI工具箱 - 免费AI文本改写、摘要生成、翻译工具',
  description: '免费在线AI工具箱，提供AI文本改写润色、AI摘要生成、AI翻译（中英日韩）、Markdown转公众号排版等实用工具。',
  keywords: 'AI工具,文本改写,AI润色,摘要生成,AI翻译,Markdown排版,免费AI工具',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
