import './place-overview.css';
import dynamic from "next/dynamic";

    const PlaceOverview = dynamic(
        () => import('@googlemaps/extended-component-library/react').then(mod => mod.PlaceOverview),
        { ssr: false }
    );
    const PlaceDirectionsButton = dynamic(
        () => import('@googlemaps/extended-component-library/react').then(mod => mod.PlaceDirectionsButton),
        { ssr: false }
    );

export const PlaceOverviewExpanded= ({
  
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
    </div>
  );
};