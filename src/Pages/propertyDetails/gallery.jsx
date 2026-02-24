import '../propertyDetails/propertydetailscss.css';
import gallery1 from '../../assets/images/land8.jpg'; 
import gallery3 from '../../assets/images/land3.jpg';
import gallery4 from '../../assets/images/land4.jpg'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactImageGallery from "react-image-gallery"; 
import "react-image-gallery/styles/css/image-gallery.css"; 
import video from '../../assets/images/video/videoplayimg.jpg'
import videothumb from '../../assets/images/video/videoplayimg.jpg';
import { useLocation } from 'react-router-dom';
import i1 from "../../assets/images/in1.jpg"; 
import a1 from "../../assets/images/apart1.jpg";
import a2 from "../../assets/images/apart2.jpg";
import a3 from "../../assets/images/apart3.jpg";
import a4 from "../../assets/images/apart4.jpg";  
import { Slide } from 'react-slideshow-image'; 
import 'react-slideshow-image/dist/styles.css';
import { IMG_PATH } from '../../Api/api';
import Skeleton from 'react-loading-skeleton';  

const Gallery = ({data,loading}) => {


    const imageData = data?.image && Array.isArray(data.image) && data.image.length > 0 ? data.image : null;
  

    const imgs = imageData?.map((row) => {
         switch (row.type) {
          case 'image':
            return {
              original: `${IMG_PATH}/property/${row.source_name}`,
              thumbnail: `${IMG_PATH}/property/${row.source_name}`,
            };
          case 'video':
            return {
              original: `${IMG_PATH}/property/${row.source_name}`,
              thumbnail: `${IMG_PATH}/property/${row.source_name}`,  
              renderItem: () => (
                <video autoPlay muted loop style={{ width: '100%', height: 'auto' }}>
                  <source src={`${IMG_PATH}/property/${row.source_name}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ),
            };
          case 'link':
            return {
              original: row.source_link,
              thumbnail: row.source_link,
            };
          default:
            return null;
        }
      });  
      
  

    const images = [
        {
            original: gallery1,
            thumbnail: gallery1
        },
        {
            original: video,
            thumbnail: videothumb,
            renderItem: () => (
                <video autoPlay muted loop style={{ width: '100%', height: 'auto' }}>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )
        },
        {
            original: gallery3,
            thumbnail: gallery3
        },
        {
            original: gallery4,
            thumbnail: gallery4
        }
    ];




    const apartment = [
        {
            original: i1,
            thumbnail: i1
        },
        {
            original: video,
            thumbnail: videothumb,
            renderItem: () => (
                <video autoPlay muted loop style={{ width: '100%', height: 'auto' }}>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )
        },
        {
            original: a1,
            thumbnail: a1
        },
        {
            original: a2,
            thumbnail: a2
        },
        {
            original: a3,
            thumbnail: a3
        },
        {
            original: a4,
            thumbnail: a4
        }
    ];



    const location = useLocation(); 
    const getImage = () => {
    //   if (location.pathname === '/property_details') {
    //     return imgs;  
    //   }
      return imgs?imgs:[] ;  

    }



 

    const buttonStyle = {
        width: "25px",
        background: 'none',
        border: '0px'
    };
    const properties = {
        prevArrow: <button style={{ ...buttonStyle }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z"/></svg></button>,
        nextArrow: <button style={{ ...buttonStyle }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M512 256L270 42.6v138.2H0v150.6h270v138z"/></svg></button>
    }
    
    return (
        <> 
        {loading?(  <div className='property_gallery' style={{ padding: "1.5rem" }}>
            <p className="productdetails_heading mb-4">Gallery</p>
            <Skeleton height={400} />
        </div>):(
            <>
            <div className='property_gallery' style={{ padding: "1.5rem" }}>
            <p className="productdetails_heading mb-4">Gallery</p>
            <ReactImageGallery
                items={getImage()}
                showBullets={false}
                showFullscreenButton={false}
                showPlayButton={false}
            />
            </div>

            <div className='property_gallery1'>
            <Slide {...properties} indicators={true}>
            {imgs?.map((item)=>{
                return (
                    <div className="each-slide-effect">
                    <div style={{ 'backgroundImage': `url(${item.original})` }}> 
                    </div>
                </div>
                )
            })} 
            </Slide>
            </div>
</>
        )}
       


        </>
    );
}

export default Gallery;
