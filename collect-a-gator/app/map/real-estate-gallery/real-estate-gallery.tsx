import React, {useState, FunctionComponent, MouseEvent} from 'react';

import './real-estate-gallery.css';

interface Props {
  isExtended: boolean;
}

export const RealEstateGallery: FunctionComponent<Props> = ({
  isExtended = false
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleBack = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNext = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (currentImageIndex < 1000 - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className={`photo-gallery ${isExtended ? 'extended' : ''}`}>
      <img alt="Real estate listing photo" />

      <div className="gallery-navigation">
        <div className="nav-buttons">
          <button onClick={handleBack} disabled={currentImageIndex === 0}>
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            onClick={handleNext}
            disabled={currentImageIndex === 1000 - 1}>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        <div className="indicators">
          {/* {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentImageIndex ? 'active' : ''}`}></span>
          ))} */}
        </div>
      </div>
    </div>
  );
};