/**
 * Pre-recorded Audio Generator (Segment-based)
 *
 * Reads SegmentTeaching[] scripts and generates MP3 audio using Edge TTS (free).
 * Generates audio for:
 *   - lecture steps:  key = s{seg}-step{stepIdx}
 *   - check question: key = s{seg}-check{checkIdx}-question
 *   - check correct:  key = s{seg}-check{checkIdx}-correct
 *   - check wrong:    key = s{seg}-check{checkIdx}-wrong
 *
 * Usage:
 *   npx tsx scripts/generate-audio.ts --week 1
 *   npx tsx scripts/generate-audio.ts --week all
 *   npx tsx scripts/generate-audio.ts --week 1 --force        (overwrite existing)
 *   npx tsx scripts/generate-audio.ts --week all --lang zh     (Chinese zh-TW voices)
 *
 * Output:
 *   public/audio/teaching/week01/*.mp3          (English)
 *   public/audio/teaching-zh/week01/*.mp3       (Chinese)
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

// Edge TTS voice maps per language
const VOICE_MAP_EN: Record<string, { voice: string; rate?: string; pitch?: string }> = {
  drLin:    { voice: 'en-US-GuyNeural' },
  alex:     { voice: 'en-US-ChristopherNeural', rate: '+5%' },
  kenji:    { voice: 'en-US-BrianNeural', rate: '-5%' },
  priya:    { voice: 'en-US-JennyNeural' },
  david:    { voice: 'en-US-EricNeural', rate: '-5%', pitch: '-2Hz' },
  narrator: { voice: 'en-US-AriaNeural', rate: '-5%' },
};

const VOICE_MAP_ZH: Record<string, { voice: string; rate?: string; pitch?: string }> = {
  drLin:    { voice: 'zh-TW-YunJheNeural' },
  alex:     { voice: 'zh-TW-YunJheNeural', rate: '+5%' },
  kenji:    { voice: 'zh-TW-YunJheNeural', rate: '-5%' },
  priya:    { voice: 'zh-TW-HsiaoChenNeural' },
  david:    { voice: 'zh-TW-YunJheNeural', rate: '-5%', pitch: '-2Hz' },
  narrator: { voice: 'zh-TW-HsiaoChenNeural', rate: '-5%' },
};

type Lang = 'en' | 'zh';

function getVoiceMap(lang: Lang) {
  return lang === 'zh' ? VOICE_MAP_ZH : VOICE_MAP_EN;
}

interface AudioEntry {
  key: string;
  file: string;
  text: string;
  character: string;
}

async function generateEdgeTTS(
  text: string,
  character: string,
  outputPath: string,
  lang: Lang = 'en',
): Promise<boolean> {
  try {
    const { Communicate } = await import('edge-tts-universal');
    const voiceMap = getVoiceMap(lang);
    const config = voiceMap[character] || voiceMap.narrator;

    const communicate = new Communicate(text, {
      voice: config.voice,
      rate: config.rate,
      pitch: config.pitch,
      connectionTimeout: 10000,
    });

    const chunks: Buffer[] = [];
    for await (const chunk of communicate.stream()) {
      if (chunk.type === 'audio' && chunk.data) {
        chunks.push(chunk.data);
      }
    }

    if (chunks.length === 0) {
      throw new Error('No audio data received');
    }

    writeFileSync(outputPath, Buffer.concat(chunks));
    return true;
  } catch (err) {
    console.warn(`    Edge TTS failed: ${(err as Error).message}`);
    return false;
  }
}

/**
 * Collect all audio entries from a SegmentTeaching[] array.
 * Keys match what ClassroomTeacher.tsx expects.
 */
function collectEntries(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  segments: any[],
): AudioEntry[] {
  const entries: AudioEntry[] = [];

  for (let segIdx = 0; segIdx < segments.length; segIdx++) {
    const segment = segments[segIdx];
    if (!segment?.steps) continue;

    let checkCount = 0;

    for (let stepIdx = 0; stepIdx < segment.steps.length; stepIdx++) {
      const step = segment.steps[stepIdx];

      switch (step.type) {
        case 'lecture': {
          const key = `s${segIdx}-step${stepIdx}`;
          entries.push({
            key,
            file: `${key}.mp3`,
            text: step.text,
            character: step.character || 'drLin',
          });
          break;
        }
        case 'check': {
          // Question audio
          const qKey = `s${segIdx}-check${checkCount}-question`;
          entries.push({
            key: qKey,
            file: `${qKey}.mp3`,
            text: step.question,
            character: 'drLin',
          });
          // Correct feedback audio
          const cKey = `s${segIdx}-check${checkCount}-correct`;
          entries.push({
            key: cKey,
            file: `${cKey}.mp3`,
            text: step.onCorrect,
            character: 'drLin',
          });
          // Wrong feedback audio
          const wKey = `s${segIdx}-check${checkCount}-wrong`;
          entries.push({
            key: wKey,
            file: `${wKey}.mp3`,
            text: step.onWrong,
            character: 'drLin',
          });
          checkCount++;
          break;
        }
        // visual and discuss_timer don't need audio
      }
    }
  }

  return entries;
}

