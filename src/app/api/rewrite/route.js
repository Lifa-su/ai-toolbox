import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { text } = await req.json()
    if (!text || !text.trim()) {
      return NextResponse.json({ error: '请输入文本' }, { status: 400 })
    }
    if (text.length > 5000) {
      return NextResponse.json({ error: '文本不能超过5000字' }, { status: 400 })
    }

    const apiKey = process.env.DEEPSEEK_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: '未配置API Key，请在.env.local中设置DEEPSEEK_API_KEY' }, { status: 500 })
    }

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
            content: '你是一个专业的文本改写助手。请对用户提供的文本进行改写润色，要求：\n1. 保持原意不变\n2. 优化表达，使语言更流畅、更专业\n3. 修正语法错误\n4. 如果是中文就用中文回复，英文就用英文回复\n5. 只输出改写后的文本，不要加任何解释说明',
          },
          { role: 'user', content: text },
        ],
        temperature: 0.7,
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
    console.error('Rewrite error:', e)
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
