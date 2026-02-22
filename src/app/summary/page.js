import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TextProcessor from '@/components/TextProcessor'

export const metadata = {
  title: 'AI摘要生成 - AI工具箱',
  description: '免费AI摘要生成工具，粘贴长文一键生成精炼摘要，快速提取核心内容。',
}

export default function SummaryPage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-4 py-10">
        <TextProcessor
          title="📝 AI摘要生成"
          placeholder="在这里粘贴需要总结的长文...&#10;&#10;AI会帮你提取核心内容，生成精炼的摘要。"
          apiPath="/api/summary"
          buttonText="生成摘要"
          resultLabel="摘要结果"
        />
      </main>
      <Footer />
    </>
  )
}
