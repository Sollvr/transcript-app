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
    <div>
      <h1>Transcript Page for ID: {id}</h1>
      <TranscriptViewEdit transcriptId={id} />
    </div>
  )
}
