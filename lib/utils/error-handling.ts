export class TranscriptionError extends Error {
    constructor(
      message: string,
      public code: string,
      public status: number = 500
    ) {
      super(message);
      this.name = 'TranscriptionError';
    }
  }
  
  export function handleTranscriptionError(error: any) {
    if (error.code === 'RATE_LIMIT_EXCEEDED') {
      throw new TranscriptionError('Rate limit exceeded', 'RATE_LIMIT_EXCEEDED', 429);
    } else if (error.code === 'INVALID_FILE_FORMAT') {
      throw new TranscriptionError('Invalid file format', 'INVALID_FILE_FORMAT', 400);
    }
    throw new TranscriptionError('Internal server error', 'INTERNAL_ERROR', 500);
  }
