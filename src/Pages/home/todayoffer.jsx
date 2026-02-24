import "../home/homestyle.css";
import { Carousel } from "primereact/carousel";
import "@fortawesome/fontawesome-free/css/all.css";
import i1 from "../../assets/newui_images/land.jpg";
import a1 from "../../assets/newui_images/apartment.jpg";
import a2 from "../../assets/newui_images/villa.jpg";
import a3 from "../../assets/newui_images/independenthouse.jpg";

function TodayOffer() {

    const products = [
    { src: i1, alt: "Land", offer: "30-60% OFF", title: "Land" },
    { src: a1, alt: "Plot", offer: "30-60% OFF", title: "Apartment" },
    { src: a2, alt: "Apartment", offer: "30-60% OFF", title: "Villa" },
    { src: a3, alt: "Layout", offer: "30-60% OFF", title: "Independent House" },
  ];
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];
    const productTemplate = (product) => {
    return (
      <div className="todaysdeal-card">
        <div className="todaysdeal-img-wrapper">
          <img src={product.src} alt={product.alt} className="todaysdeal-img" />
        </div>
        <div className="todaysdeal-body">
          <h5 className="todaysdeal-title">{product.title}</h5>
          <p className="todaysdeal-offer">{product.offer}</p>
        </div>
      </div>
    );
  };
  return (
    <section className="section">
      <div className="container-fluid">
        <div className="section-head ">
          {/* <Link to={`/property/`}> */}
           <h3 className="mb-3 mt-3">High Return Properties</h3>
           
          {/* </Link> */}
        </div>

        <div className="mt-5">
         <Carousel
          value={products}
          numVisible={4}
          numScroll={3}
          responsiveOptions={responsiveOptions}
          itemTemplate={productTemplate}
        />
        </div>
      </div>
    </section>
  );
}

export default TodayOffer;
