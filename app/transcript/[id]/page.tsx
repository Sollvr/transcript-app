import React from 'react'
import TranscriptViewEdit from '@/components/TranscriptViewEdit'

type Params = {
  id: string
}

type TranscriptPageProps = {
  params: Params
}

export default function TranscriptPage({ params }: TranscriptPageProps) {
  const { id } = params

  return (
    <div className="container mx-auto p-4">
      <TranscriptViewEdit transcriptId={id} />
    </div>
  )
}
