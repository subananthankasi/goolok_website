import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/Store/store";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "./Utils/AlertTemplate";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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