async function generateWeek(weekNum: number, force: boolean, lang: Lang = 'en') {
  const paddedWeek = String(weekNum).padStart(2, '0');

  // Dynamic import of teaching script (locale-aware)
  const dataSubdir = lang === 'zh' ? 'zh' : 'en';
  const teachingModule = await import(
    `../src/data/${dataSubdir}/teaching/week${paddedWeek}`
  );
  const teaching = teachingModule[`week${paddedWeek}Teaching`];

  if (!teaching || !Array.isArray(teaching)) {
    console.error(`Cannot find week${paddedWeek} teaching data for lang=${lang} (expected SegmentTeaching[])`);
    return { success: 0, failed: 0, skipped: 0 };
  }

  console.log(`\n=== Generating ${lang.toUpperCase()} audio for Week ${weekNum} (${teaching.length} segments) ===`);

  const entries = collectEntries(teaching);
  console.log(`  ${entries.length} audio files to generate\n`);

  // Create output directory (teaching/ for en, teaching-zh/ for zh)
  const audioSubdir = lang === 'zh' ? 'teaching-zh' : 'teaching';
  const outDir = join(process.cwd(), 'public', 'audio', audioSubdir, `week${paddedWeek}`);
  mkdirSync(outDir, { recursive: true });

  const manifest: Record<string, string> = {};
  let success = 0;
  let failed = 0;
  let skipped = 0;

  const CONCURRENCY = 5;

  async function processEntry(entry: AudioEntry, idx: number) {
    const outPath = join(outDir, entry.file);
    const relPath = `/audio/${audioSubdir}/week${paddedWeek}/${entry.file}`;

    // Skip existing files unless --force
    if (!force && existsSync(outPath)) {
      console.log(`  [${idx + 1}/${entries.length}] ${entry.key} — exists, skipping`);
      manifest[entry.key] = relPath;
      skipped++;
      return;
    }

    console.log(`  [${idx + 1}/${entries.length}] ${entry.key} (${entry.character}) — generating...`);

    const ok = await generateEdgeTTS(entry.text, entry.character, outPath, lang);

    if (ok) {
      manifest[entry.key] = relPath;
      success++;
      console.log(`  [${idx + 1}/${entries.length}] ${entry.key} — done`);
    } else {
      failed++;
      console.log(`  [${idx + 1}/${entries.length}] ${entry.key} — FAILED`);
    }
  }

  // Process in batches
  for (let i = 0; i < entries.length; i += CONCURRENCY) {
    const batch = entries.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map((entry, j) => processEntry(entry, i + j)));
  }

  // Write manifest (simple key → URL mapping, matching ClassroomTeacher expectations)
  const manifestPath = join(outDir, 'manifest.json');
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

  console.log(`\n  Week ${weekNum} done! Generated: ${success}, Skipped: ${skipped}, Failed: ${failed}`);
  console.log(`  Manifest: ${manifestPath}`);

  return { success, failed, skipped };
}

async function main() {
  const args = process.argv.slice(2);
  const weekArg =
    args.find((a) => a.startsWith('--week='))?.split('=')[1] ||
    args[args.indexOf('--week') + 1];
  const langArg =
    (args.find((a) => a.startsWith('--lang='))?.split('=')[1] ||
    args[args.indexOf('--lang') + 1] || 'en') as Lang;
  const force = args.includes('--force');

  if (!weekArg) {
    console.error('Usage: npx tsx scripts/generate-audio.ts --week <number|all> [--lang en|zh] [--force]');
    process.exit(1);
  }

  const lang: Lang = langArg === 'zh' ? 'zh' : 'en';
  console.log(`Language: ${lang === 'zh' ? '繁體中文 (zh-TW)' : 'English (en-US)'}`);

  let totalSuccess = 0;
  let totalFailed = 0;
  let totalSkipped = 0;

  if (weekArg === 'all') {
    for (let w = 1; w <= 8; w++) {
      const { success, failed, skipped } = await generateWeek(w, force, lang);
      totalSuccess += success;
      totalFailed += failed;
      totalSkipped += skipped;
    }
  } else {
    const weekNum = parseInt(weekArg, 10);
    const { success, failed, skipped } = await generateWeek(weekNum, force, lang);
    totalSuccess += success;
    totalFailed += failed;
    totalSkipped += skipped;
  }

  console.log(`\n==============================`);
  console.log(`Total: ${totalSuccess} generated, ${totalSkipped} skipped, ${totalFailed} failed`);
  console.log(`==============================`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
