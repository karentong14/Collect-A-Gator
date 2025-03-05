// import { getAuth } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/clerk-sdk-node";
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { userId } = getAuth(req);

//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const user = await clerkClient.users.getUser(userId);
//     return NextResponse.json(user);
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
//   }
// }
