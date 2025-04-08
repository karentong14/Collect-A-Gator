"use client";

import { JournalEntry } from "@/components/models/models";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardMedia, Container, Typography, Grid, Button} from "@mui/material";
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
            <Container maxWidth="lg" sx={{paddingTop: '10px'}}>
                <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader
                                title={<Grid container spacing={1}>
                                    <Grid item>
                                        <Typography variant="h1">{entry.title}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={() => {
                                            router.push(`/journal/${entryId}/edit`);
                                        }}>
                                            <Edit/>
                                        </Button>
                                    </Grid>
                                </Grid>}
                                subheader={
                                    <Grid container direction="row" spacing={1}>
                                        <Grid item>
                                            <Grid container direction="row"
                                                sx={{
                                                    padding: '5px 15px 5px 5px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '20px',
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    width: 'fit-content',
                                                    alignItems: 'center',
                                                    border: '2px solid pink',
                                                    marginTop: '10px'
                                                }}
                                            >
                                                <Grid item>
                                                    <Grid container direction="row" sx={{marginTop: '5px'}}>
                                                        <Grid item>
                                                            <LocationOn
                                                                sx={{
                                                                    marginRight: 0.5,
                                                                    scale: 0.9,
                                                                    color: 'red'
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="body2" sx={{
                                                                marginTop: '2px'
                                                            }}>{entry.location || "No location specified"}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Grid container direction="row"
                                                sx={{
                                                    padding: '5px 15px 5px 5px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '20px',
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    width: 'fit-content',
                                                    alignItems: 'center',
                                                    border: '2px solid lavender',
                                                    marginTop: '10px'
                                                }}
                                            >
                                                <Grid item>
                                                    <Grid container direction="row" sx={{marginTop: '5px'}}>
                                                        <Grid item>
                                                            <DateRange
                                                                sx={{
                                                                    marginRight: 0.5,
                                                                    scale: 0.9,
                                                                    color: 'lightpurple'
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="body2" sx={{
                                                                marginTop: '2px'
                                                            }}>{reformatDate(entry.date)}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                }
                            />
                        </Card>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Card sx={{
                                    width: 'fit-content'
                                }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={`https://maps.googleapis.com/maps/api/staticmap?center=${entry.latitude},${entry.longitude}&zoom=14&size=300x300&maptype=roadmap&markers=color:red%7C${entry.latitude},${entry.longitude}&key=${googleApiKey}`}
                                        alt="Location Map"
                                    />
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card>
                                    <CardHeader title={<Typography variant="h2">What You Wrote</Typography>}/>
                                    <CardContent>
                                        <Typography variant="body1">{entry.content}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card>
                                    <CardHeader title={<Typography variant="h2">Sticker's from {entry.location}</Typography>}/>
                                    <CardContent>

                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/*<Card>
                    <CardHeader 
                        title={entry.title} 
                        subheader={
                            <Chip 
                                icon={<LocationOnIcon />} 
                                label={entry.location || "No location specified"} 
                                sx={{ backgroundColor: '#f44336', color: 'white' }} 
                            />
                        }
                    />
                    <CardContent>
                        {entry.content}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader title={entry.date}/>
                    <CardMedia 
                        component="img"
                        height="200"
                        image="https://placehold.co/600x400/blue/white"
                    />
                </Card>*/}
            </Container>
        ) : <></>
    );
}