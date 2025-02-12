'use client';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { 
    Card, 
    CardHeader, 
    Grid,
    IconButton,
    Button
} from '@mui/material';

import Textarea from '@mui/joy/Textarea';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function EntryPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    /* UNCOMMENT BELOW TO USE DATE SPECIFICS FOR LATER */
    //const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    return (
        <Card sx={{
            padding: '20px',
            maxWidth: '800px',
            margin: 'auto'
        }}>
            <Grid container spacing={2} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Grid item xs={12} sm={10} md={8}>
                    <Card>
                        <CardHeader title={"Enter your new journal entry!"}></CardHeader>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker defaultValue={dayjs('2025-02-01')} />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <Textarea placeholder="Type anything…"></Textarea>
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button variant="contained">Submit</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="error">Remove</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}