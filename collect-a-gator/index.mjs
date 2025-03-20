import dotenv from 'dotenv';
dotenv.config();

import { ClerkExpressWithAuth } from '@clerk/express';

// ...existing code...

const publishableKey = process.env.PUBLISHABLE_KEY;
if (!publishableKey) {
    throw new Error('Publishable key is missing. Ensure that your publishable key is correctly configured in the environment variables.');
}

// Debugging: Log the publishable key (remove this in production)
console.log('Publishable Key:', publishableKey);

// Initialize Clerk middleware with the publishable key
const clerkMiddleware = ClerkExpressWithAuth({ publishableKey });

// Use the middleware in your app (example for Express.js)
import express from 'express';
const app = express();

app.use(clerkMiddleware);

// ...existing code...