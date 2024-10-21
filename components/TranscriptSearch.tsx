'use client';

import React from 'react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

const TranscriptSearch: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentTimestamp, setCurrentTimestamp] = useState("00:00:00")
  const [timeRange, setTimeRange] = useState([0, 100])

  const mockResults = [
    { id: 1, text: "This is a sample transcript with a <mark>highlighted</mark> term.", timestamp: "00:01:23", speaker: "John" },
    { id: 2, text: "Another example of a <mark>highlighted</mark> term in context.", timestamp: "00:02:45", speaker: "Sarah" },
    { id: 3, text: "The third result also contains a <mark>highlighted</mark> word.", timestamp: "00:03:56", speaker: "Mike" },
    { id: 4, text: "Here's one more instance of a <mark>highlighted</mark> phrase.", timestamp: "00:05:12", speaker: "Emma" },
  ]

  const handleJumpTo = (timestamp: string) => {
    setCurrentTimestamp(timestamp)
    // In a real implementation, this would also seek the video to the correct timestamp
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-4">TranscriptPro Search</h1>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <Label htmlFor="search" className="mb-2 block">Search Transcripts</Label>
            <Input id="search" placeholder="Enter search term..." className="w-full" />
          </div>
          <div className="w-48">
            <Label htmlFor="time-range" className="mb-2 block">Time Range</Label>
            <Slider
              id="time-range"
              min={0}
              max={100}
              step={1}
              value={timeRange}
              onValueChange={setTimeRange}
              className="w-full"
            />
          </div>
          <div className="w-48">
            <Label htmlFor="speaker" className="mb-2 block">Speaker</Label>
            <Select defaultValue="all">
              <SelectTrigger id="speaker">
                <SelectValue placeholder="Select speaker" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Speakers</SelectItem>
                <SelectItem value="john">John</SelectItem>
                <SelectItem value="sarah">Sarah</SelectItem>
                <SelectItem value="mike">Mike</SelectItem>
                <SelectItem value="emma">Emma</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Search</Button>
        </div>
      </header>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          <ul className="space-y-4">
            {mockResults.map((result) => (
              <li key={result.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold">{result.speaker}</span>
                  <Button variant="outline" size="sm" onClick={() => handleJumpTo(result.timestamp)}>
                    Jump to {result.timestamp}
                  </Button>
                </div>
                <p dangerouslySetInnerHTML={{ __html: result.text }} />
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-8">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <span>Page {currentPage}</span>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage + 1)}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Video Player</h2>
          <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <Play className="h-12 w-12 text-gray-400" />
          </div>
          <p className="text-center">Current Timestamp: {currentTimestamp}</p>
        </div>
      </div>
    </div>
  )
}

export default TranscriptSearch
