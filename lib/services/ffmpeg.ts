// lib/services/ffmpeg.ts
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from '@ffmpeg/util';
import { v4 as uuidv4 } from 'uuid';

let ffmpeg: FFmpeg | null = null;

export async function convertToAudio(videoFile: File): Promise<Blob> {
  if (!ffmpeg) {
    ffmpeg = new FFmpeg();
    
    // Load FFmpeg
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    await ffmpeg.load({
      coreURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.js`,
        'text/javascript'
      ),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        'application/wasm'
      ),
    });
  }

  const inputFileName = `input-${uuidv4()}.mp4`;
  const outputFileName = `output-${uuidv4()}.mp3`;

  try {
    // Write the video file to FFmpeg's virtual filesystem
    await ffmpeg.writeFile(inputFileName, await fetchFile(videoFile));

    // Run the conversion
    await ffmpeg.exec([
      '-i', inputFileName,
      '-vn', // No video
      '-acodec', 'libmp3lame',
      '-ab', '128k', // Audio bitrate
      '-ar', '44100', // Sample rate
      outputFileName
    ]);

    // Read the output file
    const data = await ffmpeg.readFile(outputFileName);
    
    return new Blob([data], { type: 'audio/mp3' });

  } finally {
    // Clean up FFmpeg's virtual filesystem
    try {
      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);
    } catch (e) {
      console.error('Cleanup failed:', e);
    }
  }
}
