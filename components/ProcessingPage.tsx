'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, X } from "lucide-react";

export default function ProcessingPageComponent() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes in seconds
  const [notifyWhenComplete, setNotifyWhenComplete] = useState(false);

  // Placeholder for transcriptionId
  const transcriptionId = "your_transcription_id_logic_here"; // Replace with actual logic

  const steps = [
    "Uploading video",
    "Extracting audio",
    "Generating transcript",
    "Finalizing"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          // Navigate to the transcript view page
          router.push(`/transcript/${transcriptionId}`); // Ensure transcriptionId is available
          return 100;
        }
        return prevProgress + 1;
      });

      setTimeRemaining((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [transcriptionId]); // Add transcriptionId to the dependency array

  useEffect(() => {
    if (progress < 25) setCurrentStep(1);
    else if (progress < 50) setCurrentStep(2);
    else if (progress < 75) setCurrentStep(3);
    else setCurrentStep(4);
  }, [progress]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/5 animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="bg-background/80 backdrop-blur-sm rounded-lg shadow-lg p-8 max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Processing Your Video</h1>
          <p className="text-muted-foreground">Please wait while we work our magic</p>
        </div>

        {/* Progress circle */}
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-muted-foreground/20"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="44"
              cx="50"
              cy="50"
            />
            <circle
              className="text-primary"
              strokeWidth="8"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="44"
              cx="50"
              cy="50"
              style={{
                strokeDasharray: `${2 * Math.PI * 44}`,
                strokeDashoffset: `${2 * Math.PI * 44 * (1 - progress / 100)}`,
                transition: 'stroke-dashoffset 0.5s ease 0s',
              }}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold">
            {progress}%
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                index + 1 < currentStep ? 'bg-primary text-primary-foreground' : 
                index + 1 === currentStep ? 'bg-primary/50 text-primary-foreground' : 
                'bg-muted text-muted-foreground'
              }`}>
                {index + 1 < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              <span className={index + 1 <= currentStep ? 'text-foreground' : 'text-muted-foreground'}>
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* Estimated time */}
        <div className="text-center text-muted-foreground">
          Estimated time remaining: {formatTime(timeRemaining)}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button variant="outline" className="space-x-2">
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </Button>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Notify me when complete</span>
            <Switch
              checked={notifyWhenComplete}
              onCheckedChange={setNotifyWhenComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
