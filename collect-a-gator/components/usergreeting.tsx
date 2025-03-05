"use client";

import { useUser } from "@clerk/nextjs";

export function UserGreeting() {
  const { user, isSignedIn } = useUser();

  return <h1>Welcome {isSignedIn ? user?.firstName : "Guest"}!</h1>;
}
