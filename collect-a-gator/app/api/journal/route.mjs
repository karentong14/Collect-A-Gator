import express from "express";
//import db from "../../backend/db/conn.mjs";
import { ObjectId, ReturnDocument } from "mongodb";
//import { clerkMiddleware } from "@clerk/nextjs/server"
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node"; // Correct import for Express
import {Entry} from "../../backend/models/entry.schema.mjs";
const router = express.Router();

router.use(ClerkExpressWithAuth()); // Authenticate requests using Clerk

// Get a list of 50 posts
// ex: GET http://localhost:5050/api/entries
router.get("/", async (req, res) => {
  try {

     // Ensure the user is authenticated and has a Clerk token
     const userId = req.auth?.userId; // Adjust based on how Clerk authentication is set up in your backend
     console.log(req.auth);
     console.log("Authenticated user ID:", userId); // Debug log
     if (!userId) {
       return res.status(401).send({ error: "Unauthorized" });
     }

    const results = await Entry.find({ token: userId} );
    console.log("Fetched results:", results); // Debug log
    res.status(200).send(results);
    if (!Array.isArray(results)) {
      return res.status(500).send({ error: "Results are not an array" });
    }
  } catch (error) {
    console.error(error);  // Log the error to help debug
    res.status(500).send({ error: "Could not get the posts" }); //Do I need to write an error message
  }
});

// Fetches the latest posts
//ex: GET http://localhost:5050/api/entries/latest
//currently it does not seem to work correctly with some dates not ordered correctly
router.get("/latest", async (req, res) => {
  try {
    const results = await Entry.find({}, "author title tags date") //need to edit the dates bc right now, it seems alphabetical and not working with real dates
      .sort({ date: -1 }) 
      .limit(3);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


//Get a single post
// ex: GET http://localhost:5050/api/entries/67b51d310602399d38e1d3e2
router.get("/:id", async (req, res) => {
  try {
    const result = await Entry.findById(req.params.id);
    if (!result) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: "Invalid ID format" });
  }
});

// Add a new document to the collection
//ex: POST http://localhost:5050/api/entries with the raw JSON
router.post("/", async (req, res) => {
  try {
    const newEntry = new Entry(req.body);
    await newEntry.save(); 
    res.status(201).send(newEntry);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete an entry
// ex: DELETE http://localhost:5050/api/entries/67c74fdd13df14183bef59ac
router.delete("/:id", async (req, res) => {
  try {
    const result = await Entry.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Not deleted properly");
    res.status(200).send("Deleted properly");
  } catch (error) {
    res.status(400).send({ error: "Invalid ID format" });
  }
});

export default router;