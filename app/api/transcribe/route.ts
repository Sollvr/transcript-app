// app/api/transcribe/route.ts



import { NextResponse } from 'next/server'



import OpenAI from 'openai'







const openai = new OpenAI({



  apiKey: process.env.OPENAI_API_KEY,



})







export async function POST(request: Request) {



  try {



    const formData = await request.formData()



    const audioFile = formData.get('audio') as File







    if (!audioFile) {



      return NextResponse.json(



        { error: 'No audio file provided' },



        { status: 400 }



      )



    }







    const transcript = await openai.audio.transcriptions.create({



      file: audioFile,



      model: "whisper-1",



      response_format: "verbose_json",



      timestamp_granularities: ["word"],



      // Add language parameter if supported
      language: "en" // Specify the desired language code



    })







    return NextResponse.json({ text: transcript.text })



  } catch (error) {



    console.error('Transcription error:', error)



    return NextResponse.json(



      { error: 'Failed to transcribe audio' },



      { status: 500 }



    )



  }



}







export const config = {



  api: {



    bodyParser: {



      sizeLimit: '500mb',



    },



  },



}






