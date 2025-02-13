"use client";
import React from 'react'
import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps';


function App() {
    const position = { lat: 29.6520, lng: -82.3250 };

    return (
        <APIProvider apiKey={"AIzaSyC-Pip5d3p8_6swFtL_hRosMm2VTpraip4"}>
            <div style={{ width: "100vw", height: "100vh" }}>
                <Map defaultCenter={position} defaultZoom={10} mapId="5174ed5358f23a3c">
                    <AdvancedMarker position={position} />
                </Map>
            </div>
        </APIProvider>
    );
}

export default App;