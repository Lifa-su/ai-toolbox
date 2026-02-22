import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ToolCard from '@/components/ToolCard'

export default function Home() {
  const tools = [
    { href: '/rewrite', icon: '✍️', title: 'AI文本改写', desc: '智能改写润色你的文本，支持中英文，让表达更专业流畅' },
    { href: '/summary', icon: '📝', title: 'AI摘要生成', desc: '粘贴长文一键生成摘要，快速提取核心内容' },
    { href: '#', icon: '🌐', title: 'AI翻译（即将上线）', desc: '支持中英日韩互译，AI驱动更自然的翻译结果' },
    { href: '#', icon: '📱', title: 'MD转公众号（即将上线）', desc: 'Markdown一键转换为公众号排版格式' },
  ]

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">AI工具箱</span>
          </h1>
          <p className="text-gray-500 text-lg mb-12 max-w-xl mx-auto">
            免费、好用的AI效率工具集合，让AI帮你搞定文字工作
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {tools.map(t => <ToolCard key={t.title} {...t} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
