import express from "express";
import db from "../db/conn.mjs";
import { ObjectId, ReturnDocument } from "mongodb";
import {Entry} from "../schema.mjs";
const router = express.Router();

// Get a list of 50 posts
router.get("/", async (req, res) => {
  try {
    const results = await Entry.find().limit(50);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: "Could not get the posts" }); //Do I need to write an error message
  }
});

// Fetches the latest posts
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
router.delete("/:id", async (req, res) => {
  try {
    const result = await Entry.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Not deleted properly");
    res.status(200).send("Deleted properly");
  } catch (error) {
    res.status(400).send({ error: "Invalid ID format" });
  }
});

router.post('/:id', function (req, res) {
  Entry.findByIdAndUpdate(req.body.id,
      { title: req.body.title, content: req.body.content, date: req.body.date, location: req.body.location}, function (err, data) {
          if (err) {
              console.log(err);
          }
          else {
              res.send(data);
              console.log("Data updated!");
          }
      });
});

export default router;