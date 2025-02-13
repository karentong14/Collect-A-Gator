"use client";
import React, { useEffect, useState } from 'react'
import {AdvancedMarker, APIProvider, Map, useMapsLibrary, useMap} from '@vis.gl/react-google-maps';

// https://developers.google.com/maps/documentation/javascript/reference/places-service

const PlacesSearch = () => {
    // this is accessing the specific instance of the map this took me so long to figure out omfg
    const map = useMap();
    const places = useMapsLibrary("places"); // calling usage for places API
    let numbers: number[] = [1, 2, 3];
    const [locations, setLocations] = useState<google.maps.places.PlaceResult[]>([]); // we use useState to be able to setLocations to locations
  
    useEffect(() => { // useEffect connects a component to any external service like an API!!
      if (!map || !places) return; // needed to account for nulls 
  
      const service = new google.maps.places.PlacesService(map);
      // the request to get locations
      const request = {
        location: map.getCenter(),
        radius: 5000,
        type: "cafe",
      };
  
      // puts the found locations into the setRestaurants
      service.nearbySearch(request, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK && results) {
          setLocations(results); // automatically sets the results of the request to locations variable
        }
      });
    });
  
    return (
      <>
        {locations.map((place) => (
         place.geometry?.location ? (
          // we can customize the advanced markers I'm pretty sure
          <AdvancedMarker
            key={place.place_id}
            position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }}
            title={place.name}
          />
        ): null
        ))}
      </>
    );
  };

const App = () => {
    const position = { lat: 29.6520, lng: -82.3250 };
    return (
        <APIProvider apiKey={"AIzaSyC-Pip5d3p8_6swFtL_hRosMm2VTpraip4"}>
            <div style={{ width: "100vw", height: "100vh" }}>
                <Map defaultCenter={position} defaultZoom={15} mapId="5174ed5358f23a3c">
                    <PlacesSearch /> 
                </Map>
            </div>
        </APIProvider>
    );
};

export default App;