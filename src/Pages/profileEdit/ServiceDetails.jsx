import { useEffect, useState } from "react";
import Servicestatus from "./servicestatus";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Api/axiosInstance";

const ServiceDetails = () => {
    const { eid } = useParams()
    const [getData, setGetData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchInvoice = async () => {
        setLoading(true)
        try {
            const response = await axiosInstance.get(`/vendor/service/${eid}`, {
                headers: {
                    "Level": "progress",
                }
            });
            setGetData(response.data);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching invoice:", error);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchInvoice()
    }, [])
    return (
        <>
            <div className="row w-100">
                <div className="col-md-9 mx-auto py-5" style={{ paddingTop: 50 }}>
                    <div className="Mybooking">
                        <Servicestatus invoiceData={getData} fetchInvoice={fetchInvoice} eid={eid} loading={loading} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceDetails