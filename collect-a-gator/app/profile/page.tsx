'use client';

import {
  SignOutButton,
  SignedIn,
  UserButton,
} from '@clerk/nextjs';
import "../globals.css";
import { Grid, Paper } from '@mui/material';

export default function RootLayout() {
  return (
      <Grid container padding="50px 100px" spacing={2}>
        <Grid item>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Grid>
        <Grid item>
          <Paper variant="outlined">
            <SignedIn>
              <SignOutButton/>
            </SignedIn>
          </Paper>
        </Grid>
      </Grid>
  );
}