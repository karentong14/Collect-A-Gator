'use client';
import React from 'react';
import NavBar from '@/components/navbar';
import {ClerkProvider} from '@clerk/nextjs'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <head>
      </head>
      <body>
        <NavBar/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
