import { NextResponse } from 'next/server'

const LANG_MAP = {
  zh: '中文',
  en: '英文',
  ja: '日文',
  ko: '韩文',
}

export async function POST(req) {
  try {
    const { text, from, to } = await req.json()
    if (!text || !text.trim()) {
      return NextResponse.json({ error: '请输入文本' }, { status: 400 })
    }
    if (text.length > 5000) {
      return NextResponse.json({ error: '文本不能超过5000字' }, { status: 400 })
    }
    if (!to || !LANG_MAP[to]) {
      return NextResponse.json({ error: '请选择目标语言' }, { status: 400 })
    }

    const apiKey = process.env.DEEPSEEK_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: '未配置API Key，请在.env.local中设置DEEPSEEK_API_KEY' }, { status: 500 })
    }

    const fromHint = from && LANG_MAP[from] ? `源语言是${LANG_MAP[from]}，` : '自动检测源语言，'
    const toName = LANG_MAP[to]

    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `你是一个专业的翻译助手。${fromHint}请将用户提供的文本翻译为${toName}。要求：\n1. 翻译准确自然，符合目标语言的表达习惯\n2. 保持原文的语气和风格\n3. 专业术语翻译准确\n4. 只输出翻译结果，不要加任何解释说明`,
          },
          { role: 'user', content: text },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('DeepSeek API error:', err)
      return NextResponse.json({ error: 'AI服务暂时不可用，请稍后重试' }, { status: 502 })
    }

    const data = await res.json()
    const result = data.choices?.[0]?.message?.content?.trim()
    if (!result) {
      return NextResponse.json({ error: 'AI返回结果为空' }, { status: 500 })
    }

    return NextResponse.json({ result })
  } catch (e) {
    console.error('Translate error:', e)
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
