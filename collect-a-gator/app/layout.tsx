'use client';
import React from 'react';
import {useEffect, useState} from 'react';
import NavBar from '@/components/navbar';
import AppTheme from '@/components/theme';
import {ClerkProvider} from '@clerk/nextjs';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
        </head>
        <body>
          <AppTheme>
            <NavBar/>
            {children}
          </AppTheme>
        </body>
      </html>
    </ClerkProvider>
  );
}
