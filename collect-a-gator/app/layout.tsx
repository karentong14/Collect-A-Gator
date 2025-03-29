'use client';
import React from 'react';
import NavBar from '@/components/navbar';
import AppTheme from '@/components/theme';
import {ClerkProvider} from '@clerk/nextjs';
import LoadingBar from '@/components/loading';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
        </head>
        <body>
          <AppTheme>
            <NavBar/>
            <LoadingBar>
              {children}
            </LoadingBar>
          </AppTheme>
        </body>
      </html>
    </ClerkProvider>
  );
}
