// Load environment variables
import "./loadEnvironment.mjs";
import express from "express";
import cors from "cors";
import postRoutes from "../api/journal/route.mjs";
import userRoutes from "../api/user/route.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Load the /posts routes
app.use("/api/entries", postRoutes);
app.use("/api/users", userRoutes);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});