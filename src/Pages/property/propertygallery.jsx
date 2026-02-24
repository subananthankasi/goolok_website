import { useRef, useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "react-image-gallery/styles/css/image-gallery.css";
import { IMG_PATH } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";

const MyGallery = ({ property, loading }) => {
  const data = property ? property?.map((item) => item.gallery) : [];
  const images = data.flat().map((item) => ({
    original: `${IMG_PATH}enquiry/gallery/${item}`,
    thumbnail: `${IMG_PATH}enquiry/gallery/${item}`,
  }));

  const getImage = () => {
    return images ? images : [];
  };

  const galleryRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreenClass = () => {
    const galleryElement = document.querySelector(".image-gallery");
      if (!galleryElement) return;
    const imageElements = galleryElement.querySelectorAll(
      ".image-gallery-slide .image-gallery-image"
    );

    const handleFullscreenChange = () => {
      if (
        document.fullscreenElement === galleryElement ||
        document.webkitFullscreenElement === galleryElement
      ) {
        setIsFullscreen(true);
        imageElements.forEach((img) => {
          img.classList.remove("image-gallery-image");
          img.classList.add("fullscreen-image");
        });
      } else {
        setIsFullscreen(false);
        imageElements.forEach((img) => {
          img.classList.add("image-gallery-image");
          img.classList.remove("fullscreen-image");
        });
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
    };
  };

  useEffect(() => {
    const removeListeners = toggleFullscreenClass();
    return removeListeners;
  }, []);

  const handleExitFullscreen = () => {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    }
  };


  const handleImageClick = () => {
    if (galleryRef.current) {
      galleryRef.current.fullScreen();
    }
  };

  return (
   <div>
  {loading ? (
    <div className="loading-spinner">
      <Skeleton height="440px" width="100%" className="mb-2" />
    </div>
  ) : (
    <div style={{ position: "relative" }}>
      <ImageGallery
        ref={galleryRef}
        items={getImage()}
        showThumbnails={false}
        onClick={handleImageClick}
        showFullscreenButton={false}
        useBrowserFullscreen={true}
        style={{
          cursor: "pointer",
          position: "relative",
          height: "520px",
        }}
      />

      {/* Discount Tag */}
      {property?.[0]?.disc_percentage &&
        property?.[0]?.disc_status === "true" && (
          <p className="offer_tag_property_preview">
            {Math.floor(property[0]?.disc_percentage)}%
          </p>
        )}
    </div>
  )}

  {/* Exit Fullscreen Btn */}
  {isFullscreen && (
    <button className="exit-fullscreen-btn" onClick={handleExitFullscreen}>
      <FontAwesomeIcon icon={faTimes} size="2x" />
    </button>
  )}
</div>

  );
};

export default MyGallery;
