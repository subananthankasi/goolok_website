import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/home/home";
import Gridview from "./Pages/gridview/gridview";
import Navbar from "./Components/navbar/navbar";
import Footer from "./Components/Footer/footer";
import NotFound from "./Pages/NotFound";
import ScrollToTop from "./Components/ScrollToTop";
import PublicRoute from "./Routes/PublicRoute";
import Propertyview from "./Pages/property/propertyview";
import PropertyMap from "./Pages/propertymap/propertymap";
import Tickets from "./Pages/profileEdit/Tickets";
import EditProfile from "./Pages/profileEdit/editProfile";
import AddProperty from "./Pages/profileEdit/AddProperty";
import YourProperty from "./Pages/profileEdit/YourProperty";
import Ledger from "./Pages/profileEdit/ledger";
import TicketNotification from "./Pages/profileEdit/ticketNotification";
import AfterLogin from "./Routes/AfterLogin";
import Tracking from "./Pages/profileEdit/Tracking/Tracking";
import NotificationDetails from "./Components/Notification/NotificationDetails";
import ForumHome from "./Pages/Forum/ForumHome";
import Replies from "./Pages/Forum/Replies";
import {
  PaymentFailed,
  PaymentSuccess,
} from "./Pages/PaymentGateway/PaymentResponse";
import PdfDownloadPage from "./Test/PdfDownloadPage";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import PurchaseProperty from "./Pages/profileEdit/PurchaseProperty";
import Mybooking from "./Pages/profileEdit/Mybooking";
import Service from "./Pages/profileEdit/Service";
import BookDetails from "./Pages/profileEdit/BookDetails";
import ServiceDetails from "./Pages/profileEdit/ServiceDetails";
import PaymentHistory from "./Pages/profileEdit/PaymentHistory";
import CustomerCare from "./Pages/profileEdit/customercare";
import Refferals from "./Pages/profileEdit/Refferals";
import AddressList from "./Pages/profileEdit/Address/AddressList";
import CreateAddress from "./Pages/profileEdit/Address/CreateAddress";
import EditAddress from "./Pages/profileEdit/Address/EditAddress";
import CheckoutPage from "./Components/Notification/CheckoutPage";
import SellProperty from "./Pages/SaleProperty/SellProperty";
import SearchResults from "./Components/navbar/SearchResults";
import ServicePreviewPage from "./Pages/ServicePages/ServicePreviewPage";
import WhoWeAre from "./Components/Footer/FooterComponents/WhoWeAre";
import Blogs from "./Components/Footer/FooterComponents/Blogs";
import CustomerCareFooter from "./Components/Footer/FooterComponents/CustomerCareFooter";
import HowItsWork from "./Components/Footer/FooterComponents/HowItsWork";
import PrivacyPolicy from "./Components/Footer/FooterComponents/PrivacyPolicy";
import RefundPolicy from "./Components/Footer/FooterComponents/RefundPolicy";
import SiteMap from "./Components/Footer/FooterComponents/SiteMap";
import TermsAndCondition from "./Components/Footer/FooterComponents/TermsAndCondition";
import AboutUs from "./Components/Footer/FooterComponents/AboutUs";
import ContactUs from "./Components/Footer/FooterComponents/ContactUs";
import NewLoginPage from "./Components/Login/NewLoginPage";
import WholeService from "./Pages/ServicePages/WholeService";
import LegalPaymentLink from "./Components/LinkPages/LegalPaymentLink";
import LegalpaymentInvoiceDownload from "./Components/LinkPages/LegalpaymentInvoiceDownload";
import LinkPage from "./Components/LinkPages/LinkPage";
import AutoInvoiceDownload from "./Components/LinkPages/AutoInvoiceDownload";
import AgreementRedirect from "./Components/LinkPages/AgreementRedirect";
import PaymentSheduleRedirect from "./Components/LinkPages/PaymentSheduleRedirect";
import MyProfile from "./Pages/profileEdit/MyProfile";
import PriceProposalRedirect from "./Components/LinkPages/PriceProposalRedirect";
import ProfileLayout from "./Pages/profileEdit/ProfileLayout";


