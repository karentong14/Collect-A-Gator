import React, { useEffect, useState } from "react";
import {useUser} from '@clerk/nextjs';
import { Box, CircularProgress } from "@mui/material";

export default function LoadingBar({children,}: Readonly< {children: React.ReactNode;} >) {
    const {isLoaded} = useUser(); 
    const [hydrated, setHydrated] = useState<Boolean>(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    return (!hydrated || !isLoaded) ? 
        <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            scale: '4'
        }}>
            <CircularProgress />
        </Box>  :
        <>
          {children}
        </>
}