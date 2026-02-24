import "../home/homestyle.css";
import { Carousel } from "primereact/carousel";
import "@fortawesome/fontawesome-free/css/all.css";
import i1 from "../../assets/newui_images/land.jpg";
import a1 from "../../assets/newui_images/apartment.jpg";
import a2 from "../../assets/newui_images/villa.jpg";
import a3 from "../../assets/newui_images/independenthouse.jpg";

function Propertyplot() {
  const products = [
    {
      src: i1,
      alt: "Land",
      offer: "30-60% OFF",
      title: "Land",
      name: "Ghandhi Land",
      sqft: "450 Sqft",
      taluk: "Valluvarkottam",
      price: "60,000.00",
    },
    {
      src: a1,
      alt: "Plot",
      offer: "30-60% OFF",
      title: "Apartment",
      name: "Ghandhi Land",
      sqft: "450 Sqft",
      taluk: "Valluvarkottam",
      price: "60,000.00",
    },
    {
      src: a2,
      alt: "Apartment",
      offer: "30-60% OFF",
      title: "Villa",
      name: "Ghandhi Land",
      sqft: "450 Sqft",
      taluk: "Valluvarkottam",
      price: "60,000.00",
    },
    {
      src: a3,
      alt: "Layout",
      offer: "30-60% OFF",
      title: "Independent House",
      name: "Ghandhi Land",
      sqft: "450 Sqft",
      taluk: "Valluvarkottam",
      price: "60,000.00",
    },
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
        <div className="text-start">
          <div className="homes-content p-2" style={{ height: "150px" }}>
            <h3 className="p-0 m-0">
              <a href="#" className="p-0 m-0">
                {product?.title}{" "}
              </a>
            </h3>

            <ul className="homes-list homes-list1 clearfix mb-0">
              <li className="the-icons mb-2">
                <span>{product?.name} </span>
              </li>
              <li className="the-icons mb-1">
                <i className="fa-solid fa-ruler-combined"></i>
                <span className="m-0 p-0">{product?.sqft} </span>
              </li>
            </ul>
            <ul className="homes-list homes-list1 clearfix pb-1 mb-0">
              <a href="javascript:void(0)">
                <li className="the-icons">
                  <i className="fa fa-map-marker" />
                  <span>{product?.taluk}</span>
                </li>
              </a>
            </ul>
            <div className="price-properties footer mt-1 pb-0">
              <p className="bottom_price mb-0">
                <i
                  className="fa fa-inr"
                  aria-hidden="true"
                  style={{ fontSize: 12 }}
                />

                {product.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <section className="section">
      <div className="container-fluid">
        <div className="s ">
          <h2 className="text-center  mb-4" style={{ fontSize: "2em" }}>
            Similar Properties
          </h2>
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

export default Propertyplot;
