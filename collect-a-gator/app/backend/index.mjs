import "./loadEnvironment.mjs";
import express from "express";
import { requireAuth } from '@clerk/express'
//import { ClerkExpressWithAuth } from '@clerk/express';  // Import the Clerk middleware for Express
import cors from "cors";
import postRoutes from "../api/journal/route.mjs";
import userRoutes from "../api/user/route.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

console.log("Publishable Key:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
console.log("Secret Key:", process.env.CLERK_SECRET_KEY);
// Load the /posts routes
app.use("/api/entries", requireAuth(), postRoutes);
app.use("/api/users", requireAuth(), userRoutes);

// Global error handling
app.use((err, _req, res, next) => {
  console.error("Unexpected error:", err)
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});