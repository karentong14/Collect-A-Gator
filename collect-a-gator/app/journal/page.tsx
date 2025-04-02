'use client'
import React, {useEffect, useState}  from 'react';
import { useUser, ClerkProvider } from '@clerk/nextjs';
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Button,
  Box,
  CardHeader,
  IconButton
} from '@mui/material';

import {
  CalendarToday,
  Add,
  LocationOn
} from '@mui/icons-material';

import { JournalEntry } from '@/components/models/models';

import { useRouter } from 'next/navigation';
/* Uncomment below if children props including in component, instead of the on-page fetch */
/*interface JournalPageProps {
  entries: JournalEntry[];
}*/

export default function JournalPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [data, setData] = useState<null | any>(null);
  const router = useRouter();

  const user = useUser(); 
  const userId = user.user?.id

  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Sync user information when they log in
        if (userId) {
          await fetch("http://localhost:5050/api/users", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: userId,
              email: user.user?.primaryEmailAddress?.emailAddress,
              firstName: user.user?.firstName,
              lastName: user.user?.lastName,
            }),
          });
        }
  
        // Fetch journal entries for the logged-in user
        const response = await fetch("http://localhost:5050/api/entries");
        const json = await response.json();
  
        if (userId) {
          const filteredData = json.filter((entry: JournalEntry) => entry.token === userId);
          setData(filteredData);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    if (userId) {
      fetchData();
    }
  }, [userId]); // Runs whenever userId changes

  function reformatDate(s : string) {
    const currentDate = new Date (s);
    currentDate.setDate(currentDate.getDate());
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    return formattedDate;
  }

  const goToEntry = (entryId : string) => {
    router.push(`/journal/${entryId}`);
  }

  return (
    <ClerkProvider>
         <><SignedIn>
    <Container maxWidth="lg" sx={{
      paddingTop: "20px"
    }}>
      <Grid container direction="row" sx={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h2" gutterBottom paddingBottom="0px" marginBottom="0px">
                Your Journal
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" gutterBottom color='gray' padding="10px" paddingLeft="0px" fontWeight="5">
                Capture and revisit your recent memories
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item> {/* edit for mobile padding later */}
          <Button variant="contained" href={"/journal/newEntry"}>
            <Grid container spacing="10px">
              <Grid item sx={{
                paddingBottom: "-5px",
                marginBottom: "-10px"
              }}>
                <Add></Add>
              </Grid>
              <Grid item>Add New Journal Entry</Grid>
            </Grid>
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {data ? data.map((entry : JournalEntry, i : number) => (
          <Grid item xs={12} sm={6} md={4} key={i} onClick={() => goToEntry(entry._id)} sx={{
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out, 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.03)"
            },
          }}
          >
            <Card>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
              component="img"
              height="200"
              image={`https://maps.googleapis.com/maps/api/staticmap?center=${entry.latitude},${entry.longitude}&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7C${entry.latitude},${entry.longitude}&key=${googleApiKey}`}
              alt="Location Map"
              />
              <Box
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                padding: '5px 20px 5px 5px',
                backgroundColor: 'white',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center'
              }}
              >
              <LocationOn
                sx={{
                marginRight: 0.5,
                scale: 0.9,
                color: 'red'
                }}
              />
              <Typography variant="body2">{entry.location || "No location specified"}</Typography>
              </Box>
            </Box>
              <CardContent>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container direction="row" spacing={1}>
                      <Grid item>
                        <CalendarToday sx={{
                          scale: 0.7,
                          color: 'gray',
                          position: 'relative',
                          bottom: 1.5,
                          right: 4
                        }}/>
                      </Grid>
                      <Grid item>
                        <Typography sx={{
                          fontSize: '12px',
                          color: 'gray',
                          position: 'relative',
                          right: 10,
                          top: 1.5
                        }} variant="caption">{reformatDate(entry.date)}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">{entry.title} </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{entry.content}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )) : <></>}
      </Grid>
    </Container>
   </SignedIn><SignedOut>
             <RedirectToSignIn />
        </SignedOut></>
      </ClerkProvider>
  );
}