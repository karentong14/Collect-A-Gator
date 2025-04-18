import React, {FunctionComponent, useState} from 'react';
import {AdvancedMarker} from '@vis.gl/react-google-maps';
import classNames from 'classnames';

import {RealEstateListingDetails} from './real-estate-listing-details/real-estate-listing-details';
import {RealEstateGallery} from './real-estate-gallery/real-estate-gallery';
import {RealEstateIcon} from './real-estate-icon';

// import {RealEstateListing} from '../../types/types';

import './custom-advanced-marker.css';
import { devNull } from 'os';

import marston_gator from "./../images/marston_gator.png"
import dynamic from "next/dynamic";


// interface Props {
//   realEstateListing: RealEstateListing;
// }



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
              <RealEstateIcon />
            </span>

          </div>            

          <RealEstateListingDetails />
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