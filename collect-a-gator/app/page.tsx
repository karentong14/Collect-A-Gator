import { UserGreeting } from "@/components/usergreeting";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <UserGreeting />
      {children}
    </ClerkProvider>
  );
}
