'use client';

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from 'lucide-react'

type TranscriptViewEditProps = {
  transcriptId: string
}

type TranscriptSegment = {
  text: string;
  start: number;
  end: number;
}

export default function TranscriptViewEdit({ transcriptId }: TranscriptViewEditProps) {
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const response = await fetch(`/api/transcripts/${transcriptId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch transcript');
        }
        const data = await response.json();
        setTranscript(data.transcript);
      } catch (err) {
        setError('Failed to load transcript. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranscript();
  }, [transcriptId]);

  const handleEdit = (index: number, newText: string) => {
    setTranscript(prev => 
      prev.map((segment, i) => 
        i === index ? { ...segment, text: newText } : segment
      )
    );
  };

  const handleSave = async () => {
    // Implement save functionality here
    console.log('Saving transcript:', transcript);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Transcript: {transcriptId}</h2>
      {transcript.map((segment, index) => (
        <div key={index} className="space-y-2">
          <div className="text-sm text-gray-500">
            {new Date(segment.start * 1000).toISOString().substr(11, 8)} - 
            {new Date(segment.end * 1000).toISOString().substr(11, 8)}
          </div>
          <Textarea
            value={segment.text}
            onChange={(e) => handleEdit(index, e.target.value)}
            className="w-full"
          />
        </div>
      ))}
      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  )
}
