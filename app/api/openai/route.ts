import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const response = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
      response_format: "verbose_json",
      timestamp_granularities: ["word"]
    });

    return NextResponse.json({
      text: response.text,
      segments: response.segments,
      words: response.words,
    });
  } catch (error) {
    console.error('OpenAI transcription error:', error);
    return NextResponse.json({ error: 'Transcription failed' }, { status: 500 });
  }
}
