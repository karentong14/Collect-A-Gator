"use client";
import React, { useEffect, useState, useRef } from 'react'
import {AdvancedMarker, APIProvider, ControlPosition, Map, MapControl, useMapsLibrary, useMap, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';
import dynamic from "next/dynamic";
import butterfly_gator from "./../images/butterfly_gator.png"

const App = dynamic(() => Promise.resolve(ClientApp), { ssr: false });
// https://developers.google.com/maps/documentation/javascript/reference/places-service


const markers = [
  { lat: 29.644859192414923, lng: -82.32228393500337, category: "park", title: "depot park", image: butterfly_gator },
  { lat: 29.660039837500698, lng: -82.327608563839, category: "restaurant", title: "germaines", image: butterfly_gator },
  { lat: 29.636522457001664, lng: -82.37027596013368, category: "museum", title: "butterfly garden", image: butterfly_gator },
  { lat: 29.652244871720377, lng: -82.33110328896925, category: "cafe", title: "karma cream", image: butterfly_gator },
  { lat: 29.6494508812314, lng: -82.34363722597145, category: "UF", title: "marston", image: butterfly_gator }
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
    const [selectedMarker, setSelectedMarker] = useState<{ lat: number; lng: number } | null>(null);


    const position = { lat: 29.6520, lng: -82.3250 };
    return (
        <APIProvider apiKey={"AIzaSyC-Pip5d3p8_6swFtL_hRosMm2VTpraip4"}>
            <div style={{ width: "100vw", height: "100vh" }}>
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
                onClick={() => setSelectedMarker({ lat: marker.lat, lng: marker.lng })}
              />
            ))}
            {/* just displaying butterfly_gator image when a marker is clicked */}
            {selectedMarker && (
            <AdvancedMarker position={selectedMarker}>
              <img
                src={butterfly_gator.src}
                alt="Butterfly Gator"
                style={{ width: "50px", height: "75px" }}
              />
            </AdvancedMarker>
          )}
                </Map>
            </div>

            
            {/* //ADDED TEENY TINY SEARCH BAR */}
            <MapControl position={ControlPosition.TOP}>
              <div style={{ fontSize: '15px', color: 'black'}} className="autocomplete-control">
                <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
              </div>
            </MapControl>
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