function App() {
  return (

    <BrowserRouter basename="/goolokweb">
      <div className="app-layout">
        <Navbar />
        <ScrollToTop />
        <main className="app-content">
          <Routes>
            <Route exact path="/" element={<PublicRoute element={Home} />} />
            <Route
              exact
              path="/new"
              element={<PublicRoute element={NewLoginPage} />}
            />
            <Route
              path="/properties/"
              element={<PublicRoute element={Gridview} />}
            />
            <Route
              path="/sellproperties"
              element={<PublicRoute element={SellProperty} />}
            />
            <Route
              path="/service"
              element={<PublicRoute element={WholeService} />}
            />
            <Route path="/search" element={<SearchResults />} />
            <Route
              path="/property/:eid/:landType"
              element={<PublicRoute element={Propertyview} />}
            />
            <Route
              path="/propertymap"
              element={<PublicRoute element={PropertyMap} />}
            />
            <Route path="*" element={<PublicRoute element={NotFound} />} />

            <Route
              path="/notification_details/:deid"
              element={<PublicRoute element={NotificationDetails} />}
            />


            {/* profile  */}
            {/* <Route
            path="/profile_edit/mybooking"
            element={<AfterLogin element={Mybooking} />}
          /> */}
            {/* <Route
            path="/profile_edit/bookdetails/:id"
            element={<AfterLogin element={BookDetails} />}
          /> */}
            {/* <Route
            path="/profile_edit/service"
            element={<AfterLogin element={Service} />}
          /> */}
            {/* <Route
            path="/profile_edit/servicedetails/:eid"
            element={<AfterLogin element={ServiceDetails} />}
          /> */}
            <Route
              path="/profile_edit/tickets"
              element={<AfterLogin element={Tickets} />}
            />
            {/* <Route path="/profile_edit/dashboard" element={<AfterLogin element={Dashboard} />} /> */}

            <Route
              path="/profile_edit/profile"
              element={<AfterLogin element={EditProfile} />}
            />
            <Route
              path="/profile_edit/add_property"
              element={<AfterLogin element={AddProperty} />}
            />
            {/* <Route
            path="/profile_edit/my_property"
            element={<AfterLogin element={YourProperty} />}
          /> */}
            {/* <Route
            path="/profile_edit/paymenthistory"
            element={<AfterLogin element={PaymentHistory} />}
          /> */}
            {/* <Route
            path="/profile_edit/customercare"
            element={<AfterLogin element={CustomerCare} />}
          /> */}
            <Route
              path="/profile_edit/referrals"
              element={<AfterLogin element={Refferals} />}
            />
            <Route path="/profile_edit" element={<AfterLogin element={ProfileLayout} />}>
              <Route path="address" element={<AddressList />} />
              <Route path="mybooking" element={<Mybooking />} />
              <Route path="service" element={<Service />} />
              <Route path="notification" element={<TicketNotification />} />
              <Route path="my_property" element={<YourProperty />} />
              <Route path="paymenthistory" element={<PaymentHistory />} />
              <Route path="customercare" element={<CustomerCare />} />
              <Route path="add_address" element={<CreateAddress />} />
              <Route path="edit_address" element={<EditAddress />} />
              <Route path="property_status/:id" element={<Tracking />} />
              <Route path="bookdetails/:id" element={<BookDetails />} />
              <Route path="servicedetails/:eid" element={<ServiceDetails />} />
            </Route>

            {/* <Route
            path="/profile_edit/address"
            element={<AfterLogin element={AddressList} />}
          /> */}
            {/* <Route
            path="/profile_edit/add_address"
            element={<AfterLogin element={CreateAddress} />}
          /> */}
            {/* <Route
            path="/profile_edit/edit_address"
            element={<AfterLogin element={EditAddress} />}
          /> */}

            <Route
              path="/profile_edit/purchase_property"
              element={<AfterLogin element={PurchaseProperty} />}
            />
            <Route
              path="/profile_edit/ledger"
              element={<AfterLogin element={Ledger} />}
            />
            {/* <Route
            path="/profile_edit/notification"
            element={<AfterLogin element={TicketNotification} />}
          /> */}
            <Route
              path="/profile_edit/myprofile"
              element={<AfterLogin element={MyProfile} />}
            />
            {/* <Route
            path="/profile_edit/property_status/:id"
            element={<AfterLogin element={Tracking} />}
          /> */}
            <Route
              path="/agreement/:id"
              element={<AgreementRedirect />}
            />
            <Route
              path="/proposal/:id"
              element={<PriceProposalRedirect />}
            />
            <Route
              path="/schedule/:id"
              element={<PaymentSheduleRedirect />}
            />
            {/* forum   */}
            <Route path="/forum" element={<PublicRoute element={ForumHome} />} />
            <Route path="/replies" element={<PublicRoute element={Replies} />} />

            {/* payment gateway */}
            <Route
              path="/payment_success"
              element={<AfterLogin element={PaymentSuccess} />}
            />
            <Route
              path="/payment_failed"
              element={<AfterLogin element={PaymentFailed} />}
            />

            <Route path="*" element={<PublicRoute element={NotFound} />} />

            {/* test */}
            <Route
              path="/pdf_download"
              element={<AfterLogin element={PdfDownloadPage} />}
            />
            <Route
              path="/CheckoutPage/:eid"
              element={<AfterLogin element={CheckoutPage} />}
            />
            {/* Services */}
            {/* <Route
            path="/service"
            element={<PublicRoute element={ServiceComponent} />}
          /> */}

            <Route
              path="/servicepreview/:serviceid"
              element={<PublicRoute element={ServicePreviewPage} />}
            />

            {/* Footer Components */}

            <Route path="/blogs" element={<PublicRoute element={Blogs} />} />
            <Route
              path="/customercare_footer"
              element={<PublicRoute element={CustomerCareFooter} />}
            />
            <Route
              path="/howitswork"
              element={<PublicRoute element={HowItsWork} />}
            />
            <Route
              path="/privacypolicy"
              element={<PublicRoute element={PrivacyPolicy} />}
            />
            <Route
              path="/refundpolicy"
              element={<PublicRoute element={RefundPolicy} />}
            />
            <Route path="/sitemap" element={<PublicRoute element={SiteMap} />} />
            <Route
              path="/terms"
              element={<PublicRoute element={TermsAndCondition} />}
            />
            <Route
              path="/whoweare"
              element={<PublicRoute element={WhoWeAre} />}
            />
            <Route path="/aboutus" element={<PublicRoute element={AboutUs} />} />
            <Route
              path="/contactus"
              element={<PublicRoute element={ContactUs} />}
            />
            <Route
              path="/payment/:id?"
              element={<PublicRoute element={LinkPage} />}
            />
            <Route
              path="/legalpay/:id?"
              element={<PublicRoute element={LegalPaymentLink} />}
            />
            <Route
              path="/legalinvoice/:id?"
              element={<PublicRoute element={LegalpaymentInvoiceDownload} />}
            />
            <Route
              path="/invoice/:id?"
              element={<PublicRoute element={AutoInvoiceDownload} />}
            />
          </Routes>
        </main>
        <Footer />

      </div>
    </BrowserRouter>

  );
}

export default App;
