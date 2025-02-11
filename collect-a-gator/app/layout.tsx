'use client';
import React from 'react';
import NavBar from '@/components/navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
