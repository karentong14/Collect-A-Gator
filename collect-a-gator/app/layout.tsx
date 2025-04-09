'use client';
import React from 'react';
import NavBar from '@/components/navbar';
import AppTheme from '@/components/theme';
import {ClerkProvider} from '@clerk/nextjs';
import LoadingBar from '@/components/loading';
import EmotionRegistry from '@/components/EmotionRegistry';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <ClerkProvider>
          <EmotionRegistry>
            <AppTheme>
              <NavBar/>
              <LoadingBar>
                {children}
              </LoadingBar>
            </AppTheme>
          </EmotionRegistry>
        </ClerkProvider>
      </body>
    </html>
  );
}
