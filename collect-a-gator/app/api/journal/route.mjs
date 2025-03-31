import express from "express";
// NEW FILE 
import {Entry} from "../../backend/models/entry.schema.mjs";
const router = express.Router();

// Get a list of 50 posts
// ex: GET http://localhost:5050/api/entries
router.get("/", async (req, res) => {
  try {
    const results = await Entry.find();
    res.status(200).send(results);
  }
  catch(e){
    result = e.message; // error under useUnknownInCatchVariables 
    if (typeof e === "string") {
        res.status(200).send(e.toUpperCase()); // works, `e` narrowed to string
    } else if (e instanceof Error) {
        res.status(200).send(e.message);
         // works, `e` narrowed to Error
    }
}});

// Fetches the latest posts
//ex: GET http://localhost:5050/api/entries/latest
//currently it does not seem to work correctly with some dates not ordered correctly
router.get("/latest", async (req, res) => {
  try {
    const results = await Entry.find({}, "author title tags date") //need to edit the dates bc right now, it seems alphabetical and not working with real dates
      .sort({ date: -1 }) 
      .limit(3);
    res.status(200).send(results);
  } catch(e){
    result = e.message; // error under useUnknownInCatchVariables 
    if (typeof e === "string") {
        res.status(200).send(e.toUpperCase()); // works, `e` narrowed to string
    } else if (e instanceof Error) {
        res.status(200).send(e.message);
         // works, `e` narrowed to Error
    }
}});


//Get a single post
// ex: GET http://localhost:5050/api/entries/67b51d310602399d38e1d3e2
router.get("/:id", async (req, res) => {
  try {
    const result = await Entry.findById(req.params.id);
    if (!result) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch(e){
    result = e.message; // error under useUnknownInCatchVariables 
    if (typeof e === "string") {
        res.status(200).send(e.toUpperCase()); // works, `e` narrowed to string
    } else if (e instanceof Error) {
        res.status(200).send(e.message);
         // works, `e` narrowed to Error
    }
}});

// Add a new document to the collection
//ex: POST http://localhost:5050/api/entries with the raw JSON
router.post("/", async (req, res) => {
  try {
    const newEntry = new Entry(req.body);
    await newEntry.save(); 
    res.status(201).send(newEntry);
  } catch(e){
    result = e.message; // error under useUnknownInCatchVariables 
    if (typeof e === "string") {
        res.status(200).send(e.toUpperCase()); // works, `e` narrowed to string
    } else if (e instanceof Error) {
        res.status(200).send(e.message);
         // works, `e` narrowed to Error
    }
}
}
);

// Delete an entry
// ex: DELETE http://localhost:5050/api/entries/67c74fdd13df14183bef59ac
router.delete("/:id", async (req, res) => {
  try {
    const result = await Entry.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Not deleted properly");
    res.status(200).send("Deleted properly");
  } catch(e){
    result = e.message; // error under useUnknownInCatchVariables 
    if (typeof e === "string") {
        res.status(200).send(e.toUpperCase()); // works, `e` narrowed to string
    } else if (e instanceof Error) {
        res.status(200).send(e.message);
         // works, `e` narrowed to Error
    }
}
});

export default router;