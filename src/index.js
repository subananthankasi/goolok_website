import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/Store/store";
import { registerLicense } from "@syncfusion/ej2-base";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "./Utils/AlertTemplate";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "rsuite/dist/rsuite.min.css";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NDaF5cWGBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWH9fd3RcRGReWUBwV0A="
);

const options = {
  position: positions.MIDDLE_RIGHT,
  timeout: 3000,
  offset: "30px",
  transition: transitions.SCALE,
};
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
    .then((registration) => {
    })
    .catch((err) => {
      console.error("Service Worker registration failed:", err);
    });
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
