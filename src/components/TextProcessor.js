'use client'
import { useState } from 'react'

export default function TextProcessor({ title, placeholder, apiPath, buttonText = '开始处理', resultLabel = '处理结果' }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!input.trim()) return
    setLoading(true)
    setError('')
    setOutput('')
    try {
      const res = await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
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

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output)
    } catch {
      // clipboard access denied
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 gradient-text">{title}</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">输入文本</label>
          <textarea
            className="w-full h-40 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder={placeholder}
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
          {loading ? '处理中...' : buttonText}
        </button>

        {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>}

        {output && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">{resultLabel}</label>
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
