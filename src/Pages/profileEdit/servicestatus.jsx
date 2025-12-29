import { ThreeDots } from 'react-loader-spinner';
import ServiceStatusGetPatta from './ServiceStatusGetPatta';
import ServiceStatusGmap from './ServiceStatusGmap';
import { Skeleton } from 'primereact/skeleton';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ServiceStatusLandSurvey from './ServiceStatusLandSurvey';
import ServiceStatusLegaling from './ServiceStatusLegaling';
import ServiceStatusPropertyValuation from './ServiceStatusPropertyValuation';
import ServiceStatusMissingDocuments from './ServiceStatusMissingDocuments';

const ServiceStatus = ({ invoiceData, fetchInvoice, eid, loading }) => {
  if (loading) {

    return (
      <div className="pt-3 ps-3 pe-3 mt-4">
        <Skeleton height="4rem" className="mb-2 mt-3" />
        <Skeleton height="4rem" className="mb-2" />
        <Skeleton height="4rem" className="mb-2" />
        <Skeleton height="4rem" className="mb-2" />
        <Skeleton height="4rem" className="mb-2" />
        <Skeleton height="4rem" className="mb-2" />
      </div>

    );
  }

  const serviceCat = invoiceData?.[0]?.service_cat.toLowerCase();

  return (
    <div>
      {serviceCat === "get patta for your property" ? (
        <div>
          <h5 className='text-center' style={{ fontWeight: "600", color: "#0000ff", fontFamily: "poppins" }}>Get Patta For Your Property</h5>
          <hr className="hr-gradient" />
          <ServiceStatusGetPatta
            invoiceData={invoiceData}
            eid={eid}
            fetchInvoice={fetchInvoice}
          />
        </div>
      ) : serviceCat === "find your property google map location" ? (
        <div>
          <h5 className='text-center' style={{ fontWeight: "600", color: "#0000ff", fontFamily: "poppins" }}>Find Your Property Google Map Location</h5>
          <hr className="hr-gradient" />
          <ServiceStatusGmap
            invoiceData={invoiceData}
            eid={eid}
            fetchInvoice={fetchInvoice}
          />
        </div>
      ) : serviceCat === "land survey" ? (
        <div>
          <h5 className='text-center' style={{ fontWeight: "600", color: "#0000ff", fontFamily: "poppins" }}>Land Survey</h5>
          <hr className="hr-gradient" />
          <ServiceStatusLandSurvey
            invoiceData={invoiceData}
            eid={eid}
            fetchInvoice={fetchInvoice}
          />
        </div>
      ) : serviceCat === "legal opinion" ? (
        <div>
          <h5 className='text-center' style={{ fontWeight: "600", color: "#0000ff", fontFamily: "poppins" }}>Legal Opinion</h5>
          <hr className="hr-gradient" />
          <ServiceStatusLegaling
            invoiceData={invoiceData}
            eid={eid}
            fetchInvoice={fetchInvoice}
          />
        </div>
      ) : serviceCat === "property valuation" ? (
        <div>
          <h5 className='text-center' style={{ fontWeight: "600", color: "#0000ff", fontFamily: "poppins" }}>Property Valuation</h5>
          <hr className="hr-gradient" />
          <ServiceStatusPropertyValuation
            invoiceData={invoiceData}
            eid={eid}
            fetchInvoice={fetchInvoice}
          />
        </div>
      ) : serviceCat === "missing documents" ? (
        <div>
          <h5 className='text-center' style={{ fontWeight: "600", color: "#0000ff", fontFamily: "poppins" }}>Missing Documents</h5>
          <hr className="hr-gradient" />
          <ServiceStatusMissingDocuments
            invoiceData={invoiceData}
            eid={eid}
            fetchInvoice={fetchInvoice}
          />
        </div>
      ) : (

        <div className="text-center mt-5 pt-5">
          <h4 className="text-center"><SearchOffIcon sx={{ fontSize: 25 }} /> No data</h4>
        </div>
      )}
    </div>
  );
};

export default ServiceStatus;
