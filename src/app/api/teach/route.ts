import { NextRequest, NextResponse } from "next/server";
import { createTeachingStream } from "@/lib/teach-engine";
import type { TeachingStep } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const { step, weekNum, stepIndex } = (await request.json()) as {
      step: TeachingStep;
      weekNum: number;
      stepIndex: number;
    };

    if (!step || weekNum == null) {
      return NextResponse.json(
        { error: "Missing step or weekNum" },
        { status: 400 },
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY not configured" },
        { status: 500 },
      );
    }

    const stream = await createTeachingStream(step, weekNum, stepIndex);

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[Teach API]", error);
    return NextResponse.json(
      { error: "Teaching generation failed" },
      { status: 500 },
    );
  }
}
