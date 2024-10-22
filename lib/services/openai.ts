// lib/services/openai.ts
export async function transcribeAudio(audioFile: File) {
    const formData = new FormData()
    formData.append('audio', audioFile)
  
    const response = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData,
    })
  
    if (!response.ok) {
      throw new Error('Failed to transcribe audio')
    }
  
    return response.json()
  }