import './globals.css'







import React from 'react'







import { Inter } from 'next/font/google'







import type { Metadata } from 'next'







import { ReactNode } from 'react'







import { Providers } from "@/components/Providers"















const inter = Inter({ subsets: ['latin'] })















export const metadata: Metadata = {







  title: 'Your App Name',







  description: 'Your app description',







}















export default function RootLayout({ children }: { children: ReactNode }) {







  return (







    <html lang="en">







      <body className={inter.className}>







        <Providers>{children}</Providers>







      </body>







    </html>







  )



  }


















