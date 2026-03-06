import { NextRequest, NextResponse } from "next/server";
import { createChatStream } from "@/lib/openai-chat";
import { WEEKS } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const { messages, week, locale } = (await request.json()) as {
      messages: { role: string; content: string; attachments?: { type: string; name: string; mimeType: string; data: string }[] }[];
      week?: number;
      locale?: string;
    };

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "Missing messages" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY not configured" },
        { status: 500 }
      );
    }

    let weekContext: string | undefined;

    if (week) {
      const weekInfo = WEEKS.find((w) => w.weekNumber === week);
      if (weekInfo) {
        weekContext = `Week ${week}: ${weekInfo.title}\nSubtitle: ${weekInfo.subtitle}\nKey concepts: ${weekInfo.keyConcepts.join(", ")}`;
      }
    }

    const stream = await createChatStream(
      messages as Parameters<typeof createChatStream>[0],
      weekContext,
      undefined,
      locale,
    );

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[Chat API]", error);
    return NextResponse.json(
      { error: "Chat failed" },
      { status: 500 }
    );
  }
}
