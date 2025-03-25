"use client";
import React, { useEffect, useState, useRef } from 'react'
import {AdvancedMarker, APIProvider, Pin, ControlPosition, Map, MapControl, useMapsLibrary, useMap, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';
// import {
//   PlaceOverview,
//   SplitLayout,
//   OverlayLayout,
//   PlacePicker,
//   PlaceDirectionsButton
// } from '@googlemaps/extended-component-library/react';
import dynamic from "next/dynamic";
import butterfly_gator from "./../images/butterfly_gator.png"
import depot_gator from "./../images/depot_gator.png"
import germaines_gator from "./../images/germaines_gator.png"
import karmacream_gator from "./../images/karmacream_gator.png"
import marston_gator from "./../images/marston_gator.png"

import { OverlayLayout as TOverlayLayout } from '@googlemaps/extended-component-library/overlay_layout.js';
import { PlacePicker as TPlacePicker } from '@googlemaps/extended-component-library/place_picker.js';

//import all components from extended components library
<script type="module" src="https://unpkg.com/@googlemaps/extended-component-library"></script>

const App = dynamic(() => Promise.resolve(ClientApp), { ssr: false });
// https://developers.google.com/maps/documentation/javascript/reference/places-service


const markers = [
  { lat: 29.644859192414923, lng: -82.32228393500337, category: "park", title: "depot park", image: depot_gator, collected: false },
  { lat: 29.660039837500698, lng: -82.327608563839, category: "restaurant", title: "germaines", image: germaines_gator, collected: false },
  { lat: 29.636522457001664, lng: -82.37027596013368, category: "museum", title: "butterfly garden", image: butterfly_gator, collected: false },
  { lat: 29.652244871720377, lng: -82.33110328896925, category: "cafe", title: "karma cream", image: karmacream_gator, collected: false },
  { lat: 29.6494508812314, lng: -82.34363722597145, category: "UF", title: "marston", image: marston_gator, collected: false }
];

const categories = ["all", "park", "restaurant", "museum", "cafe", "UF"];


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


const ClientApp = () => {
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedMarker, setSelectedMarker] = useState<{ lat: number; lng: number; image: any } | null>(null);
    //below, for place panel overview
    const overlayLayoutRef = useRef<TOverlayLayout>(null);
    // const [formattedAddress, setFormattedAddress] = React.useState('');
    // const handlePlaceChange = (e: any) => {
    //   setFormattedAddress(e.target.value?.formattedAddress ?? '');
    // };
    const SplitLayout = dynamic(
      () => import('@googlemaps/extended-component-library/react').then(mod => mod.SplitLayout),
      { ssr: false }
    );
    const OverlayLayout = dynamic(
      () => import('@googlemaps/extended-component-library/react').then(mod => mod.OverlayLayout),
      { ssr: false }
    );
    const PlacePicker = dynamic(
      () => import('@googlemaps/extended-component-library/react').then(mod => mod.PlacePicker),
      { ssr: false }
    );
    const PlaceOverview = dynamic(
      () => import('@googlemaps/extended-component-library/react').then(mod => mod.PlaceOverview),
      { ssr: false }
    );
    // see individual elements: https://configure.mapsplatform.google/place-picker
    

    const position = { lat: 29.6520, lng: -82.3250 };
    return (
        <APIProvider apiKey={"AIzaSyC-Pip5d3p8_6swFtL_hRosMm2VTpraip4"}>

        {/* PLACE OVERVIEW PANEL to the right*/}
        <SplitLayout rowReverse rowLayoutMinWidth={700}>
          <div className="SlotDiv" slot="fixed">
            <OverlayLayout ref={overlayLayoutRef}>
            <div className="container">
              <PlacePicker placeholder="Enter a place to see its address"  />
            </div>
            </OverlayLayout>
          </div>
          
          {/* actual map to the left */}
          <div slot="main" style={{ width: "100vw", height: "100vh" }}>
                <Map defaultCenter={position} defaultZoom={15} mapId="5174ed5358f23a3c">
                    {/*<PlacesSearch /> */}
                    {markers
            .filter(
              (marker) =>
                selectedCategory === "all" || marker.category === selectedCategory
            )
            .map((marker, index) => (
              <AdvancedMarker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                title={marker.title}
                onClick={() => setSelectedMarker({ lat: marker.lat, lng: marker.lng, image: marker.image })}
              />
            ))}
            {/* just displaying butterfly_gator image when a marker is clicked */}
            {selectedMarker && (
            <AdvancedMarker position={selectedMarker}>
              <img
                src={selectedMarker.image.src}
                alt="Marker Gator"
                style={{ width: "100px", height: "135px" }}
              />
            </AdvancedMarker>
          )}
                </Map>
                
          </div>
        </SplitLayout>

            
            {/* //ADDED TEENY TINY SEARCH BAR */}
            {/* <MapControl position={ControlPosition.TOP}>
              <div style={{ fontSize: '15px', color: 'black'}} className="autocomplete-control">
                <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
              </div>
            </MapControl> */}


          <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            background: "rgba(255, 255, 255, 0.9)",
            padding: "8px",
            borderRadius: "10px",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "6px 12px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                background: selectedCategory === cat ? "#007bff" : "#ddd",
                color: selectedCategory === cat ? "#fff" : "#000",
              }}
            >
              {cat}
            </button>
          ))}
          </div>

            <MapHandler place={selectedPlace} marker={marker} />
        </APIProvider>
    );
};

export default App;