import { NextRequest, NextResponse } from 'next/server';
import { getTranscriptById } from '@/lib/services/transcriptService';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  try {
    const transcript = await getTranscriptById(id);
    return NextResponse.json({ transcript });
  } catch (error) {
    console.error('Error fetching transcript:', error);
    return NextResponse.json({ error: 'Failed to fetch transcript' }, { status: 500 });
  }
}
