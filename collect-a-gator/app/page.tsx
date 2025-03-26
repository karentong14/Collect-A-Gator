'use client';
import { useUser, ClerkProvider } from '@clerk/nextjs';
import { Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import {Map, AutoStories, Bookmark} from '@mui/icons-material';

export default function RootLayout() {
  const user = useUser(); 
  const userId = user.user?.id
  return (
    <ClerkProvider>
      {userId ? <>
        
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
                <Button href="./login"
                  variant="outlined">
                  Sign In
                </Button>
              </Grid>
            </Grid>
            </Card>
          </Grid>
        </Grid>
      </>}
    </ClerkProvider>
  );
}
