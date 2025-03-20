import dotenv from 'dotenv';
dotenv.config();

// ...existing code...

const publishableKey = process.env.PUBLISHABLE_KEY;
if (!publishableKey) {
   // console.error(' HI EMILPublishable key is missing. Check your environment variables.');
    throw new Error('HI EMILY Publishable key is missing. Ensure that your publishable key is correctly configured in the environment variables.');
}

// Debugging: Log the publishable key (remove this in production)
console.log('Publishable Key in API:', publishableKey);

export async function getEntries(req, res) {
    try {
        // Debugging: Log request details
        console.log('Received GET /api/entries request');

        // Example logic (replace with actual implementation)
        const entries = []; // Replace with actual data fetching logic
        res.status(200).json({ success: true, data: entries });
    } catch (error) {
        console.error('Error in GET /api/entries:', error.message);
        res.status(500).json({ success: false, message: 'Uh oh! An unexpected error occurred.' });
    }
}