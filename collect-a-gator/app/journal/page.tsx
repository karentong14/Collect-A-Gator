'use client'
import React, {useEffect, useState}  from 'react';

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

import Link from 'next/link';

export interface JournalEntry {
  _id: string;
  title: string;
  content: string;
  date: string;
}


export default function JournalPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const [data, setData] = useState<null | any>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5050/api")
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setData(json);
      })
      .catch(error => console.error(error));
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        My Journal
      </Typography>
      <Grid container spacing={2}>
        {data ? data.map((entry : JournalEntry) => (
          <Grid item xs={12} sm={6} md={4} key={entry._id}>
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
        )) : <></>}
        <Grid item xs={12} sm={6} md={4} key={data ? data.length : 0}>
          <Card>
            <CardHeader title={"Add New Journal Entry"}></CardHeader>
            <CardContent>
              <IconButton>
                <Link href={"/journal/newEntry"}>
                  <AddIcon></AddIcon>
                </Link>
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}