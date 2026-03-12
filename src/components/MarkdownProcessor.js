'use client'
import { useState } from 'react'

export default function MarkdownProcessor() {
  const [input, setInput] = useState('')
  const [html, setHtml] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(true)

  const handleSubmit = async () => {
    if (!input.trim()) return
    setLoading(true)
    setError('')
    setHtml('')
    try {
      const res = await fetch('/api/markdown', {
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
      setHtml(data.result)
    } catch (e) {
      setError(e.message || '请求失败，请稍后再试')
    } finally {
      setLoading(false)
    }
  }

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(html)
    } catch {
      // clipboard access denied
    }
  }

  const copyRich = async () => {
    try {
      const blob = new Blob([html], { type: 'text/html' })
      await navigator.clipboard.write([
        new ClipboardItem({ 'text/html': blob }),
      ])
    } catch {
      try {
        await navigator.clipboard.writeText(html)
      } catch {
        // clipboard access denied
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 gradient-text">📱 Markdown 转公众号排版</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">输入 Markdown</label>
          <textarea
            className="w-full h-48 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
            placeholder={"# 标题\n\n正文内容...\n\n## 二级标题\n\n- 列表项1\n- 列表项2\n\n> 引用文字\n\n**加粗** 和 `行内代码`"}
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
          {loading ? '转换中...' : '生成公众号排版'}
        </button>

        {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>}

        {html && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPreview(true)}
                  className={`text-xs px-3 py-1 rounded-full transition ${showPreview ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  预览
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className={`text-xs px-3 py-1 rounded-full transition ${!showPreview ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  HTML源码
                </button>
              </div>
              <div className="flex gap-3">
                <button onClick={copyRich} className="text-xs text-blue-600 hover:underline">复制富文本</button>
                <button onClick={copyHtml} className="text-xs text-gray-500 hover:underline">复制HTML</button>
              </div>
            </div>
            {showPreview ? (
              <div
                className="w-full p-4 border border-gray-200 rounded-xl bg-white min-h-[150px] prose-sm"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <pre className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-xs font-mono overflow-x-auto min-h-[150px] whitespace-pre-wrap">
                {html}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
