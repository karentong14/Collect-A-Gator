"use client";

import { JournalEntry } from "@/components/models/models";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardMedia, Container, Typography, Grid, Button, Stack, Chip, Box} from "@mui/material";
import { LocationOn, DateRange, Edit } from "@mui/icons-material";
import { useRouter } from 'next/navigation';

export default function entryPage() {
    const [entry, setEntry] = useState<JournalEntry | null>(null);
    const params = useParams();
    const entryId = params.id;
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    const router = useRouter();

    useEffect(() => {
        const call = async () => await fetch(`http://localhost:5050/api/entries/${entryId}`)
            .then(response => response.json())
            .then(json => setEntry(json))
            .catch(error => console.error(error));
        call();
    }, []);

    function reformatDate(s : string) {
        const currentDate = new Date (s);
        currentDate.setDate(currentDate.getDate() + 1);
        const formattedDate = currentDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
        return formattedDate;
    }

    return (
        entry ? (
            <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardHeader
              title={
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h4" fontWeight="bold">
                    {entry.title}
                  </Typography>
                  <Button
                    onClick={() => router.push(`/journal/${entryId}/edit`)}
                    startIcon={<Edit />}
                    variant="outlined"
                  >
                    Edit Entry
                  </Button>
                </Box>
              }
              subheader={
                <Stack direction="row" spacing={2} mt={1}>
                  <Chip
                    icon={<LocationOn sx={{ color: "red" }} />}
                    label={entry.location || "No location"}
                    variant="outlined"
                    sx={{ borderColor: "pink", color: "black" }}
                  />
                  <Chip
                    icon={<DateRange />}
                    label={reformatDate(entry.date)}
                    variant="outlined"
                    sx={{ borderColor: "lavender", color: "black" }}
                  />
                </Stack>
              }
            />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card elevation={1}>
                <CardMedia
                  component="img"
                  height="250"
                  image={`https://maps.googleapis.com/maps/api/staticmap?center=${entry.latitude},${entry.longitude}&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7C${entry.latitude},${entry.longitude}&key=${googleApiKey}`}
                  alt="Location Map"
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card elevation={1}>
                <CardHeader title={<Typography variant="h6">What You Wrote</Typography>} />
                <CardContent>
                  <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                    {entry.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card elevation={1}>
                <CardHeader
                  title={
                    <Typography variant="h6">
                      Stickers from {entry.location || "this place"}
                    </Typography>
                  }
                />
                <CardContent>

                  <Typography variant="body2" color="text.secondary">
                    (No stickers yet — maybe add some stickers here!)
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
        ) : <></>
    );
}