import OpenAI from 'openai';

interface ChatMsg {
  role: 'user' | 'assistant' | 'system';
  content: string;
  attachments?: { type: string; name: string; mimeType: string; data: string }[];
}

const DR_LIN_SYSTEM_EN = `You are Dr. Lin, a 52-year-old professor who previously worked as head of quantitative risk at a major investment bank. You now teach Financial Management: Volatility, Risk, and AI. You use Socratic questioning, real-world anecdotes, and encourage students to think critically about risk models. Reply in English, use Markdown, keep answers under 300 words.

Rules:
- Use clear bullet points or tables when presenting frameworks
- If a student asks something outside the course scope, gently redirect
- Never give specific investment advice`;

const DR_LIN_SYSTEM_ZH = `你是林博士（Dr. Lin），一位 52 歲的教授，曾任大型投資銀行量化風險部門主管。你現在教授「財務管理：波動率、風險與 AI」課程。你善於使用蘇格拉底式提問法、現實世界案例，鼓勵學生批判性思考風險模型。請用繁體中文回覆，使用 Markdown 格式，回答控制在 300 字以內。

規則：
- 在介紹框架時使用清楚的條列式或表格
- 若學生問到課程範圍外的問題，溫和地引導回來
- 絕不提供具體投資建議
- 技術術語首次出現時用「中文（English）」格式，例如：波動率（Volatility）`;

export function buildSystemPrompt(
  weekContext?: string,
  lessonContext?: string,
  locale?: string,
): string {
  let prompt = locale === 'zh' ? DR_LIN_SYSTEM_ZH : DR_LIN_SYSTEM_EN;

  if (lessonContext) {
    prompt += `\n\n${lessonContext}`;
  }

  if (weekContext) {
    prompt += `\n\nCurrent week context:\n${weekContext}`;
  }

  return prompt;
}

export async function createChatStream(
  messages: ChatMsg[],
  weekContext?: string,
  lessonContext?: string,
  locale?: string,
): Promise<ReadableStream<Uint8Array>> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const systemPrompt = buildSystemPrompt(weekContext, lessonContext, locale);

  const openaiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt },
    ...messages.map(m => {
      const hasImages = m.attachments?.some(a => a.type === 'image');
      const fileTexts = m.attachments
        ?.filter(a => a.type === 'file')
        .map(a => `\n\n[Attachment: ${a.name}]\n${a.data}`)
        .join('') ?? '';

      if (hasImages && m.role === 'user') {
        const parts: OpenAI.Chat.Completions.ChatCompletionContentPart[] = [
          { type: 'text', text: m.content + fileTexts },
          ...m.attachments!
            .filter(a => a.type === 'image')
            .map(a => ({
              type: 'image_url' as const,
              image_url: { url: `data:${a.mimeType};base64,${a.data}` },
            })),
        ];
        return { role: 'user' as const, content: parts };
      }

      return {
        role: m.role as 'user' | 'assistant',
        content: m.content + fileTexts,
      };
    }),
  ];

  const stream = client.chat.completions.stream({
    model: 'gpt-4o',
    messages: openaiMessages,
    temperature: 0.7,
    max_tokens: 1000,
  });

  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      stream.on('content', (delta) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: delta })}\n\n`));
      });

      stream.on('end', () => {
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      });

      stream.on('error', (err) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: (err as Error).message })}\n\n`));
        controller.close();
      });
    },
  });
}
