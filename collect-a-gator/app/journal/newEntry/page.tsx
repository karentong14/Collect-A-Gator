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

import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useRef, useState } from 'react';
import {AdvancedMarker, APIProvider, ControlPosition, Map, MapControl, useMapsLibrary, useMap, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const restaurantSet = new Set(['ChIJIZBCHZ6j6IgRcKC_Bqug8AQ']); //germaines
const cafeSet = new Set(['ChIJU66uvIWj6IgR_T3rKgn_tGY']); //starbucks
const natureSet = new Set(['ChIJG4zJ_T6j6IgRgMdxRPpp5-M', 'ChIJ_aHU15Kj6IgROdcp7P7ZODI']); //butterfly
const artSet = new Set(['ChIJV1saDj-j6IgRCzNOsYSBymw']); //harn
const ufSet = new Set(['ChIJTxlXV4Kj6IgRSJ-tmdH0chA']); //library west

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
    const router = useRouter();

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
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        }
        else {
          
          //console.log("selectedPlaceId:" + selectedPlace?.place_id);
            const fetchData = async () => {
              const response = await fetch("http://localhost:5050/api/entries", {
                  method: "POST",
                  body: JSON.stringify({
                      title: title,
                      date: date,
                      content: content,
                      token: user?.id, 
                      location: selectedPlace?.name || "Unknown location", 
                      latitude: selectedPlace?.geometry?.location?.lat() || 0,
                      longitude: selectedPlace?.geometry?.location?.lng() || 0,
                      id: 0,// id should likely be generated somewhere else
                      placeID: selectedPlace?.place_id,
                  }),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8"
                  }
                })
                .then(response => response.json())
                .catch(error => console.error(error));
              };
              fetchData();

              const getUserCounters = async () => {
                try {
                    const response = await fetch("http://localhost:5050/api/users/" + user?.id, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8"
                        }
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return await response.json();
                } catch (error) {
                    console.error("Error fetching user counters:", error);
                    return null;
                }
            };

            // const fetchUserData = async () => {
            //   const myUserData =  await getUserCounters();
            //   return myUserData
            // };


            const fetchAndLogUserData = async () => {
                const userData = await getUserCounters();
                console.log("userData: ", userData);
            };
            fetchAndLogUserData();

            const adjustCounters = async () => {
              const userData = await getUserCounters();
              if (!userData) return;

              if (selectedPlace?.place_id) {
                if (ufSet.has(selectedPlace.place_id)) {
                  userData.ufCounter = (userData.ufCounter || 0) + 1;
                  console.log("UF Counter: ", userData.ufCounter);
                } else if (restaurantSet.has(selectedPlace.place_id)) {
                  userData.restaurantCounter = (userData.restaurantCounter || 0) + 1;
                  console.log("Restaurant Counter: ", userData.restaurantCounter);
                } else if (cafeSet.has(selectedPlace.place_id)) {
                  userData.cafeCounter = (userData.cafeCounter || 0) + 1;
                  console.log("Cafe Counter: ", userData.cafeCounter);
                } else if (natureSet.has(selectedPlace.place_id)) {
                  userData.natureCounter = (userData.natureCounter || 0) + 1;
                  console.log("Nature Counter: ", userData.natureCounter);
                } else if (artSet.has(selectedPlace.place_id)) {
                  userData.artCounter = (userData.artCounter || 0) + 1;
                  console.log("Art Counter: ", userData.artCounter);
                } else {
                  console.log("Place ID not found in any set.");
                  userData.miscellaneousCounter = (userData.miscellaneousCounter || 0) + 1;
                }
              }

              try {
                await fetch(`http://localhost:5050/api/users/${user?.id}`, {
                  method: "PUT", //idk if this is being put correctly cause I don't really see it incremented?
                  body: JSON.stringify({
                  ufCounter: userData.ufCounter,
                  restaurantCounter: userData.restaurantCounter,
                  cafeCounter: userData.cafeCounter,
                  natureCounter: userData.natureCounter,
                  artCounter: userData.artCounter,
                  miscellaneousCounter: userData.miscellaneousCounter
                  }),
                  headers: {
                  "Content-Type": "application/json; charset=UTF-8"
                  }
                });
                console.log("Counters updated successfully"); //it says it updated sucessfully but I don't think so?
              } catch (error) {
                console.error("Error updating counters:", error);
              }
            };

            adjustCounters();

        }
      }, [trigger]);

      const goToEntry = () => {
        router.push(`/journal`);
      }

    return (
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
                    <TextField placeholder="Enter a title name..." onChange={(e) => setTitle(e.target.value)}></TextField>
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <TextField placeholder="Type anything…" onChange={(e) => setContent(e.target.value)}></TextField>
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button variant="contained" onClick={() => {
                              submitEntry();
                              goToEntry();
                            }}>Submit</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="error">Remove</Button>
                        </Grid>
                    </Grid>
                </Grid>

                <APIProvider apiKey={googleApiKey}>
                
                          {/* //ADDED TEENY TINY SEARCH BAR */}
                          {/* <MapControl position={ControlPosition.TOP}> */}
                            <div style={{ fontSize: '30px', color: 'black' }} className="autocomplete-control">
                              <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                            </div>
                          {/* </MapControl> */}
                
                </APIProvider>
            </Grid>
        </Card>
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
        fields: ['geometry', 'name', 'formatted_address', 'place_id']
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