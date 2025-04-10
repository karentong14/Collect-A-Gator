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
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { ClerkProvider } from '@clerk/nextjs'
import dynamic from "next/dynamic";
import butterfly_gator from "./../images/butterfly_gator.png"
import depot_gator from "./../images/depot_gator.png"
import germaines_gator from "./../images/germaines_gator.png"
import karmacream_gator from "./../images/karmacream_gator.png"
import marston_gator from "./../images/marston_gator.png"
import culture_gator from "./../images/culture_gator.png"
import nature_gator from "./../images/nature_gator.png"

import { OverlayLayout as TOverlayLayout } from '@googlemaps/extended-component-library/overlay_layout.js';
import { PlacePicker as TPlacePicker } from '@googlemaps/extended-component-library/place_picker.js';
import { Button } from '@mui/material';

import {CustomAdvancedMarker} from './custom-advanced-marker/custom-advanced-marker';

//import all components from extended components library
<script type="module" src="https://unpkg.com/@googlemaps/extended-component-library"></script>

const App = dynamic(() => Promise.resolve(ClientApp), { ssr: false });
// https://developers.google.com/maps/documentation/javascript/reference/places-service

const markers = [
  //{ lat: 29.644859192414923, lng: -82.32228393500337, category: "park", title: "depot park", image: depot_gator},
  { lat: 29.660039837500698, lng: -82.327608563839, category: "restaurant", title: "germaines", image: germaines_gator},
  { lat: 29.636522457001664, lng: -82.37027596013368, category: "museum", title: "butterfly garden", image: butterfly_gator},
  //{ lat: 29.652244871720377, lng: -82.33110328896925, category: "cafe", title: "karma cream", image: karmacream_gator},
  // { lat: 29.6494508812314, lng: -82.34363722597145, category: "UF", title: "Marston Science Library", image: marston_gator },
  { lat: 29.65144695774138, lng: -82.34292632002683, category: "UF", title: "Library West Humanities & Social Sciences", image: marston_gator },
  { lat: 29.534656973659317, lng: -82.30503743167344, category: "UF", title: "UF Lake Wauburg North Shore", image: depot_gator },
  { lat: 29.650611351795845, lng: -82.34881076463614, category: "UF", title: "Ben Hill Griffin Stadium", image: depot_gator },
  { lat: 29.646596243997614, lng: -82.34778160468377, category: "UF", title: "Reitz Student Union", image: depot_gator },
  { lat: 29.651053187261496, lng: -82.3428677978283, category: "UF", title: "Plaza of The Americas", image: depot_gator },
  { lat: 29.64295164800919, lng: -82.36200703668369, category: "UF", title: "Lake Alice", image: depot_gator },
  { lat: 29.64435966681451, lng: -82.36244691895224, category: "UF", title: "UF Bat Houses", image: depot_gator },
  { lat: 29.64913455443091, lng: -82.34502161800916, category: "UF", title: "SweetBerries Eatery and Frozen Custard", image: karmacream_gator},
  { lat: 29.650144154077438, lng: -82.34658796270031, category: "UF", title: "Student Recreation & Fitness Center", image: butterfly_gator},
  { lat: 29.638503951810275, lng: -82.36781963590806, category: "UF", title: "Southwest Recreation Center", image: butterfly_gator},

  { lat: 29.6359013329591, lng: -82.33983966558394, category: "restaurant", title: "Momoyaki", image: germaines_gator },
  { lat: 29.650388203434332, lng: -82.37597347537441, category: "restaurant", title: "Las Carretas", image: germaines_gator },
  { lat: 29.623332841423434, lng: -82.37538518531986, category: "restaurant", title: "Red Rice Kitchen", image: germaines_gator },
  { lat: 29.758364743624703, lng: -82.39295973720803, category: "restaurant", title: "Koto", image: germaines_gator },
  { lat: 29.631838065754412, lng: -82.33962036997433, category: "restaurant", title: "La Tienda", image: germaines_gator },
  { lat: 29.638315853180988, lng: -82.3394904330465, category: "restaurant", title: "Indian Aroma", image: germaines_gator },
  { lat: 29.65197398083065, lng: -82.32519833304602, category: "restaurant", title: "Cry Babys", image: germaines_gator },
  { lat: 29.67442900410965, lng: -82.30188480420941, category: "restaurant", title: "Satchels", image: germaines_gator },
  { lat: 29.64827160463296, lng: -82.32877184838945, category: "restaurant", title: "Muneca’s Taco Garden", image: germaines_gator },
  { lat: 29.646546190047477, lng: -82.32472713991532, category: "restaurant", title: "Luke’s Bagels", image: germaines_gator },

  { lat:29.65213764748871, lng:-82.33118911968197, category: "cafe", title: "Karma Cream", image: karmacream_gator },
  { lat:29.650741676560994,lng:-82.32274468698614, category: "cafe", title: "Wyatt’s", image: karmacream_gator },
  { lat:29.649753684225075, lng:-82.3233989122677, category: "cafe", title: "Maude’s Cafe", image: karmacream_gator },
  { lat:29.653405373436907, lng: -82.34345787550077, category: "cafe", title: "Pascal’s Coffehouse", image: karmacream_gator },
  { lat:29.6511672302776,  lng:-82.33219266323125, category: "cafe", title: "Opus Coffee - Innovation", image: karmacream_gator },
  { lat:29.64866838546301,   lng:-82.3276436366712, category: "cafe", title: "Opus Coffee - Airstream", image: karmacream_gator },
  { lat:29.64840730854492, lng:-82.33296513943957, category: "cafe", title: "Opus Coffee - The Row", image: karmacream_gator },
  { lat:29.652607360673592,  lng:-82.34018758713849, category: "cafe", title: "Concord Coffee", image: karmacream_gator },
  { lat:29.672012671010553, lng:-82.33063039759065, category: "cafe", title: "Curia On The Drag", image: karmacream_gator },
  { lat:29.6515812409414, lng:-82.32686819870852, category: "cafe", title: "Cafe Voltaire", image: karmacream_gator },
  { lat:29.626740910821987,  lng:-82.37466244955165, category: "cafe", title: "Foxtail Coffee Co.", image: karmacream_gator },

  { lat: 29.644859192414923, lng: -82.32228393500337, category: "nature", title: "depot park", image: nature_gator },
  { lat: 29.655389621677706, lng:  -82.37101621796064, category: "nature", title: "loblolly woods", image: nature_gator },
  { lat: 29.570736081864148, lng:  -82.3002600044909, category: "nature", title: "paynes prairie", image: nature_gator },
  { lat:29.620103399869375, lng: -82.32963132467265, category: "nature", title: "sweetwater wetlands park", image: nature_gator },
  { lat: 29.65417552217933, lng:  -82.38849639274189 , category: "nature", title: "john mahon nature park", image: nature_gator },
  { lat: 29.620301155731035, lng: -82.3333365609661, category: "nature", title: "bivens arm nature park", image: nature_gator },

  { lat: 29.651634, lng: -82.324826, category: "culture", title: "Bo Diddley Plaza", image: culture_gator },
  { lat: 29.648556, lng: -82.325473, category: "culture", title: "Heartwood Soundstage", image: culture_gator },
  { lat: 29.650232, lng: -82.325745, category: "culture", title: "High Dive", image: culture_gator },
  { lat: 29.650457, lng: -82.325918, category: "culture", title: "The Wooly", image: culture_gator },
  { lat: 29.648741, lng: -82.325278, category: "culture", title: "Vivid Music Hall", image: culture_gator },
  { lat: 29.643633, lng: -82.345978, category: "culture", title: "Harn Museum of Art", image: culture_gator },
  { lat: 29.651193, lng: -82.325048, category: "culture", title: "Artisans' Guild Gallery", image: culture_gator },
  { lat: 29.652066, lng: -82.325881, category: "culture", title: "Gainesville Fine Arts Association", image: culture_gator },
  { lat: 29.659067, lng: -82.325982, category: "culture", title: "The Historic Thomas Center", image: culture_gator },
  { lat: 29.661118, lng: -82.330031, category: "culture", title: "Cotton Club Museum and Cultural Center", image: culture_gator },
  { lat: 29.657750, lng: -82.323600, category: "culture", title: "A. Quinn Jones Museum and Cultural Center", image: culture_gator },
  { lat: 29.657291, lng: -82.321818, category: "culture", title: "Wilhelmina Johnson Resource Center", image: culture_gator },
  { lat: 29.651088, lng: -82.325480, category: "culture", title: "Civic Media Center", image: culture_gator },
  { lat: 29.639707, lng: -82.322909, category: "culture", title: "Cade Museum for Creativity and Invention", image: culture_gator },
  { lat: 29.651139, lng: -82.325297, category: "culture", title: "Hippodrome Theatre", image: culture_gator }
];

