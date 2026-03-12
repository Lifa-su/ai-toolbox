'use client'
import { useState } from 'react'

const LANGUAGES = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
]

export default function TranslateProcessor() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('en')

  const handleSubmit = async () => {
    if (!input.trim()) return
    setLoading(true)
    setError('')
    setOutput('')
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, from: from || undefined, to }),
      })
      let data
      try {
        data = await res.json()
      } catch {
        throw new Error('AI服务暂时不可用，请稍后再试')
      }
      if (!res.ok) throw new Error(data.error || '请求失败')
      setOutput(data.result)
    } catch (e) {
      setError(e.message || '请求失败，请稍后再试')
    } finally {
      setLoading(false)
    }
  }

  const swapLangs = () => {
    if (!from) return
    setFrom(to)
    setTo(from)
    if (output) {
      setInput(output)
      setOutput('')
    }
  }

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output)
    } catch {
      // clipboard access denied
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 gradient-text">🌐 AI翻译</h1>
      <div className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs text-gray-500 mb-1">源语言</label>
            <select
              value={from}
              onChange={e => setFrom(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">自动检测</option>
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>
          <button
            onClick={swapLangs}
            className="mt-4 p-2 text-gray-400 hover:text-blue-600 transition"
            title="交换语言"
            aria-label="交换源语言和目标语言"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs text-gray-500 mb-1">目标语言</label>
            <select
              value={to}
              onChange={e => setTo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">输入文本</label>
          <textarea
            className="w-full h-40 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder={"在这里粘贴需要翻译的文本...\n\n支持中文、英文、日文、韩文互译。"}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <div className="text-xs text-gray-400 mt-1 text-right">{input.length} 字</div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          className="w-full py-3 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? '翻译中...' : '开始翻译'}
        </button>

        {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>}

        {output && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">翻译结果</label>
              <button onClick={copyOutput} className="text-xs text-blue-600 hover:underline">复制结果</button>
            </div>
            <div className="w-full p-3 border border-gray-200 rounded-xl bg-white text-sm whitespace-pre-wrap min-h-[120px]">
              {output}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
