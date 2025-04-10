'use client';
import { JournalEntry } from '@/components/models/models';
import { Box, Button, Card, CardContent, CardHeader, Container, Grid, Paper, TextField, Typography } from '@mui/material';
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
        <Box
            component="form"
            onSubmit={(e) => {
                e.preventDefault();
                updateData();
            }}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                padding: 4,
                maxWidth: 700,
                margin: "0 auto",
            }}
        >
            <Paper elevation={3} sx={{ p: 3, width: "100%" }}>
                <Typography variant="h6" gutterBottom>
                    Title
                </Typography>
                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Paper>
            <Paper elevation={3} sx={{ p: 3, width: "100%" }}>
                <Typography variant="h6" gutterBottom>
                    Content
                </Typography>
                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    multiline
                    minRows={5}
                    label="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </Paper>
            <Paper elevation={3} sx={{ p: 3, width: "100%" }}>
                <Typography variant="h6" gutterBottom>
                    Date
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={date}
                    onChange={handleDateChange}
                    format="YYYY-MM-DD"
                    slotProps={{
                    textField: { fullWidth: true, required: true, label: "Entry Date" },
                    }}
                />
                </LocalizationProvider>
            </Paper>
            <Button type="submit" variant="contained" size="large">
                Submit Entry
            </Button>
        </Box>
</Container> : <></>; }