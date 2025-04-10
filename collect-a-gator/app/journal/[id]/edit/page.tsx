'use client';
import { JournalEntry } from '@/components/models/models';
import { Box, Button, Card, CardContent, CardHeader, Container, Grid, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditPage() : React.ReactNode {
    const [entry, setEntry] = useState<JournalEntry | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [content, setContent] = useState<string | null>(null);
    const [date, setDate] = useState<Dayjs | null>(null);
    const pathname = usePathname();
    const segments = pathname.split('/');
    const entryId = segments[2];
    const router = useRouter();

    const handleDateChange = (newDate: Dayjs | null) => {
        if (newDate) setDate(newDate);
    };

    useEffect(() => {
        const call = async () => await fetch(`http://localhost:5050/api/entries/${entryId}`)
            .then(response => response.json())
            .then(json => {
                setEntry(json);
                setTitle(json.title);
                setContent(json.content);
                setDate(dayjs(json.date));
            })
            .catch(error => console.error(error));
        call();
    }, []);

    const updateData = async () => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5050/api/entries/${entryId}`, {
                method: "PUT",
                body: JSON.stringify({
                    title: title,
                    date: date,
                    content: content
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(json => {
                setEntry(json);
                setTitle(json.title);
                setContent(json.content);
                setDate(dayjs(json.date));
            })
            .catch(error => console.error('error thing', error));
        };
        fetchData();
        router.push("/journal");
    };

    return entry ? <Container maxWidth="lg" sx={{
        paddingTop: '10px'
      }}>
        <Grid container direction="column" spacing={2}>
            <Card variant="outlined">
                <Grid container direction="row" spacing={2}>
                    <Grid item>
                        <Typography>Title: </Typography>
                    </Grid>
                    {title ? <Grid item><TextField
                        defaultValue={title ? title : "Write content here"}
                        onChange={(e) => setTitle(e.target.value)}
                    >
                    </TextField></Grid> : <></>}
                </Grid>
            </Card>
            <Card variant="outlined">
                <Grid container direction="row" spacing={2}>
                    <Grid item>
                        <Typography>Content: </Typography>
                    </Grid>
                    {content ? <Grid item><TextField
                        multiline
                        defaultValue={content ? content : "Write content here"}
                        onChange={(e) => setContent(e.target.value)}
                    >
                    </TextField></Grid> : <></>}
                </Grid>
            </Card>
            <Card variant="outlined">
                <Grid container direction="row" spacing={2}>
                    <Grid item>
                        <Typography>Date: </Typography>
                    </Grid>
                    {date ? <Grid item><LocalizationProvider dateAdapter={AdapterDayjs}><DatePicker
                        value={date}
                        format="YYYY-MM-DD"
                        onChange={handleDateChange}
                        /></LocalizationProvider></Grid> : <></>}
                </Grid>
            </Card>
            <Button onClick={updateData}>Update Data</Button>
        </Grid>
    </Container> : <></>;
}