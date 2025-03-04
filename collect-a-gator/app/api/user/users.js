//This file could be used for user related routes
//ex: maybe etrieve extended profile information 
//GET /api/user/:id/journal: If you want to fetch journal entries that belong to a specific user, you could have a route that returns only that user’s entries.
//unsure if I need this
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch user data" });
  }
}