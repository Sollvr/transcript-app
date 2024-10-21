'use client';
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Zap, Search, Download, Video, CheckCircle } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <FileText className="h-6 w-6 mr-2" />
          <span className="font-bold text-lg">TranscriptPro</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="outline">Log In</Button>
          <Button>Sign Up</Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                height="550"
                src="/placeholder.svg?height=550&width=550"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Transform Your Videos into Searchable Text
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Unlock the power of your video content with our advanced AI-powered transcription service.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">Get Started</Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Features</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Video className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Video Transcription</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Convert your videos to text with high accuracy
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Zap className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">AI-Powered Accuracy</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Leverage cutting-edge AI for precise transcriptions
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Search className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Searchable Transcripts</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Easily find and navigate through your transcripts
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Download className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Easy Export</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Download your transcripts in various formats
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How it Works</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-muted p-4 rounded-lg">
                <div className="p-2 bg-muted rounded-full">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">1. Upload Your Video</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Simply upload your video file to our secure platform
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-muted p-4 rounded-lg">
                <div className="p-2 bg-muted rounded-full">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">2. AI Transcription</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Our AI processes and transcribes your video with high accuracy
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-muted p-4 rounded-lg">
                <div className="p-2 bg-muted rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">3. Review and Download</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Review your transcript, make any edits, and download
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 TranscriptPro. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}