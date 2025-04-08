import React, {FunctionComponent} from 'react';

// import {getFormattedCurrency} from '../../../libs/format-currency';
// import {FloorplanIcon} from '../../../icons/floor-plan-icon';
// import {BathroomIcon} from '../../../icons/bathroom-icon';
// import {BedroomIcon} from '../../../icons/bedroom-icon';

// import {ListingDetails} from '../../types/types';

import './real-estate-listing-details.css';
import dynamic from "next/dynamic";


// interface Props {
//   details: ListingDetails;
// }

    const SplitLayout = dynamic(
        () => import('@googlemaps/extended-component-library/react').then(mod => mod.SplitLayout),
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
    const PlaceDirectionsButton = dynamic(
        () => import('@googlemaps/extended-component-library/react').then(mod => mod.PlaceDirectionsButton),
        { ssr: false }
    );

export const RealEstateListingDetails= ({
  
}) => {
  
  return (
    <div className="details-container">
      <PlaceOverview
                  size="large"
                  //hardcode place id as a string
                  place={'ChIJd71aR52j6IgRHko1BL93Tag'}
                  googleLogoAlreadyDisplayed
                >
                  <div slot="action" className="SlotDiv">
                    <PlaceDirectionsButton slot="action" variant="filled">
                      Directions
                    </PlaceDirectionsButton>
                  </div>
        </PlaceOverview>
      <div className="listing-content">
        <h2>ur mom</h2>
        <p>ur mom</p>
        <div className="details">
            ur mom
        </div>

        <p className="description">ur mom</p>

        <p className="price">ur mom</p>
      </div>
    </div>
  );
};