const categories = ["all", "park", "restaurant", "museum", "cafe", "UF"];


const ClientApp = () => {

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedMarker, setSelectedMarker] = useState<{ lat: number; lng: number; image: any } | null>(null);

    // see individual elements: https://configure.mapsplatform.google/place-picker
    
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    const position = { lat: 29.6520, lng: -82.3250 };
    return (
      <ClerkProvider>
      <><SignedIn>
        <APIProvider apiKey={googleApiKey}>

          {/* MAP*/}
          <div slot="main" style={{ width: "100vw", height: "100vh" }}>
                <Map defaultCenter={position} defaultZoom={15} mapId="5174ed5358f23a3c">
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
                onClick={() => {setSelectedMarker({ lat: marker.lat, lng: marker.lng, image: marker.image });
                
              }}
              />
            ))}
            {/* display image when marker is clicked */}
            {selectedMarker && (
            <AdvancedMarker position={selectedMarker}>
              <img
                src={selectedMarker.image.src}
                alt="Marker Gator"
                style={{ width: "100px", height: "135px" }}
              />
            </AdvancedMarker>
          )}

                  <CustomAdvancedMarker />
                </Map>
                
          </div>

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
            <Button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "6px 12px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                background: selectedCategory === cat ? "#ab86fc" : "#ddd",
                color: selectedCategory === cat ? "#fff" : "#000",
              }}
            >
              {cat}
            </Button>
          ))}
          </div>

        </APIProvider>
      </SignedIn><SignedOut>
          <RedirectToSignIn />
        </SignedOut></>
      </ClerkProvider>
      );
};

export default App;