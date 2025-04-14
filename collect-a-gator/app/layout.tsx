'use client';
import React from 'react';
import NavBar from '@/components/navbar';
import AppTheme from '@/components/theme';
import {ClerkProvider} from '@clerk/nextjs';
import LoadingBar from '@/components/loading';
import EmotionRegistry from '@/components/EmotionRegistry';
import LoginHandler from '@/components/loginRedirect';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <ClerkProvider>
          <LoginHandler>
            <EmotionRegistry>
              <AppTheme>
                <NavBar/>
                <LoadingBar>
                  {children}
                </LoadingBar>
              </AppTheme>
            </EmotionRegistry>
          </LoginHandler>
        </ClerkProvider>
      </body>
    </html>
  );
}
