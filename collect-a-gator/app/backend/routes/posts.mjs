import express from "express";
import db from "../db/conn.mjs";
import { ObjectId, ReturnDocument } from "mongodb";
import {Entry} from "../schema.mjs";
const router = express.Router();

// Get a list of 50 posts
router.get("/", async (req, res) => {
  let collection = await db.collection("Journal");
  let results = await collection.find({})
    .limit(50)
    .toArray();

  res.send(results).status(200);
});

// Fetches the latest posts
router.get("/latest", async (req, res) => {
  let collection = await db.collection("Journal");
  let results = await collection.aggregate([
    {"$project": {"author": 1, "title": 1, "tags": 1, "date": 1}},
    {"$sort": {"date": -1}},
    {"$limit": 3}
  ]).toArray();
  res.send(results).status(200);
});

// Get a single post
router.get("/:id", async (req, res) => {
  let collection = await db.collection("Journal");
  let query = new ObjectId(req.params.id);
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a new document to the collection
router.post("/", async (req, res) => {
  let collection = await db.collection("Journal");
 // const {id, date, title, content} = req.body;
  const newEntry = await Entry.create(req.body);
  newEntry.date = new Date(); 
  let result = await collection.insertOne(newEntry);
  res.send(result).status(204);
});


// Delete an entry
router.delete("/:id", async (req, res) => {
  let query = ({ _id: req.params.id });

  const collection = db.collection("Journal");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;