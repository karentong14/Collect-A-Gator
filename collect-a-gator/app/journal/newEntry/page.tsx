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
import { useEffect, useRef, useState } from 'react';
import { JournalEntry } from '@/components/models/models';
import { ClerkProvider, useUser } from "@clerk/nextjs";
import {AdvancedMarker, APIProvider, ControlPosition, Map, MapControl, useMapsLibrary, useMap, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';


export default function EntryPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [date, setDate] = React.useState<Dayjs>(dayjs());
    const [title, setTitle] = React.useState<null | string>();
    const [content, setContent] = React.useState<null | string>();
    const [trigger, setTrigger] = React.useState<boolean>(false);
    //maps api
    const [selectedPlace, setSelectedPlace] =
        useState<google.maps.places.PlaceResult | null>(null);
    //User information
    const { user, isSignedIn } = useUser();

    useEffect(() => {
        setDate(dayjs()); 
    }, []);

    const handleDateChange = (newDate: Dayjs | null) => {
        if (newDate) setDate(newDate);
    };

    const submitEntry = () => {
        if (title && content) {
            setTrigger(!trigger);
        }
    };

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        }
        else {
            const fetchData = async () => {
                const response = await fetch("http://localhost:5050/api/entries", {
                  method: "POST",
                  body: JSON.stringify({
                      title: title,
                      date: date,
                      content: content,
                      token: user?.id, 
                      location: selectedPlace?.name || "Unknown location", 
                      id: 0
                  }),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8"
                  }
                })
                .then(response => response.json())
                .catch(error => console.error(error));
              };
              fetchData();
        }
      }, [trigger]);

    return (
        <ClerkProvider>
        <Card sx={{
            padding: '20px',
            maxWidth: 'lg',
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
                        <DatePicker defaultValue={date} format="YYYY-MM-DD" onChange={handleDateChange}/>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <Textarea placeholder="Enter a title name..." onChange={(e) => setTitle(e.target.value)}></Textarea>
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <Textarea placeholder="Type anything…" onChange={(e) => setContent(e.target.value)}></Textarea>
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button variant="contained" onClick={submitEntry}>Submit</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="error">Remove</Button>
                        </Grid>
                    </Grid>
                </Grid>

                <APIProvider apiKey={"AIzaSyC-Pip5d3p8_6swFtL_hRosMm2VTpraip4"}>
                
                          {/* //ADDED TEENY TINY SEARCH BAR */}
                          {/* <MapControl position={ControlPosition.TOP}> */}
                            <div style={{ fontSize: '30px', color: 'black' }} className="autocomplete-control">
                              <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                            </div>
                          {/* </MapControl> */}
                
                </APIProvider>
            </Grid>
        </Card>
        </ClerkProvider>
    );
}

//TEENY TINY SEARCH BAR AT THE TOPPPPPP
  interface PlaceAutocompleteProps {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  }
  
  const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
    const [placeAutocomplete, setPlaceAutocomplete] =
      useState<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const places = useMapsLibrary('places');
  
    useEffect(() => {
      if (!places || !inputRef.current) return;
  
      const options = {
        fields: ['geometry', 'name', 'formatted_address']
      };
  
      setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);
  
    useEffect(() => {
      if (!placeAutocomplete) return;
  
      placeAutocomplete.addListener('place_changed', () => {
        onPlaceSelect(placeAutocomplete.getPlace());
      });
    }, [onPlaceSelect, placeAutocomplete]);
  
    return (
      <div className="autocomplete-container">
        <input ref={inputRef} />
      </div>
    );
  };