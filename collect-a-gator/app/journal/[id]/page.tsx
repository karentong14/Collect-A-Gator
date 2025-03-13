"use client";

import { JournalEntry } from "@/components/models/models";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardMedia, Container, Chip} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function entryPage() {
    const [entry, setEntry] = useState<JournalEntry | null>(null);
    const params = useParams();
    const entryId = params.id;

    useEffect(() => {
        const call = async () => await fetch(`http://localhost:5050/api/entries/${entryId}`)
            .then(response => response.json())
            .then(json => setEntry(json))
            .catch(error => console.error(error));
        call();
        console.log(entry);
    }, []);

    return (
        entry ? (
            <Container maxWidth="lg">
                <Card>
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
                </Card>
            </Container>
        ) : <></>
    );
}