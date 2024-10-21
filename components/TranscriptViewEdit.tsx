'use client';

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Search, Download, Save, Edit2, Highlighter } from 'lucide-react'
import { VideoPlayer } from './VideoPlayer'

type TranscriptSegment = {
  id: number;
  time: string;
  speaker: string;
  text: string;
}

type TranscriptViewEditProps = {
  transcriptId: string
}

export default function TranscriptViewEdit({ transcriptId }: TranscriptViewEditProps) {
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([])
  const [selectedText, setSelectedText] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Fetch the transcript using the transcriptId
    const fetchTranscript = async () => {
      try {
        const response = await fetch(`/api/transcripts/${transcriptId}`)
        const data = await response.json()
        setTranscript(data.transcript)
      } catch (error) {
        console.error('Error fetching transcript:', error)
      }
    }

    fetchTranscript()
  }, [transcriptId])

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection) {
      const selectedText = selection.toString()
      setSelectedText(selectedText)
      // You can perform additional actions with the selected text here
    }
  }

  const handleDownloadTranscript = () => {
    // Implement download functionality
    console.log('Downloading transcript...')
  }

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log('Editing segment with id:', id)
  }

  const handleHighlight = () => {
    // Implement highlight functionality
    console.log('Highlighting selected text:', selectedText)
  }

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting selected text:', selectedText)
  }

  const handleSaveEdits = () => {
    // Implement save edits functionality
    console.log('Saving edits...')
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left column: Video player */}
      <div className="w-1/2 p-4 border-r">
        <VideoPlayer src="/placeholder-video.mp4" />
      </div>
      {/* Right column: Transcript panel */}
      <div className="w-1/2 p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex-1 mr-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search transcript..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleDownloadTranscript}>
            <Download className="mr-2 h-4 w-4" /> Download Full Transcript
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto mb-4" onMouseUp={handleTextSelection}>
          {transcript.map((segment) => (
            <div key={segment.id} className="mb-4 p-2 bg-secondary rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">{segment.time}</span>
                <span className="font-semibold">{segment.speaker}</span>
              </div>
              <Textarea
                value={segment.text}
                onChange={(e) => {
                  const updatedTranscript = transcript.map(s =>
                    s.id === segment.id ? { ...s, text: e.target.value } : s
                  )
                  setTranscript(updatedTranscript)
                }}
                className="mb-2"
              />
              <Button variant="outline" size="sm" onClick={() => handleEdit(segment.id)}>
                <Edit2 className="mr-2 h-4 w-4" /> Edit
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" onClick={handleHighlight}>
            <Highlighter className="mr-2 h-4 w-4" /> Highlight
          </Button>
          <Button variant="outline" onClick={handleExport}>
            Export Selected Text
          </Button>
        </div>
        <Button onClick={handleSaveEdits}>
          <Save className="mr-2 h-4 w-4" /> Save Edits
        </Button>
      </div>
    </div>
  )
}
