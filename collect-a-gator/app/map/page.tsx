"use client";
import React, { useEffect, useState, useRef } from 'react'
import {AdvancedMarker, APIProvider, ControlPosition, Map, MapControl, useMapsLibrary, useMap, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { ClerkProvider } from '@clerk/nextjs'

// https://developers.google.com/maps/documentation/javascript/reference/places-service

//MARKERS??
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

//MARKER FOR SEARCHED PLACE
// https://developers.google.com/maps/documentation/javascript/examples/rgm-autocomplete#maps_rgm_autocomplete-typescript
// --- maybe this one too, https://developers.google.com/maps/documentation/javascript/place-autocomplete-new
interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

const MapHandler = ({ place, marker }: MapHandlerProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
    marker.position = place.geometry?.location;
  }, [map, place, marker]);

  return null;
};

const App = () => {
    const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
    const [markerRef, marker] = useAdvancedMarkerRef();

    const position = { lat: 29.6520, lng: -82.3250 };
    return (
      <ClerkProvider>
      <><SignedIn>
        <APIProvider apiKey={"AIzaSyC-Pip5d3p8_6swFtL_hRosMm2VTpraip4"}>
          <div style={{ width: "100vw", height: "100vh" }}>
            <Map defaultCenter={position} defaultZoom={15} mapId="5174ed5358f23a3c">
              <PlacesSearch />
              <AdvancedMarker ref={markerRef} position={null} />
            </Map>
          </div>

          {/* //ADDED TEENY TINY SEARCH BAR */}
          <MapControl position={ControlPosition.TOP}>
            <div style={{ fontSize: '30px', color: 'black' }} className="autocomplete-control">
              <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
            </div>
          </MapControl>

          <MapHandler place={selectedPlace} marker={marker} />
        </APIProvider>
      </SignedIn><SignedOut>
          <RedirectToSignIn />
        </SignedOut></>
      </ClerkProvider>
      );
};

export default App;