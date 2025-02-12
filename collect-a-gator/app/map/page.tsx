"use client";
import React, { useEffect, useState } from 'react'
import {AdvancedMarker, APIProvider, Map, useMapsLibrary, useMap} from '@vis.gl/react-google-maps';


const PlacesSearch = () => {
    const map = useMap();
    const places = useMapsLibrary("places");
    const [restaurants, setRestaurants] = useState<google.maps.places.PlaceResult[]>([]);
  
    useEffect(() => {
      if (!map) return;
  
      const service = new google.maps.places.PlacesService(map);
      const request = {
        location: map.getCenter(),
        radius: 5000,
        type: "cafe",
      };
  
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setRestaurants(results);
        }
      });
    });
  
    return (
      <>
        {restaurants.map((place) => (
         place.geometry?.location ? (
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
                <Map defaultCenter={position} defaultZoom={10} mapId="5174ed5358f23a3c">
                    <PlacesSearch />
                </Map>
            </div>
        </APIProvider>
    );
};

export default App;