import { config } from '@/lib/config';

export async function getTranscriptById(id: string) {
  try {
    const response = await fetch(`${config.apiBaseUrl}/api/transcribe/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch transcript');
    }
    const data = await response.json();
    return data.transcript;
  } catch (error) {
    console.error('Error fetching transcript:', error);
    throw error;
  }
}
