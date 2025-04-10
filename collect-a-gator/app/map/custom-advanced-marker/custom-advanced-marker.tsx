import React, {FunctionComponent, useState} from 'react';
import {AdvancedMarker} from '@vis.gl/react-google-maps';
import classNames from 'classnames';

import {PlaceOverviewExpanded} from '../place-overview/place-overview-expanded';
import {GatorIcon} from './gator-icon';

import './custom-advanced-marker.css'

import marston_gator from "./../../images/marston_gator.png"

export const CustomAdvancedMarker = ({
}) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const position = {
    //marston
    lat: 29.64840833267358, 
    lng: -82.34354772086701
  };

//  CUSTOM PIN !!!
  const renderCustomPin = () => {

    const [selectedMarker, setSelectedMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);
    
    return (
      <>
        <div className="custom-pin">
          <button className="close-button">
            <span className="material-symbols-outlined"> close </span>
          </button>

          <div className="image-container">
            {/* <RealEstateGallery
              isExtended={clicked}
            /> */}
            <img
                src={marston_gator.src}
                alt="Marker Gator"
                style={{ width: "100px", height: "135px" }}
              />

            <span className="icon">
              <GatorIcon />
            </span>

          </div>            

          <PlaceOverviewExpanded />
        </div>
        

        <div className="tip" />
      </>
      
    );
  };

  return (
    <>
      <AdvancedMarker
        position={position}
        // title={'AdvancedMarker with custom html content.'}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={classNames('real-estate-marker', {clicked, hovered})}
        onClick={() => setClicked(!clicked)}>
        {renderCustomPin()}
      </AdvancedMarker>
    </>
  );
};