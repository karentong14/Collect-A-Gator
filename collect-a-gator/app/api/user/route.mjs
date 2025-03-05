import express from "express";
import db from "../../backend/db/conn.mjs";
import { User } from "../../backend/models/user.schema.mjs";

const router = express.Router();

// Get a list of all users (limit to 50 for performance)
//ex: GET http://localhost:5050/api/users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().limit(50);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: "Could not fetch users" });
  }
});

// Get a single user by token
//ex: GET http://localhost:5050/api/users/ffnfneifeinfnf
router.get("/:token", async (req, res) => {
  try {
    const user = await User.findOne({ token: req.params.token });
    if (!user) return res.status(404).send("User not found");
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Add a new user
//ex: POST http://localhost:5050/api/users with body info
router.post("/", async (req, res) => {
  try {
    const { token, firstName, lastName, email } = req.body;

    const existingUser = await User.findOne({ token });
    if (existingUser) {
      return res.status(400).send({ error: "User with this token already exists" });
    }

    const newUser = new User({ token, firstName, lastName, email });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Update a user's details
//ex: PUT http://localhost:5050/api/users/ffnfneifeinfnf with only the fields (you only need the ony you want to change)
router.put("/:token", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { token: req.params.token },
      { firstName, lastName, email },
      { new: true }
    );

    if (!updatedUser) return res.status(404).send("User not found");
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete a user and their journal entries
//This one still is a work in progress
router.delete("/:token", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ token: req.params.token });
    if (!deletedUser) return res.status(404).send("User not found");

    await db.collection("entries").deleteMany({ token: req.params.token });

    res.status(200).send("User and all associated journal entries deleted");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
