import { NextRequest, NextResponse } from "next/server";

// In-memory progress store for MVP
const progressStore = new Map<string, Record<string, unknown>>();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const week = searchParams.get("week");

  if (week) {
    const data = progressStore.get(`week-${week}`);
    return NextResponse.json({ progress: data ?? null });
  }

  const all: Record<string, unknown> = {};
  for (const [key, value] of progressStore.entries()) {
    all[key] = value;
  }
  return NextResponse.json({ progress: all });
}

export async function POST(request: NextRequest) {
  try {
    const { week, data } = (await request.json()) as {
      week: number;
      data: Record<string, unknown>;
    };

    if (!week || !data) {
      return NextResponse.json({ error: "Missing week or data" }, { status: 400 });
    }

    progressStore.set(`week-${week}`, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Progress API]", error);
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 });
  }
}
