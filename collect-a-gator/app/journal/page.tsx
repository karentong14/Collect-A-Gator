import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardHeader, 
  CardContent, 
  IconButton
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

export interface JournalEntry {
  id: number;
  title: string;
  content: string;
  date: string;
}
/* Uncomment below if children props including in component, instead of the on-page fetch */
/*interface JournalPageProps {
  entries: JournalEntry[];
}*/

/* COMMENT OUT BELOW WHEN BACKEND IMPLEMENTED */
const entries: JournalEntry[] = [
  {
    id: 0,
    title: "My First Entry",
    content: "Welcome to my first entry",
    date: "01/01/2025"
  },
  {
    id: 1,
    title: "My Second Entry",
    content: "Welcome to my second entry",
    date: "01/02/2025"
  }
];

export default async function JournalPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* UNCOMMENT BELOW WHEN BACKEND IMPLEMENTED */
  //const response = await fetch("");
  //const entries: JournalEntry[] = await response.json();
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        My Journal
      </Typography>
      <Grid container spacing={2}>
        {entries.map((entry) => (
          <Grid item xs={12} sm={6} md={4} key={entry.id}>
            <Card>
              <CardHeader 
                title={entry.title} 
                subheader={entry.date} 
              />
              <CardContent>
                <Typography variant="body2">{entry.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4} key={entries.length}>
          <Card>
            <CardHeader title={"Add New Journal Entry"}></CardHeader>
            <CardContent>
              <IconButton>
                <AddIcon></AddIcon>
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}