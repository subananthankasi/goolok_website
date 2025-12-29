import { 
    GlassMagnifier, 
  } from "react-image-magnifiers";
import gallery2 from '../../assets/images/land2.jpg';
import gallery12 from '../../assets/images/land12.jpg';


function ImageMagnifier() {
    return(
        <>
        <GlassMagnifier className="pop_image"
  imageSrc={gallery12}
  imageAlt="Example"
  largeImageSrc={gallery12} 
  square
  magnifierSize={'40%'}
/>
        </>
    );
}

export default ImageMagnifier;
