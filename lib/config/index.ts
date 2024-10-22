export const config = {
    api: {
      bodyParser: {
        sizeLimit: '500mb',
      },
    },
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      model: 'whisper-1',
    },
    youtube: {
      apiKey: process.env.YOUTUBE_API_KEY,
    },
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  };
