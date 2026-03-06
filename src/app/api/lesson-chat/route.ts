import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const LESSON_ASSISTANT_SYSTEM = `You are Dr. Lin's AI teaching assistant for the Financial Management: Volatility, Risk, and AI course. You are in lesson-page assistant mode. Only answer questions within this week's scope. Keep answers under 200 words. Reply in English. Use Markdown for formatting.`;

export async function POST(request: NextRequest) {
  try {
    const { messages, weekNum, lessonContext } = (await request.json()) as {
      messages: { role: string; content: string }[];
      weekNum: number;
      lessonContext?: string;
    };

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "Missing messages" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    let systemPrompt = LESSON_ASSISTANT_SYSTEM;
    if (lessonContext) {
      systemPrompt += `\n\n${lessonContext}`;
    }

    const openaiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    const stream = client.chat.completions.stream({
      model: "gpt-4o",
      messages: openaiMessages,
      temperature: 0.7,
      max_tokens: 600,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        stream.on("content", (delta) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ content: delta })}\n\n`)
          );
        });

        stream.on("end", () => {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        });

        stream.on("error", (err) => {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: (err as Error).message })}\n\n`
            )
          );
          controller.close();
        });
      },
    });

    return new NextResponse(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[Lesson Chat API]", error);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
