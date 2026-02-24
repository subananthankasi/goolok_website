import { useRef } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { IMG_PATH } from "../../Api/api";


const PropertyImage = ({property}) => {
   const data = property ? property.map((item) => item.gallery) : [];
  
    const images = data.flat().map((item) => ({
      original: `${IMG_PATH}enquiry/gallery/${item}`,
      thumbnail: `${IMG_PATH}enquiry/gallery/${item}`,
    }));
  
  const galleryRef = useRef(null);

  return (
    <div className="investment">
      <ImageGallery ref={galleryRef} items={images} showThumbnails={false} />
    </div>
  );
};

export default PropertyImage;