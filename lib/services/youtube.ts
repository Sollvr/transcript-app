import { config } from '../config';

export async function getVideoInfo(videoId: string) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${config.youtube.apiKey}&part=snippet,contentDetails`
  );
  
  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.statusText}`);
  }
  
  return response.json();
}