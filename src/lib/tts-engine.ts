import { createSign } from 'crypto';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { CharacterId } from '@/components/brand/BrandColors';

interface AudioResult {
  audio: Buffer;
  contentType: string;
  engine: string;
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timeout after ${ms}ms`)), ms)
    ),
  ]);
}

// Edge TTS voice mapping (en-US voices)
const EDGE_VOICE_MAP: Record<string, { voice: string; rate?: string; pitch?: string }> = {
  drLin:    { voice: 'en-US-GuyNeural' },
  alex:     { voice: 'en-US-JasonNeural' },
  kenji:    { voice: 'en-US-TonyNeural' },
  priya:    { voice: 'en-US-JennyNeural' },
  david:    { voice: 'en-US-DavisNeural' },
  narrator: { voice: 'en-US-AriaNeural', rate: '-10.00%' },
};

// Google TTS voice mapping
const GOOGLE_VOICE_MAP: Record<string, { name: string }> = {
  drLin:    { name: 'en-US-Wavenet-D' },
  alex:     { name: 'en-US-Wavenet-B' },
  kenji:    { name: 'en-US-Wavenet-J' },
  priya:    { name: 'en-US-Wavenet-F' },
  david:    { name: 'en-US-Wavenet-D' },
  narrator: { name: 'en-US-Wavenet-C' },
};

// OpenAI TTS voice mapping
const OPENAI_VOICE_MAP: Record<string, { voice: string; instructions: string }> = {
  drLin:    { voice: 'onyx',  instructions: 'Speak as an authoritative university professor in English' },
  alex:     { voice: 'echo',  instructions: 'Speak as a young energetic junior analyst in English' },
  kenji:    { voice: 'fable', instructions: 'Speak as a mature, serious risk manager in English' },
  priya:    { voice: 'nova',  instructions: 'Speak as a warm, professional data scientist in English' },
  david:    { voice: 'fable', instructions: 'Speak as a confident senior officer in English' },
  narrator: { voice: 'sage',  instructions: 'Speak as a neutral, warm narrator in English, slightly slower pace' },
};

// Google Service Account OAuth2
let cachedAccessToken: { token: string; expiry: number } | null = null;

function loadServiceAccount(): { client_email: string; private_key: string } | null {
  const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!saPath) {
    const defaultPath = join(process.cwd(), 'speak-user-test-a04e5374a72d.json');
    try {
      return JSON.parse(readFileSync(defaultPath, 'utf-8'));
    } catch {
      return null;
    }
  }
  try {
    return JSON.parse(readFileSync(saPath, 'utf-8'));
  } catch {
    return null;
  }
}

function createJWT(sa: { client_email: string; private_key: string }): string {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })).toString('base64url');

  const signInput = `${header}.${payload}`;
  const sign = createSign('RSA-SHA256');
  sign.update(signInput);
  const signature = sign.sign(sa.private_key, 'base64url');

  return `${signInput}.${signature}`;
}

async function getGoogleAccessToken(): Promise<string> {
  if (cachedAccessToken && Date.now() < cachedAccessToken.expiry - 300000) {
    return cachedAccessToken.token;
  }

  const sa = loadServiceAccount();
  if (!sa) throw new Error('Google service account not found');

  const jwt = createJWT(sa);

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Google OAuth2 failed: ${res.status} ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  cachedAccessToken = {
    token: data.access_token,
    expiry: Date.now() + (data.expires_in || 3600) * 1000,
  };

  return cachedAccessToken.token;
}

// Layer 1: Edge TTS (free)
async function edgeTTS(text: string, character: string): Promise<AudioResult> {
  const { Communicate } = await import('edge-tts-universal');
  const config = EDGE_VOICE_MAP[character] || EDGE_VOICE_MAP.narrator;

  const communicate = new Communicate(text, {
    voice: config.voice,
    rate: config.rate,
    pitch: config.pitch,
    connectionTimeout: 5000,
  });

  const chunks: Buffer[] = [];

  const collectAudio = async () => {
    for await (const chunk of communicate.stream()) {
      if (chunk.type === 'audio' && chunk.data) {
        chunks.push(chunk.data);
      }
    }
  };

  await withTimeout(collectAudio(), 10000, 'Edge TTS');

  if (chunks.length === 0) {
    throw new Error('Edge TTS returned no audio data');
  }

  return {
    audio: Buffer.concat(chunks),
    contentType: 'audio/mpeg',
    engine: 'edge',
  };
}

// Layer 2: Google Cloud TTS
async function googleTTS(text: string, character: string): Promise<AudioResult> {
  const accessToken = await getGoogleAccessToken();
  const config = GOOGLE_VOICE_MAP[character] || GOOGLE_VOICE_MAP.narrator;

  const res = await withTimeout(
    fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: 'en-US', name: config.name },
        audioConfig: { audioEncoding: 'MP3' },
      }),
    }),
    10000,
    'Google TTS'
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Google TTS failed: ${res.status} ${body.slice(0, 200)}`);
  }

  const { audioContent } = await res.json();
  const audio = Buffer.from(audioContent, 'base64');

  return { audio, contentType: 'audio/mpeg', engine: 'google' };
}

// Layer 3: OpenAI TTS
async function openaiTTS(text: string, character: string): Promise<AudioResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not configured');

  const config = OPENAI_VOICE_MAP[character] || OPENAI_VOICE_MAP.narrator;

  const { default: OpenAI } = await import('openai');
  const client = new OpenAI({ apiKey });

  const response = await withTimeout(
    client.audio.speech.create({
      model: 'gpt-4o-mini-tts',
      voice: config.voice as 'nova' | 'onyx' | 'echo' | 'shimmer' | 'fable' | 'sage',
      input: text,
      instructions: config.instructions,
      response_format: 'mp3',
    }),
    15000,
    'OpenAI TTS'
  );

  const arrayBuffer = await response.arrayBuffer();

  return {
    audio: Buffer.from(arrayBuffer),
    contentType: 'audio/mpeg',
    engine: 'openai',
  };
}

// 3-layer fallback
export async function synthesize(text: string, character: CharacterId): Promise<AudioResult> {
  try {
    return await edgeTTS(text, character);
  } catch (e) {
    console.warn('[TTS] Edge TTS failed, trying Google...', (e as Error).message);
  }

  try {
    return await googleTTS(text, character);
  } catch (e) {
    console.warn('[TTS] Google TTS failed, trying OpenAI...', (e as Error).message);
  }

  try {
    return await openaiTTS(text, character);
  } catch (e) {
    console.error('[TTS] All TTS engines failed', (e as Error).message);
    throw new Error('All TTS engines failed');
  }
}
