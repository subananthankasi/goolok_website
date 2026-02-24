import { useRazorpay } from "react-razorpay";
import { useAlert } from "react-alert";
import axiosInstance from "../../Api/axiosInstance";
import { PAYMENT_KEY, PAYMENT_KEY_SECRET } from "../../Api/api";

const ServicePaymentGateway = ({ fetchInvoice, invoiceData, eid }) => {
    const { error, isLoading, Razorpay } = useRazorpay();
    const alert = useAlert();
    const paymentIdHandle = async (data) => {

        const updateData = {
            payid: data.razorpay_payment_id,
            invoiceid: invoiceData.invid,
            invoice_id: invoiceData.invoiceid,
            enqid: eid,
            invoicedpt: invoiceData.invoice,
        };
        try {
            const response = await axiosInstance.post(
                `/vendor/service`,
                updateData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        } catch (error) {
            await alert.error("Error");
        } finally {
            fetchInvoice();
        }
    };


    const handlePayment = (e) => {
        e.preventDefault();

        var options = {
            key: PAYMENT_KEY,
            key_secret: PAYMENT_KEY_SECRET,
            amount: invoiceData?.amount * 100,
            currency: "INR",
            name: "Gharuda infotech",
            description: "for testing purpose",
            order_id: invoiceData?.order_id,
            handler: function (response) {
                paymentIdHandle(response);
            },
            notes: {
                address: "Razorpay Corporate office",
            },
            theme: {
                color: "#3399cc",
            },
        };
        var pay = new window.Razorpay(options);
        pay.open();
    };
    return (
        <div className="d-flex justify-content-center">
            <button
                className="text-white"
                style={{
                    backgroundColor: "#0000ff",
                    minWidth: "150px",
                    padding: "5px 7px",
                    fontFamily: "poppins"
                }}
                onClick={handlePayment}
            >
                Pay {invoiceData.amount || 0}
            </button>
        </div>
    )
}

export default ServicePaymentGateway