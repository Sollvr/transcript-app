// lib/services/ffmpeg.ts
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;

export async function convertToAudio(videoFile: File): Promise<Blob> {
  try {
    if (!ffmpeg) {
      ffmpeg = new FFmpeg();
      
      ffmpeg.on('progress', ({ progress, time }) => {
        console.log('FFmpeg Progress:', progress, 'Time:', time);
      });

      console.log('Initializing FFmpeg...');
      
      try {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
        await ffmpeg.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        console.log('FFmpeg loaded successfully');
      } catch (loadError) {
        console.error('FFmpeg load error:', loadError);
        throw new Error(`Failed to load FFmpeg: ${loadError}`);
      }
    }

    const inputFileName = `input-${Date.now()}.mp4`;
    const outputFileName = `output-${Date.now()}.mp3`;

    try {
      console.log('Writing input file...');
      await ffmpeg.writeFile(inputFileName, await fetchFile(videoFile));
      console.log('Input file written successfully');

      console.log('Starting conversion...');
      // Optimized FFmpeg command for faster processing
      await ffmpeg.exec([
        '-i', inputFileName,
        '-vn',                // No video
        '-acodec', 'libmp3lame',
        '-ac', '1',          // Mono channel (instead of stereo)
        '-ar', '16000',      // Lower sample rate (16kHz is enough for speech)
        '-b:a', '32k',       // Lower bitrate
        '-preset', 'ultrafast', // Fastest encoding
        '-movflags', '+faststart',
        '-y',                // Overwrite output
        outputFileName
      ]);

      console.log('Conversion command completed');
      const data = await ffmpeg.readFile(outputFileName);
      const audioBlob = new Blob([data], { type: 'audio/mp3' });

      // Cleanup
      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);
      
      return audioBlob;

    } catch (error) {
      console.error('Conversion error:', error);
      throw error;
    }
  } catch (error) {
    console.error('FFmpeg error:', error);
    throw error;
  }
}