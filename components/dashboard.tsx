'use client';
import React from "react"

import { Button } from "@/components/ui/button"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { ScrollArea } from "@/components/ui/scroll-area"

import {

  BarChart,

  FileAudio,

  HelpCircle,

  Home,

  LogOut,

  Plus,

  Search,

  Settings,

  User,

} from "lucide-react"

import Link from "next/link"



export default function Dashboard() {

  const user = {

    name: "John Doe",

    plan: "Pro",

  }



  const recentTranscripts = [

    { id: 1, title: "Team Meeting", date: "2023-05-15", duration: "45:30", language: "English" },

    { id: 2, title: "Client Interview", date: "2023-05-14", duration: "32:15", language: "Spanish" },

    { id: 3, title: "Product Presentation", date: "2023-05-13", duration: "28:45", language: "English" },

    { id: 4, title: "Podcast Episode", date: "2023-05-12", duration: "59:00", language: "French" },

    { id: 5, title: "Lecture Recording", date: "2023-05-11", duration: "1:15:30", language: "German" },

    { id: 6, title: "Conference Call", date: "2023-05-10", duration: "52:20", language: "English" },

  ]



  const stats = {

    totalTranscripts: 42,

    hoursTranscribed: 28.5,

  }



  return (

    <div className="flex h-screen bg-background">

      {/* Sidebar */}

      <aside className="hidden w-64 border-r bg-muted/40 lg:block">

        <div className="flex h-full flex-col">

          <div className="flex h-14 items-center border-b px-4">

            <Link href="/" className="flex items-center font-semibold">

              <FileAudio className="mr-2 h-6 w-6" />

              TranscriptPro

            </Link>

          </div>

          <ScrollArea className="flex-1 py-2">

            <nav className="grid gap-1 px-2">

              {[

                { icon: Home, label: "Home", href: "/" },

                { icon: Plus, label: "New Transcript", href: "/new" },

                { icon: FileAudio, label: "My Transcripts", href: "/transcripts" },

                { icon: Settings, label: "Account Settings", href: "/settings" },

                { icon: HelpCircle, label: "Help", href: "/help" },

              ].map((item, index) => (

                <Link

                  key={index}

                  href={item.href}

                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"

                >

                  <item.icon className="h-4 w-4" />

                  {item.label}

                </Link>

              ))}

            </nav>

          </ScrollArea>

          <div className="mt-auto border-t p-4">

            <Button variant="ghost" className="w-full justify-start" asChild>

              <Link href="/logout" className="flex items-center gap-2">

                <LogOut className="h-4 w-4" />

                Logout

              </Link>

            </Button>

          </div>

        </div>

      </aside>



      {/* Main Content */}

      <main className="flex flex-1 flex-col overflow-hidden">

        {/* Header */}

        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">

          <form className="flex-1">

            <div className="relative">

              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

              <Input

                type="search"

                placeholder="Search transcripts..."

                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"

              />

            </div>

          </form>

          <Button variant="ghost" size="icon" className="rounded-full">

            <User className="h-5 w-5" />

            <span className="sr-only">User menu</span>

          </Button>

        </header>



        {/* Dashboard Content */}

        <div className="flex flex-1 overflow-hidden">

          <div className="flex-1 overflow-y-auto p-6">

            <div className="mb-8 flex items-center justify-between">

              <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>

              <Link href="/upload" passHref>
                <Button size="lg">
                  <Plus className="mr-2 h-4 w-4" /> New Transcript
                </Button>
              </Link>

            </div>



            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {recentTranscripts.map((transcript) => (

                <Card key={transcript.id}>

                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                    <CardTitle className="text-sm font-medium">{transcript.title}</CardTitle>

                    <FileAudio className="h-4 w-4 text-muted-foreground" />

                  </CardHeader>

                  <CardContent>

                    <div className="text-2xl font-bold">{transcript.duration}</div>

                    <p className="text-xs text-muted-foreground">

                      {transcript.date} • {transcript.language}

                    </p>

                  </CardContent>

                </Card>

              ))}

            </div>

          </div>



          {/* Usage Statistics Sidebar */}

          <aside className="hidden w-64 overflow-y-auto border-l bg-muted/40 p-6 lg:block">

            <h2 className="mb-4 text-lg font-semibold">Usage Statistics</h2>

            <div className="space-y-4">

              <Card>

                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                  <CardTitle className="text-sm font-medium">Total Transcripts</CardTitle>

                  <FileAudio className="h-4 w-4 text-muted-foreground" />

                </CardHeader>

                <CardContent>

                  <div className="text-2xl font-bold">{stats.totalTranscripts}</div>

                </CardContent>

              </Card>

              <Card>

                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                  <CardTitle className="text-sm font-medium">Hours Transcribed</CardTitle>

                  <BarChart className="h-4 w-4 text-muted-foreground" />

                </CardHeader>

                <CardContent>

                  <div className="text-2xl font-bold">{stats.hoursTranscribed}</div>

                </CardContent>

              </Card>

              <Card>

                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                  <CardTitle className="text-sm font-medium">Current Plan</CardTitle>

                  <User className="h-4 w-4 text-muted-foreground" />

                </CardHeader>

                <CardContent>

                  <div className="text-2xl font-bold">{user.plan}</div>

                </CardContent>

              </Card>

            </div>

          </aside>

        </div>

      </main>

    </div>

  )

}


