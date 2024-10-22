'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';





const Tabs = dynamic(() => import('@/components/ui/tabs').then(mod => mod.Tabs));

const TabsContent = dynamic(() => import('@/components/ui/tabs').then(mod => mod.TabsContent));

const TabsList = dynamic(() => import('@/components/ui/tabs').then(mod => mod.TabsList));

const TabsTrigger = dynamic(() => import('@/components/ui/tabs').then(mod => mod.TabsTrigger));

const Input = dynamic(() => import('@/components/ui/input').then(mod => mod.Input));

const Button = dynamic(() => import('@/components/ui/button').then(mod => mod.Button));

const Progress = dynamic(() => import('@/components/ui/progress').then(mod => mod.Progress));



import { Upload, Play } from 'lucide-react'

import { convertToAudio } from '@/lib/services/ffmpeg';

import { transcribeAudio } from '@/lib/services/openai';



export default function UploadPage() {

  const [activeTab, setActiveTab] = useState('upload')

  const [file, setFile] = useState<File | null>(null);

  const [uploadProgress, setUploadProgress] = useState(0)

  const [estimatedTime, setEstimatedTime] = useState(0)

  const [isUploading, setIsUploading] = useState(false)

  const [isConverting, setIsConverting] = useState(false)

  const [isTranscribing, setIsTranscribing] = useState(false)

  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const [transcriptionResult, setTranscriptionResult] = useState<string | null>(null);



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files) {

      setFile(e.target.files[0]);

      handleFileUpload();

    }

  };



  const handleFileUpload = () => {

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



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!file) return;



    setIsConverting(true);

    try {

      const audioBlob = await convertToAudio(file);

      setAudioBlob(audioBlob);

    } catch (error) {

      console.error('Audio conversion failed:', error);

      setIsConverting(false);

      return;

    }

    setIsConverting(false);



    if (!audioBlob) {

      console.error('Audio conversion failed');

      return;

    }



    setIsTranscribing(true);

    try {

      const audioFile = new File([audioBlob], 'audio.mp3', { type: 'audio/mpeg' });

      const transcription = await transcribeAudio(audioFile);

      console.log('Transcription:', transcription);

      setTranscriptionResult(transcription.text);

    } catch (error) {

      console.error('Transcription failed:', error);

      setTranscriptionResult('Transcription failed. Please try again.');

    }

    setIsTranscribing(false);

  };



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

            onClick={() => document.getElementById('file-upload')!.click()}

          >

            <Upload className="mx-auto h-12 w-12 text-gray-400" />

            <p className="mt-2 text-sm text-gray-500">Drag & Drop your video here or click to browse</p>

          </div>

          <input 

            id="file-upload" 

            type="file" 

            className="hidden" 

            onChange={handleFileChange}

            accept="video/*"

          />

          <Button onClick={() => document.getElementById('file-upload')!.click()} className="w-full">

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

      <Button 

        className="w-full" 

        disabled={isUploading || isConverting || isTranscribing || !file} 

        onClick={handleSubmit}

      >

        <Play className="mr-2 h-4 w-4" /> 

        {isConverting ? 'Converting...' : isTranscribing ? 'Transcribing...' : 'Start Transcription'}

      </Button>

      {(isUploading || isConverting || isTranscribing) && (

        <div className="space-y-2">

          <Progress value={uploadProgress} className="w-full" />

          <p className="text-sm text-gray-500 text-center">

            {isUploading ? `Uploading... ${uploadProgress}% complete` :

             isConverting ? 'Converting video to audio...' :

             'Transcribing audio...'}

          </p>

          {isUploading && (

            <p className="text-sm text-gray-500 text-center">

              Estimated time remaining: {estimatedTime} seconds

            </p>

          )}

        </div>

      )}

      {transcriptionResult && (

        <div className="mt-8 p-4 bg-gray-100 rounded-lg">

          <h2 className="text-xl font-bold mb-2">Transcription Result:</h2>

          <p>{transcriptionResult}</p>

        </div>

      )}

    </div>

  );

}


