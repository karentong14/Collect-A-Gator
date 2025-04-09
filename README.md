# Collect-A-Gator

A location-based journaling application for University of Florida students to explore Gainesville, collect virtual Gator badges, and record their experiences.

## Project Overview

Collect-A-Gator helps UF students discover notable locations around Gainesville while creating a personalized journal of their college experience. Visit locations, collect unique Gator badges, and build a digital scrapbook of your adventures.

## Features

- *Interactive Map*: Explore Gainesville with markers for notable locations
- *Digital Collection*: Collect unique Gator badges by visiting locations
- *Journaling*: Create entries about your experiences tied to locations
- *User Profiles*: Track your collection and journal in one place

## Quick Start

### Option 1: Local Setup

1. Clone the repository
   
   git clone https://github.com/karentong14/Collect-A-Gator.git
   

2. Navigate to the project directory
   
   cd Collect-a-Gator/collect-a-gator
   

3. Install dependencies
   
   npm install
   

4. The .env file is already set up with all the necessary API keys and configuration:
   - MongoDB connection string
   - Google Maps API key
   - Clerk authentication keys

5. Start the frontend
   
   npm run dev
   

6. Start the backend (in a separate terminal)
   
   cd app/backend
   node index.mjs
   

