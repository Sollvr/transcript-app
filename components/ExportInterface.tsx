'use client';

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"

interface ExportInterfaceProps {
  transcriptId: string
}

const ExportInterface: React.FC<ExportInterfaceProps> = ({ transcriptId }) => {
  const [exportFormat, setExportFormat] = useState('txt')
  const [exportContent, setExportContent] = useState('full')
  const [fileName, setFileName] = useState('transcript')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedPortion, setSelectedPortion] = useState<string>('')

  useEffect(() => {
    // Fetch the full transcript
    const fetchTranscript = async () => {
      try {
        const response = await fetch(`/api/transcripts/${transcriptId}`);
        const data = await response.json();
        // Instead of storing the full transcript, we can use it to set the initial selected portion
        setSelectedPortion(data.transcript.substring(0, 100) + '...'); // Show first 100 characters as preview
      } catch (error) {
        console.error('Error fetching transcript:', error);
      }
    };

    fetchTranscript();
  }, [transcriptId]);

  const handleExport = () => {
    setIsGenerating(true)
    setProgress(0)

    // Simulate file generation process
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          // Simulated download
          console.log(`Downloading ${fileName}.${exportFormat}`)
          return 100
        }
        return prevProgress + 10
      })
    }, 500)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Export Transcript</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Export Format</Label>
          <RadioGroup defaultValue="txt" onValueChange={setExportFormat} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="txt" id="txt" />
              <Label htmlFor="txt">.txt</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pdf" id="pdf" />
              <Label htmlFor="pdf">.pdf</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Export Content</Label>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="full" 
                checked={exportContent === 'full'} 
                onCheckedChange={() => setExportContent('full')}
              />
              <Label htmlFor="full">Full Transcript</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="selected" 
                checked={exportContent === 'selected'} 
                onCheckedChange={() => setExportContent('selected')}
              />
              <Label htmlFor="selected">Selected Portions</Label>
            </div>
          </div>
        </div>

        {exportContent === 'selected' && (
          <div className="space-y-2">
            <Label>Preview</Label>
            <Card className="p-4 bg-muted">
              <p className="text-sm">{selectedPortion || 'No text selected'}</p>
            </Card>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="fileName">File Name</Label>
          <Input 
            id="fileName" 
            value={fileName} 
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Enter file name"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button 
          className="w-full" 
          onClick={handleExport} 
          disabled={isGenerating}
        >
          Generate and Download
        </Button>
        {isGenerating && (
          <div className="w-full space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-center text-sm text-muted-foreground">
              Generating file... {progress}%
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

export default ExportInterface;
