'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

import { useRouter } from 'next/navigation';



const Tabs = dynamic(() => import('@/components/ui/tabs').then(mod => mod.Tabs));

const TabsContent = dynamic(() => import('@/components/ui/tabs').then(mod => mod.TabsContent));

const TabsList = dynamic(() => import('@/components/ui/tabs').then(mod => mod.TabsList));

const TabsTrigger = dynamic(() => import('@/components/ui/tabs').then(mod => mod.TabsTrigger));

const Input = dynamic(() => import('@/components/ui/input').then(mod => mod.Input));

const Button = dynamic(() => import('@/components/ui/button').then(mod => mod.Button));

const Progress = dynamic(() => import('@/components/ui/progress').then(mod => mod.Progress));



import { Upload, Play } from 'lucide-react';

import { convertToAudio } from '@/lib/services/ffmpeg';

import { transcribeAudio } from '@/lib/services/openai';



const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB in bytes



export default function UploadPage() {

  const router = useRouter();

  const [activeTab, setActiveTab] = useState('upload');

  const [file, setFile] = useState<File | null>(null);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [estimatedTime, setEstimatedTime] = useState(0);

  const [isUploading, setIsUploading] = useState(false);

  const [isConverting, setIsConverting] = useState(false);

  const [isTranscribing, setIsTranscribing] = useState(false);

  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const [transcriptionResult, setTranscriptionResult] = useState<string | null>(null);

  const [transcriptId, setTranscriptId] = useState<string | null>(null);



  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files) {

      const selectedFile = e.target.files[0];

      

      if (!selectedFile.type.startsWith('video/')) {

        alert('Please select a video file (MP4 or MOV)');

        return;

      }



      if (selectedFile.size > MAX_FILE_SIZE) {

        alert('File is too large. Please select a file under 500MB');

        return;

      }



      console.log('File selected:', {

        name: selectedFile.name,

        type: selectedFile.type,

        size: `${(selectedFile.size / (1024 * 1024)).toFixed(2)}MB`

      });



      setFile(selectedFile);

      setUploadProgress(0);

      setEstimatedTime(0);

      setTranscriptionResult(null);

      setAudioBlob(null);

    }

  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      console.error('No file selected.');
      return;
    }

    try {
      setIsConverting(true);
      console.log('Starting conversion process...');
      
      const convertedAudio = await convertToAudio(file);
      console.log('Conversion successful, audio size:', convertedAudio.size);
      
      setAudioBlob(convertedAudio);
      setIsConverting(false);
      setIsTranscribing(true);
      const audioFile = new File([convertedAudio], 'audio.mp3', { type: 'audio/mp3' });
      const transcription = await transcribeAudio(audioFile);
      console.log('Transcription result:', transcription);
      setTranscriptionResult(transcription.text);

      // Store the transcript in KV storage
      const transcriptId = await storeTranscript(transcription);

      // Simulate processing completion
      setUploadProgress(100);
      setTimeout(() => {
        router.push(`/transcript/${transcriptId}`);
      }, 1000);

    } catch (error) {
      console.error('Process failed:', error);
      setTranscriptionResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
      setIsConverting(false);
      setIsTranscribing(false);
    }
  };



  // Add this function to store the transcript
  async function storeTranscript(transcription: any) {
    const response = await fetch('/api/store-transcript', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transcription),
    });

    if (!response.ok) {
      throw new Error('Failed to store transcript');
    }

    const { id } = await response.json();
    return id;
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


