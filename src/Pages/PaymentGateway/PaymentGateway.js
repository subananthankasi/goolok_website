import  { useEffect, useState } from "react";
import { useRazorpay } from "react-razorpay";
import  { PAYMENT_KEY, PAYMENT_KEY_SECRET } from "../../Api/api";
import { useAlert } from "react-alert";
import axiosInstance from "../../Api/axiosInstance";

const PaymentComponent = ({ data, validateForm, userData }) => {
  const { error, isLoading, Razorpay } = useRazorpay();
  const alert = useAlert();

  const [mainData, setMainData] = useState([]);
  useEffect(() => {
    if (data) {
      setMainData(data);
    }
  }, []);


  const paymentIdHandle = async (data) => {
    const updateData = {
      id: mainData.id,
      invoiceId: mainData?.body?.id,
      invoice: mainData?.body?.invoice_id,
      name: mainData.customer,
      address: userData?.address,
      city: userData?.city,
      state: userData?.state,
      zip: userData?.zip,
    };
    try {
      const response = await axiosInstance.put(
        `/vendor/invoice/${data.razorpay_payment_id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.reload();
    } catch (error) {
      await alert.error("Error");
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (validateForm()) {
      var options = {
        key: PAYMENT_KEY,
        key_secret: PAYMENT_KEY_SECRET,
        amount: mainData?.body?.amount * 100,
        currency: "INR",
        name: "Gharuda infotech",
        description: "for testing purpose",
        order_id: mainData?.body.order_id,
        handler: function (response) {
          paymentIdHandle(response);
        },
        prefill: {
          name: "Velmurugan",
          email: mainData?.email,
          contact: mainData?.contact,
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
    }
  };

  return (
    <div className="">
      <button
        className="btn w-100 mt-3 text-white"
        style={{ backgroundColor: "#2f4f4f" }}
        onClick={handlePayment}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentComponent;
