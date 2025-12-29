import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRazorpay } from "react-razorpay";
import { useAlert } from "react-alert";
import API_BASE_URL, {
  PAYMENT_KEY,
  PAYMENT_KEY_SECRET,
} from "../../../Api/api";
import axiosInstance from "../../../Api/axiosInstance";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const InvoicePaymentGateway = ({ invoiceData, fetchInvoice }) => {
  const { id } = useParams();
  const { error, isLoading, Razorpay } = useRazorpay();
  const alert = useAlert();
  const [paymentLoading, setPaymentLoading] = useState(false)
  const paymentIdHandle = async (data) => {
    const updateData = {
      payid: data.razorpay_payment_id,
      invoiceid: invoiceData.id,
      invoice: invoiceData.invoice_id,
      enqid: id,
      invoiceNumber: invoiceData.invoice_id,
    };
    setPaymentLoading(true)
    try {
      const response = await axiosInstance.post(
        `/vendor/paymentverify`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setPaymentLoading(false)
    } catch (error) {
      await alert.error("Error");
      setPaymentLoading(false)
    } finally {
      fetchInvoice();
      setPaymentLoading(false)
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
      // prefill: {
      //   name:"Velmurugan",
      //   email:mainData?.email,
      //   contact:mainData?.contact
      // },
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
        className="btn text-white"
        style={{
          backgroundColor: "#2f4f4f",
          minWidth: "150px",
          fontFamily: "poppins"
        }}
        onClick={handlePayment}
      >
        Pay {invoiceData.amount || 0}
      </button>
    </div>
  );
};

export default InvoicePaymentGateway;
