import React, { useRef } from "react";
import ImageGallery from "react-image-gallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "react-image-gallery/styles/css/image-gallery.css";
import i1 from "../../assets/images/in1.jpg"; 
import a1 from "../../assets/images/apart1.jpg";
import a2 from "../../assets/images/apart2.jpg"; 
import a3 from "../../assets/images/apart3.jpg";
import a4 from "../../assets/images/apart4.jpg";
import { IMG_PATH } from "../../Api/api";


const PropertyImage = ({property}) => {
   const data = property ? property.map((item) => item.gallery) : [];
  
  
    const images = data.flat().map((item) => ({
      original: `${IMG_PATH}enquiry/gallery/${item}`,
      thumbnail: `${IMG_PATH}enquiry/gallery/${item}`,
    }));
  
    const getImage = () => {
      return images ? images : [];
    }
  const galleryRef = useRef(null);

  const handleNext = () => {
    if (galleryRef.current) {
      galleryRef.current.slideToIndex(galleryRef.current.getCurrentIndex() + 1);
    }
  };

  const handlePrev = () => {
    if (galleryRef.current) {
      galleryRef.current.slideToIndex(galleryRef.current.getCurrentIndex() - 1);
    }
  };

  return (
    <div className="investment">
      <ImageGallery ref={galleryRef} items={images} showThumbnails={false} />
    </div>
  );
};

export default PropertyImage;