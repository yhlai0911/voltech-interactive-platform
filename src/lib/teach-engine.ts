import OpenAI from 'openai';
import type { TeachingStep } from '@/types';

const TEACHING_SYSTEM_PROMPT = `You are Dr. Lin, a 52-year-old professor of Financial Management at a university. You previously served as head of quantitative risk at a major investment bank for over 20 years.

Your teaching style (follow strictly):
- You are LECTURING to students in a classroom, not reading from notes
- Reinterpret material in your own words, adding personal experience and insight
- Use vivid analogies to make abstract concepts concrete
- Intersperse real-world examples ("When I was running the risk desk at the bank...")
- Frequently pose questions to make students think ("Consider this..." "What would happen if...")
- Repeat important concepts 2-3 times using different explanations to ensure understanding
- Tone: warm but authoritative, occasionally humorous, like a beloved professor

Format rules:
- Reply in English
- Plain text output, no Markdown formatting (no #, *, - etc.)
- No LaTeX formula syntax, express formulas in spoken language
- Each teaching segment: 250-500 words
- Natural opening, body, and closing rhythm
- Separate paragraphs with blank lines for readability`;

export function stepToTeachingPrompt(
  step: TeachingStep,
  weekNum: number,
  stepIndex: number,
): string {
  let content = `You are teaching Week ${weekNum}, step ${stepIndex + 1}.\n\n`;

  switch (step.type) {
    case 'lecture':
      content += `[LECTURE] Character: ${step.character}\n`;
      content += `Text: ${step.text}\n`;
      if (step.note) content += `Key note: ${step.note}\n`;
      content += `\nYour task: Expand on this lecture point. Explain the concept deeply and clearly, adding analogies, personal experience, and practical examples. Help students truly understand.`;
      break;

    case 'check':
      content += `[QUICK CHECK QUESTION]\n`;
      content += `Question: ${step.question}\n`;
      content += `Options: ${step.options.join(' | ')}\n`;
      content += `Correct: Option ${step.correctIndex + 1}\n`;
      content += `\nYour task: Present this question engagingly. Guide students through the reasoning process. Analyze why the correct answer is right and common misconceptions.`;
      break;

    case 'visual':
      content += `[VISUAL DISPLAY] Component: ${step.component}\n`;
      if (step.caption) content += `Caption: ${step.caption}\n`;
      content += `\nYour task: Describe what students should observe in this visual display. Explain the key patterns, relationships, or insights the chart reveals.`;
      break;

    case 'discuss_timer':
      content += `[GROUP DISCUSSION] Duration: ${step.durationMinutes} minutes\n`;
      content += `Prompt: ${step.prompt}\n`;
      if (step.guidePoints) content += `Guide points: ${step.guidePoints.join('; ')}\n`;
      content += `\nYour task: Frame this discussion topic. Explain why it matters and suggest different angles students might consider.`;
      break;
  }

  return content;
}

export async function createTeachingStream(
  step: TeachingStep,
  weekNum: number,
  stepIndex: number,
): Promise<ReadableStream<Uint8Array>> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const userPrompt = stepToTeachingPrompt(step, weekNum, stepIndex);

  const stream = client.chat.completions.stream({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: TEACHING_SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.8,
    max_tokens: 1500,
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
