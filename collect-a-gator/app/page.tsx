'use client';
import { useUser, SignedOut } from '@clerk/nextjs';
import { Button, Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Paper, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
	Menu,
	LibraryBooks,
	Home,
	Map,
	Workspaces,
  AutoStories,
  Bookmark,
  AccountCircle,
  ArrowForward
} from "@mui/icons-material";
import './globals.css';

const SignInButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignInButton), {
  ssr: false,
});
const SignUpButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignUpButton), {
  ssr: false,
});

export default function RootLayout() {
  const {isLoaded, isSignedIn, user} = useUser(); 
  const smallIcons = useMediaQuery("(min-width:450px)");
  const userId = user?.id
  
  const formatName = (name : string | null | undefined) => {
    if (name && name.length > 0) { //how to use name as a type instead of a reference here? potential console error
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    else return '';
  };

  const [hydrated, setHydrated] = useState<Boolean>(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  type Action = {
    label: string;
    target: string;
    icon: React.ReactNode;
  };
  
  const actions: Action[] = [
    { label: "Go to Journal", target: "/journal", icon: <LibraryBooks/> },
    { label: "View Collectibles", target: "/collectibles", icon: <Workspaces/> },
    { label: "Go to the Map", target: "/map", icon: <Map/> },
    { label: "View your profile", target: "/profile", icon: <AccountCircle/> },
  ];
  

  return (
    <>
      {isLoaded && isSignedIn && hydrated ? <>
        <Grid container spacing={5} padding='50px 100px'>
          <Grid item xs={12}>
            <Typography variant='h1'>
              Welcome, {formatName(user?.firstName)}!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardHeader title="Quick Actions" />
              <CardContent>
                <Grid container spacing={2}>
                  {actions.map((action) => (
                    <Grid item xs={12} sm={3} key={action.label}>
                      <Button
                        fullWidth
                        variant="contained"
                        endIcon={<ArrowForward />}
                        href={action.target}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 1,
                          width: "100%",
                        }}
                      >
                        {action.icon}
                        {smallIcons ? action.label : null}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </> : <>
        <Grid container direction="column" spacing={5} sx={{
          padding: "100px"
        }}>
          <Grid item>
            <Grid container direction="row" display="flex" alignContent="space-between">
              <Grid item xs={6}>
                <Typography variant="h4" paddingBottom="10px">
                  Welcome to Collect-A-Gator!
                </Typography>
                <Typography variant="h6">
                  Hey Gator! Turn your daily wanderings into meaningful memories.
                  Explore Gainesville, capture moments, and build your personal journey throughout
                  your new home.
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{
                  
                }}>
                <Card sx={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  maxWidth: '600px',
                  minWidth: '600px',
                  maxHeight: '200px',
                  minHeight: '200px',
                }}>
                  <CardMedia component="img"
                    image="https://placehold.co/600x150/orange/white">
                  </CardMedia>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
              <Grid container direction="row" display="flex" alignContent="space-between" spacing={3}>
                <Grid item xs={4}>
                  <Card sx={{
                      backgroundColor: 'white',
                      borderRadius: '20px',
                      padding: '20px'
                    }}>
                      <Grid container direction="row" spacing={2}>
                        <Grid item xs={4}>
                          <Map color="primary" sx={{fontSize: '100px'}}/>
                        </Grid>
                        <Grid item xs={8}>
                          <Grid container direction="column" spacing={1}>
                            <Grid item>
                              <Typography>Track Your Adventures</Typography>
                            </Grid>
                            <Grid item>
                              <Typography>Log your favorite spots, hidden gems, and
                              daily routes as you explore Gainesville.
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>  
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card sx={{
                      backgroundColor: 'white',
                      borderRadius: '20px',
                      padding: '20px'
                  }}>
                      <Grid container direction="row" spacing={2}>
                        <Grid item xs={4}>
                          <AutoStories color="primary" sx={{fontSize: '100px'}}/>
                        </Grid>
                        <Grid item xs={8}>
                          <Grid container direction="column" spacing={1}>
                            <Grid item>
                              <Typography>Journal Your Thoughts</Typography>
                            </Grid>
                            <Grid item>
                              <Typography>Write about your experiences, feelings,
                                and discoveries as you wander through Gainesville.
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>  
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card sx={{
                      backgroundColor: 'white',
                      borderRadius: '20px',
                      padding: '20px'
                    }}>
                      <Grid container direction="row" spacing={2}>
                        <Grid item xs={4}>
                          <Bookmark color="primary" sx={{fontSize: '100px'}}/>
                        </Grid>
                        <Grid item xs={8}>
                          <Grid container direction="column" spacing={1}>
                            <Grid item>
                              <Typography>Revisit Your Memorites</Typography>
                            </Grid>
                            <Grid item>
                              <Typography>Reflect on all your amazing Gator Adventures
                              through an interactive journal!
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>  
                  </Card>
                </Grid>
              </Grid>
          </Grid>
          <Grid item>
          <Card>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Typography>Start your journey here:</Typography>
              </Grid>
              <Grid item>
                <Grid container direction="row" spacing={2}>
                  <Grid item>
                    <Paper variant="outlined">
                      <SignedOut>
                        <SignInButton/>
                      </SignedOut>
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Paper variant="outlined">
                      <SignedOut>
                        <SignUpButton />
                      </SignedOut>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            </Card>
          </Grid>
        </Grid>
      </>
      }
    </>
  );
}
