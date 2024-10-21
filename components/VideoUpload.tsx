'use client'



import React, { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'

import { Progress } from '@/components/ui/progress'

import { Upload, Play } from 'lucide-react'

// Remove the unused Link import

// import Link from 'next/link'



export default function VideoUpload() {

  const [activeTab, setActiveTab] = useState('upload')

  const [uploadProgress, setUploadProgress] = useState(0)

  const [estimatedTime, setEstimatedTime] = useState(0)

  const [isUploading, setIsUploading] = useState(false)



  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];

    if (file) {

      console.log('File selected:', file.name);

      // Simulating file upload

      setIsUploading(true)

      const interval = setInterval(() => {

        setUploadProgress((prevProgress) => {

          if (prevProgress >= 100) {

            clearInterval(interval)

            setIsUploading(false)

            return 100

          }

          return prevProgress + 10

        })

        setEstimatedTime((prevTime) => Math.max(0, prevTime - 1))

      }, 500)

      setEstimatedTime(10) // Starting with 10 seconds estimation

    }

  }



  return (

    <div className="max-w-2xl mx-auto p-4 space-y-8">

      <h1 className="text-3xl font-bold text-center">TranscriptPro</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

        <TabsList className="grid w-full grid-cols-2">

          <TabsTrigger value="upload">Upload Video</TabsTrigger>

          <TabsTrigger value="youtube">YouTube Link</TabsTrigger>

        </TabsList>

        <TabsContent value="upload" className="space-y-4">

          <div 

            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"

            onClick={() => document.getElementById('file-upload')?.click()}

          >

            <Upload className="mx-auto h-12 w-12 text-gray-400" />

            <p className="mt-2 text-sm text-gray-500">Drag & Drop your video here or click to browse</p>

          </div>

          <input 

            id="file-upload" 

            type="file" 

            className="hidden" 

            onChange={handleFileUpload}

            accept="video/*"

          />

          <Button onClick={() => document.getElementById('file-upload')?.click()} className="w-full">

            Select File

          </Button>

        </TabsContent>

        <TabsContent value="youtube" className="space-y-4">

          <div className="flex space-x-2">

            <Input placeholder="Paste YouTube URL here" />

            <Button variant="outline">Paste</Button>

          </div>

        </TabsContent>

      </Tabs>

      <Button className="w-full" disabled={isUploading}>

        <Play className="mr-2 h-4 w-4" /> Start Transcription

      </Button>

      {isUploading && (

        <div className="space-y-2">

          <Progress value={uploadProgress} className="w-full" />

          <p className="text-sm text-gray-500 text-center">

            Uploading... {uploadProgress}% complete

          </p>

          <p className="text-sm text-gray-500 text-center">

            Estimated time remaining: {estimatedTime} seconds

          </p>

        </div>

      )}

    </div>

  )

}


