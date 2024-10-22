// lib/services/openai.ts
export async function transcribeAudio(audioFile: File) {
  const formData = new FormData()
  formData.append('audio', audioFile)
  
  const response = await fetch('/api/transcribe', {
    method: 'POST',
    body: formData,
  })
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to transcribe audio');
  }
  
  return response.json()
}
