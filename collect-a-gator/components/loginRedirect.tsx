import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function LoginHandler({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const {isLoaded, isSignedIn} = useUser();
    const router = useRouter();
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
          router.push('/');
        }
    }, [isLoaded, isSignedIn, router]);
    return <>{children}</>;
}