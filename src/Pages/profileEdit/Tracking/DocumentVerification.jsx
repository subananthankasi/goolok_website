import { useState } from "react";
import axiosInstance from "../../../Api/axiosInstance";
import { useAlert } from "react-alert";
import { IMG_PATH } from "../../../Api/api";
import DownloadIcon from "@mui/icons-material/Download";


const DocumentVerification = ({ docdata, fetch }) => {

  const alert = useAlert();
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState({});
  const [fileNames, setFileNames] = useState({});

  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];

    if (!validTypes.includes(file.type)) {
      alert.error("Invalid file type. Please upload a PDF, PNG, JPEG, or JPG file.");
      return;
    }

    setFiles((prevFiles) => ({
      ...prevFiles,
      [id]: file,
    }));

    setFileNames((prev) => ({
      ...prev,
      [id]: file.name,
    }));
  };




  const handleFileUpload = async (id) => {
    if (!files[id]) {
      alert.error("Please select a file before submitting.");
      return;
    }

    setLoading((prevLoading) => ({
      ...prevLoading,
      [id]: true,
    }));
    const formData = new FormData();
    formData.append("document", files[id]);
    formData.append("id", id);
    try {
      const response = await axiosInstance.post(
        "/vendor/fileupdate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Gl-Status": "user"
          },
        }
      );
      fetch()
      alert.success("Document submitted successfully!")
    } catch (error) {
      alert.error(
        "Error! Please try again later"
      );
    }
  };

  return (
    <div className="row ">
      {docdata?.some(item => item.document === null) ? (
        <p className="text-center" style={{ fontFamily: "poppins", color: "gray", }}>Here you can view your uploaded documents.
          If anything is missing, you can upload it below.</p>
      ) : (
        <p className="text-center" style={{ fontFamily: "poppins", color: "gray" }}>All required documents have been successfully submitted and are up to date.</p>
      )}

      {docdata?.map((item, index) => (
        <div className="col-md-6 mt-3" key={item.id}>

          {item.document && item.status !== "redo" ? (
            <div className="card">
              <div
                className="pdf-wrapper"
                onClick={() =>
                  window.open(`${IMG_PATH}enquiry/${item.document}`, "_blank")
                }
              >
                <embed
                  src={`${IMG_PATH}enquiry/${item.document}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="pdf-hidden-scroll"
                  type="application/pdf"
                />
              </div>
              <hr className="m-0 p-0" />
              <div className="p-2 d-flex justify-content-between align-items-center">
                <p className="" style={{ fontFamily: "poppins", fontWeight: "600" }}> {item.doc_type} </p>
                <a
                  href={`${IMG_PATH}enquiry/${item.document}`}
                  download
                  target="_blank"
                  className="btn"
                >
                  <DownloadIcon sx={{ color: "#0000ff" }} />
                </a>
              </div>
            </div>
          ) : (
            <section className="card p-4 cardheight text-center justify-content-center">
              <div className="premium-upload-wrapper">
                <label className="premium-upload">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, item.id)}
                  />

                  <div className="upload-icon">📁</div>

                  {fileNames[item.id] ? (
                    <p className="uploaded-file-name">{fileNames[item.id]}</p>
                  ) : (
                    <p className="upload-title">Click to Upload</p>
                  )}

                  {/* <span className="upload-hint">Supported: PDF, JPG, PNG</span> */}
                </label>
              </div>

              <div className=" d-flex justify-content-between align-items-center mt-2 text-end">
                <p className="" style={{ fontFamily: "poppins", fontWeight: "600" }}>{item.doc_type}</p>
                <button
                  className="text-white"
                  style={{ backgroundColor: "#0000ff", padding: "7px 10px", fontFamily: "poppins" }}
                  onClick={() => handleFileUpload(item.id)}
                  disabled={loading[item.id]}
                >
                  {loading[item.id] ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </section>
          )}
        </div>
      ))}
    </div>
  );
};

export default DocumentVerification;
