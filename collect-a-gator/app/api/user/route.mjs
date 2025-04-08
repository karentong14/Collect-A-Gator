import express from "express";
import db from "../../backend/db/conn.mjs";
import { User } from "../../backend/models/user.schema.mjs";
import { MongoMissingCredentialsError } from "mongodb";

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

// Update a user's details, including individual counters
//ex: PUT http://localhost:5050/api/users/ffnfneifeinfnf with only the fields (you only need the ones you want to change)
router.put("/:token", async (req, res) => {
  try {
    const { firstName, lastName, email, counters, booleans} = req.body;

    const updateFields = {};
    if (firstName !== undefined) updateFields.firstName = firstName;
    if (lastName !== undefined) updateFields.lastName = lastName;
    if (email !== undefined) updateFields.email = email;
    if (counters !== undefined) {
      updateFields.counters = {};
      if (counters.uf !== undefined) updateFields.counters.uf = counters.uf;
      if (counters.restaurant !== undefined) updateFields.counters.restaurant = counters.restaurant;
      if (counters.nature !== undefined) updateFields.counters.nature = counters.nature;
      if (counters.art !== undefined) updateFields.counters.art = counters.art;
      if (counters.cafe !== undefined) updateFields.counters.cafe = counters.cafe;
      if (counters.miscellaneous !== undefined) updateFields.counters.miscellaneous = counters.miscellaneous;

      console.log("Counters updated:", updateFields.counters);
    }
    if(booleans !== undefined) {
      updateFields.booleans = {};
      if (booleans.germaines !== undefined) updateFields.booleans.germaines = booleans.germaines;
      if (booleans.depotPark !== undefined) updateFields.booleans.depotPark = booleans.depotPark;
      if (booleans.karmaCream !== undefined) updateFields.booleans.karmaCream = booleans.karmaCream;
      if (booleans.butterflyGarden !== undefined) updateFields.booleans.butterflyGarden = booleans.butterflyGarden;
      if (booleans.marston !== undefined) updateFields.booleans.marston = booleans.marston;

      console.log("Booleans updated:", updateFields.booleans);
    }

    const updatedUser = await User.findOneAndUpdate(
      { token: req.params.token },
      { $set: updateFields },
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
