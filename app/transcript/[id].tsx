import React from 'react';
import { useRouter } from 'next/router';

const TranscriptPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Transcript</h1>
      <p className="text-center">Transcript ID: {id}</p>
      {/* Add logic to fetch and display the transcript using the ID */}
    </div>
  );
};

export default TranscriptPage;
