import { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Polygon,
  OverlayView,
} from "@react-google-maps/api";
import { IMG_PATH } from "../../Api/api";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { decryptData } from "../../Utils/encryptData";
import loc from "../../assets/loc.png";
import "leaflet/dist/leaflet.css";



const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 13.078187,
  lng: 79.972347,
};
const tamilNaduPolygon = [
  { lat: 11.51, lng: 76.215 },
  { lat: 11.53, lng: 76.22 },
  { lat: 11.56, lng: 76.205 },
  { lat: 11.58, lng: 76.21 },
  { lat: 11.615, lng: 76.265 },
  { lat: 11.595, lng: 76.3 },
  { lat: 11.61, lng: 76.325 },
  { lat: 11.6, lng: 76.345 },
  { lat: 11.605, lng: 76.355 },
  { lat: 11.63, lng: 76.36 },
  { lat: 11.64, lng: 76.37 },
  { lat: 11.645, lng: 76.41 },
  { lat: 11.675, lng: 76.41 },
  { lat: 11.675, lng: 76.445 },
  { lat: 11.705, lng: 76.465 },
  { lat: 11.705, lng: 76.48 },
  { lat: 11.72, lng: 76.505 },
  { lat: 11.705, lng: 76.535 },
  { lat: 11.68, lng: 76.56 },
  { lat: 11.63, lng: 76.57 },
  { lat: 11.62, lng: 76.61 },
  { lat: 11.63, lng: 76.74 },
  { lat: 11.620769, lng: 76.81 },
  { lat: 11.655, lng: 76.81 },
  { lat: 11.71, lng: 76.835 },
  { lat: 11.735, lng: 76.86 },
  { lat: 11.775, lng: 76.87 },
  { lat: 11.805, lng: 76.895 },
  { lat: 11.8, lng: 76.955 },
  { lat: 11.82, lng: 76.965 },
  { lat: 11.825, lng: 77.01 },
  { lat: 11.795, lng: 77.045 },
  { lat: 11.795, lng: 77.065 },
  { lat: 11.785, lng: 77.08 },
  { lat: 11.76, lng: 77.075 },
  { lat: 11.75, lng: 77.085 },
  { lat: 11.775, lng: 77.085 },
  { lat: 11.785, lng: 77.1 },
  { lat: 11.78, lng: 77.12 },
  { lat: 11.79, lng: 77.125 },
  { lat: 11.805, lng: 77.22 },
  { lat: 11.825, lng: 77.24 },
  { lat: 11.815, lng: 77.27 },
  { lat: 11.82, lng: 77.29 },
  { lat: 11.78, lng: 77.33 },
  { lat: 11.8, lng: 77.355 },
  { lat: 11.785, lng: 77.415 },
  { lat: 11.835, lng: 77.435 },
  { lat: 11.9, lng: 77.435 },
  { lat: 11.91, lng: 77.445 },
  { lat: 11.905, lng: 77.46 },
  { lat: 11.95, lng: 77.47 },
  { lat: 11.945, lng: 77.585 },
  { lat: 11.965, lng: 77.635 },
  { lat: 11.965, lng: 77.655 },
  { lat: 12.02, lng: 77.675 },
  { lat: 12.07, lng: 77.705 },
  { lat: 12.095, lng: 77.74 },
  { lat: 12.115, lng: 77.75 },
  { lat: 12.12, lng: 77.735 },
  { lat: 12.16, lng: 77.72 },
  { lat: 12.18, lng: 77.655 },
  { lat: 12.175, lng: 77.635 },
  { lat: 12.185, lng: 77.61 },
  { lat: 12.175, lng: 77.575 },
  { lat: 12.175, lng: 77.49 },
  { lat: 12.195, lng: 77.455 },
  { lat: 12.21, lng: 77.45 },
  { lat: 12.225, lng: 77.46 },
  { lat: 12.24, lng: 77.44 },
  { lat: 12.26, lng: 77.44 },
  { lat: 12.29, lng: 77.47 },
  { lat: 12.29, lng: 77.505 },
  { lat: 12.3, lng: 77.515 },
  { lat: 12.3, lng: 77.53 },
  { lat: 12.335, lng: 77.55 },
  { lat: 12.37, lng: 77.59 },
  { lat: 12.445, lng: 77.6 },
  { lat: 12.45, lng: 77.565 },
  { lat: 12.46, lng: 77.555 },
  { lat: 12.485, lng: 77.56 },
  { lat: 12.49, lng: 77.57 },
  { lat: 12.495, lng: 77.56 },
  { lat: 12.555, lng: 77.55 },
  { lat: 12.61, lng: 77.56 },
  { lat: 12.625, lng: 77.575 },
  { lat: 12.665, lng: 77.57 },
  { lat: 12.675, lng: 77.58 },
  { lat: 12.695, lng: 77.65 },
  { lat: 12.685, lng: 77.69 },
  { lat: 12.705, lng: 77.715 },
  { lat: 12.71, lng: 77.735 },
  { lat: 12.735, lng: 77.735 },
  { lat: 12.745, lng: 77.755 },
  { lat: 12.765, lng: 77.75 },
  { lat: 12.8, lng: 77.78 },
  { lat: 12.82, lng: 77.785 },
  { lat: 12.825, lng: 77.775 },
  { lat: 12.855, lng: 77.775 },
  { lat: 12.87, lng: 77.785 },
  { lat: 12.88, lng: 77.82 },
  { lat: 12.875, lng: 77.86 },
  { lat: 12.9, lng: 77.925 },
  { lat: 12.835, lng: 77.985 },
  { lat: 12.865, lng: 78.005 },
  { lat: 12.86, lng: 78.06 },
  { lat: 12.79, lng: 78.135 },
  { lat: 12.77, lng: 78.23 },
  { lat: 12.76, lng: 78.24 },
  { lat: 12.715, lng: 78.245 },
  { lat: 12.71, lng: 78.275 },
  { lat: 12.67, lng: 78.3 },
  { lat: 12.67, lng: 78.315 },
  { lat: 12.63, lng: 78.375 },
  { lat: 12.64, lng: 78.41 },
  { lat: 12.635, lng: 78.44 },
  { lat: 12.675, lng: 78.44 },
  { lat: 12.685, lng: 78.47 },
  { lat: 12.695, lng: 78.465 },
  { lat: 12.705, lng: 78.475 },
  { lat: 12.72, lng: 78.46 },
  { lat: 12.745, lng: 78.465 },
  { lat: 12.755, lng: 78.475 },
  { lat: 12.755, lng: 78.49 },
  { lat: 12.735, lng: 78.525 },
  { lat: 12.76, lng: 78.53 },
  { lat: 12.78, lng: 78.565 },
  { lat: 12.82, lng: 78.575 },
  { lat: 12.845, lng: 78.57 },
  { lat: 12.935, lng: 78.615 },
  { lat: 12.955, lng: 78.61 },
  { lat: 12.965, lng: 78.595 },
  { lat: 12.99, lng: 78.595 },
  { lat: 13.04, lng: 78.65 },
  { lat: 13.03, lng: 78.68 },
  { lat: 13.075, lng: 78.69 },
  { lat: 13.065, lng: 78.745 },
  { lat: 13.07, lng: 78.77 },
  { lat: 13.1, lng: 78.805 },
  { lat: 13.09, lng: 78.845 },
  { lat: 13.105, lng: 78.86 },
  { lat: 13.105, lng: 78.885 },
  { lat: 13.085, lng: 78.905 },
  { lat: 13.085, lng: 78.95 },
  { lat: 13.095, lng: 78.99 },
  { lat: 13.075, lng: 79.01 },
  { lat: 13.075, lng: 79.035 },
  { lat: 13.065, lng: 79.04 },
  { lat: 13.055, lng: 79.065 },
  { lat: 13.035, lng: 79.075 },
  { lat: 13.045, lng: 79.11 },
  { lat: 13.03, lng: 79.155 },
  { lat: 13.065, lng: 79.15 },
  { lat: 13.075, lng: 79.165 },
  { lat: 13.1, lng: 79.175 },
  { lat: 13.115, lng: 79.2 },
  { lat: 13.135, lng: 79.195 },
  { lat: 13.155, lng: 79.21 },
  { lat: 13.155, lng: 79.23 },
  { lat: 13.165, lng: 79.235 },
  { lat: 13.17, lng: 79.25 },
  { lat: 13.155, lng: 79.265 },
  { lat: 13.155, lng: 79.285 },
  { lat: 13.14, lng: 79.29 },
  { lat: 13.135, lng: 79.31 },
  { lat: 13.145, lng: 79.325 },
  { lat: 13.18, lng: 79.335 },
  { lat: 13.2, lng: 79.365 },
  { lat: 13.205, lng: 79.39 },
  { lat: 13.27, lng: 79.395 },
  { lat: 13.295, lng: 79.355 },
  { lat: 13.315, lng: 79.355 },
  { lat: 13.34, lng: 79.41 },
  { lat: 13.345, lng: 79.46 },
  { lat: 13.33, lng: 79.545 },
  { lat: 13.32, lng: 79.555 },
  { lat: 13.27, lng: 79.57 },
  { lat: 13.29, lng: 79.6 },
  { lat: 13.28, lng: 79.62 },
  { lat: 13.295, lng: 79.63 },
  { lat: 13.3, lng: 79.68 },
  { lat: 13.265, lng: 79.7 },
  { lat: 13.28, lng: 79.7 },
  { lat: 13.295, lng: 79.73 },
  { lat: 13.315, lng: 79.735 },
  { lat: 13.325, lng: 79.75 },
  { lat: 13.31, lng: 79.78 },
  { lat: 13.325, lng: 79.795 },
  { lat: 13.325, lng: 79.845 },
  { lat: 13.335, lng: 79.855 },
  { lat: 13.34, lng: 79.88 },
  { lat: 13.365, lng: 79.905 },
  { lat: 13.36, lng: 79.92 },
  { lat: 13.405, lng: 79.91 },
  { lat: 13.42, lng: 79.92 },
  { lat: 13.43, lng: 79.945 },
  { lat: 13.455, lng: 79.94 },
  { lat: 13.47, lng: 79.95 },
  { lat: 13.48, lng: 79.98 },
  { lat: 13.49, lng: 79.985 },
  { lat: 13.5, lng: 79.97 },
  { lat: 13.545, lng: 79.975 },
  { lat: 13.55, lng: 80 },
  { lat: 13.545, lng: 80.04 },
  { lat: 13.56, lng: 80.07 },
  { lat: 13.5, lng: 80.16 },
  { lat: 13.5, lng: 80.22 },
  { lat: 13.49, lng: 80.25 },
  { lat: 13.455, lng: 80.28 },
  { lat: 13.425, lng: 80.285 },
  { lat: 13.465, lng: 80.32 },
  { lat: 13.475, lng: 80.685 },
  { lat: 13.455, lng: 80.705 },
  { lat: 12.885, lng: 80.605 },
  { lat: 12.78, lng: 80.595 },
  { lat: 12.325, lng: 80.45 },
  { lat: 12.13, lng: 80.345 },
  { lat: 11.835, lng: 80.225 },
  { lat: 11.825, lng: 80.215 },
  { lat: 11.825, lng: 80.2 },
  { lat: 11.94, lng: 79.825 },
  { lat: 11.93, lng: 79.785 },
  { lat: 11.91, lng: 79.82 },
  { lat: 11.875, lng: 79.815 },
  { lat: 11.86, lng: 79.83 },
  { lat: 11.77, lng: 80.18 },
  { lat: 11.755, lng: 80.195 },
  { lat: 11.515, lng: 80.16 },
  { lat: 11.035, lng: 80.24 },
  { lat: 10.975, lng: 80.24 },
  { lat: 10.965, lng: 80.23 },
  { lat: 10.955, lng: 79.855 },
  { lat: 10.965, lng: 79.815 },
  { lat: 10.945, lng: 79.785 },
  { lat: 10.955, lng: 79.76 },
  { lat: 10.935, lng: 79.765 },
  { lat: 10.92, lng: 79.74 },
  { lat: 10.91, lng: 79.78 },
  { lat: 10.89, lng: 79.795 },
  { lat: 10.885, lng: 79.82 },
  { lat: 10.875, lng: 79.83 },
  { lat: 10.84, lng: 79.83 },
  { lat: 10.85, lng: 79.85 },
  { lat: 10.845, lng: 80.235 },
  { lat: 10.835, lng: 80.245 },
  { lat: 10.09, lng: 80.06 },
  { lat: 10.075, lng: 80.045 },
  { lat: 9.955, lng: 79.675 },
  { lat: 9.905, lng: 79.575 },
  { lat: 9.66, lng: 79.4 },
  { lat: 9.555, lng: 79.415 },
  { lat: 9.435, lng: 79.505 },
  { lat: 9.42, lng: 79.505 },
  { lat: 9.14, lng: 79.47 },
  { lat: 8.975, lng: 79.395 },
  { lat: 8.965, lng: 79.385 },
  { lat: 8.965, lng: 79.37 },
  { lat: 9, lng: 79.07 },
  { lat: 8.915, lng: 78.745 },
  { lat: 8.835, lng: 78.565 },
  { lat: 8.35, lng: 78.485 },
  { lat: 8.15, lng: 78.38 },
  { lat: 8.025, lng: 78.11 },
  { lat: 7.84, lng: 77.675 },
  { lat: 7.84, lng: 77.66 },
  { lat: 8.075, lng: 76.915 },
  { lat: 8.09, lng: 76.9 },
  { lat: 8.11, lng: 76.905 },
  { lat: 8.325, lng: 77.085 },
  { lat: 8.34, lng: 77.115 },
  { lat: 8.355, lng: 77.12 },
  { lat: 8.385, lng: 77.115 },
  { lat: 8.405, lng: 77.135 },
  { lat: 8.4, lng: 77.15 },
  { lat: 8.445, lng: 77.17 },
  { lat: 8.455, lng: 77.19 },
  { lat: 8.515, lng: 77.18 },
  { lat: 8.535, lng: 77.2 },
  { lat: 8.525, lng: 77.245 },
  { lat: 8.54, lng: 77.25 },
  { lat: 8.545, lng: 77.26 },
  { lat: 8.575, lng: 77.25 },
  { lat: 8.595, lng: 77.225 },
  { lat: 8.625, lng: 77.215 },
  { lat: 8.66, lng: 77.18 },
  { lat: 8.695, lng: 77.18 },
  { lat: 8.705, lng: 77.165 },
  { lat: 8.73, lng: 77.155 },
  { lat: 8.745, lng: 77.155 },
  { lat: 8.76, lng: 77.175 },
  { lat: 8.775, lng: 77.175 },
  { lat: 8.79, lng: 77.205 },
  { lat: 8.815, lng: 77.215 },
  { lat: 8.825, lng: 77.23 },
  { lat: 8.86, lng: 77.24 },
  { lat: 8.875, lng: 77.22 },
  { lat: 8.885, lng: 77.22 },
  { lat: 8.895, lng: 77.2 },
  { lat: 8.905, lng: 77.2 },
  { lat: 8.905, lng: 77.185 },
  { lat: 8.92, lng: 77.17 },
  { lat: 8.95, lng: 77.175 },
  { lat: 9, lng: 77.13 },
  { lat: 9.045, lng: 77.14 },
  { lat: 9.065, lng: 77.16 },
  { lat: 9.07, lng: 77.185 },
  { lat: 9.115, lng: 77.195 },
  { lat: 9.155, lng: 77.245 },
  { lat: 9.17, lng: 77.245 },
  { lat: 9.175, lng: 77.235 },
  { lat: 9.19, lng: 77.23 },
  { lat: 9.21, lng: 77.24 },
  { lat: 9.22, lng: 77.26 },
  { lat: 9.225, lng: 77.255 },
  { lat: 9.27, lng: 77.265 },
  { lat: 9.3, lng: 77.26 },
  { lat: 9.32, lng: 77.28 },
  { lat: 9.345, lng: 77.28 },
  { lat: 9.365, lng: 77.315 },
  { lat: 9.395, lng: 77.32 },
  { lat: 9.42, lng: 77.315 },
  { lat: 9.45, lng: 77.33 },
  { lat: 9.48, lng: 77.355 },
  { lat: 9.485, lng: 77.38 },
  { lat: 9.5, lng: 77.38 },
  { lat: 9.525, lng: 77.345 },
  { lat: 9.555, lng: 77.335 },
  { lat: 9.575, lng: 77.305 },
  { lat: 9.555, lng: 77.285 },
  { lat: 9.555, lng: 77.255 },
  { lat: 9.565, lng: 77.245 },
  { lat: 9.565, lng: 77.22 },
  { lat: 9.59, lng: 77.2 },
  { lat: 9.59, lng: 77.17 },
  { lat: 9.605, lng: 77.15 },
  { lat: 9.665, lng: 77.16 },
  { lat: 9.685, lng: 77.18 },
  { lat: 9.735, lng: 77.19 },
  { lat: 9.74, lng: 77.2 },
  { lat: 9.8, lng: 77.22 },
  { lat: 9.81, lng: 77.205 },
  { lat: 9.855, lng: 77.205 },
  { lat: 9.865, lng: 77.195 },
  { lat: 9.895, lng: 77.195 },
  { lat: 9.97, lng: 77.235 },
  { lat: 9.97, lng: 77.25 },
  { lat: 9.985, lng: 77.24 },
  { lat: 10.025, lng: 77.24 },
  { lat: 10.065, lng: 77.205 },
  { lat: 10.07, lng: 77.19 },
  { lat: 10.11, lng: 77.18 },
  { lat: 10.135, lng: 77.195 },
  { lat: 10.15, lng: 77.235 },
  { lat: 10.145, lng: 77.255 },
  { lat: 10.205, lng: 77.26 },
  { lat: 10.2, lng: 77.24 },
  { lat: 10.215, lng: 77.225 },
  { lat: 10.255, lng: 77.225 },
  { lat: 10.3, lng: 77.195 },
  { lat: 10.335, lng: 77.205 },
  { lat: 10.335, lng: 77.175 },
  { lat: 10.32, lng: 77.165 },
  { lat: 10.3, lng: 77.13 },
  { lat: 10.28, lng: 77.075 },
  { lat: 10.255, lng: 77.07 },
  { lat: 10.235, lng: 77.055 },
  { lat: 10.23, lng: 77.03 },
  { lat: 10.2, lng: 76.99 },
  { lat: 10.205, lng: 76.965 },
  { lat: 10.215, lng: 76.96 },
  { lat: 10.215, lng: 76.9 },
  { lat: 10.23, lng: 76.885 },
  { lat: 10.25, lng: 76.88 },
  { lat: 10.265, lng: 76.86 },
  { lat: 10.26, lng: 76.85 },
  { lat: 10.275, lng: 76.825 },
  { lat: 10.285, lng: 76.825 },
  { lat: 10.3, lng: 76.81 },
  { lat: 10.33, lng: 76.805 },
  { lat: 10.355, lng: 76.815 },
  { lat: 10.38, lng: 76.795 },
  { lat: 10.41, lng: 76.785 },
  { lat: 10.445, lng: 76.8 },
  { lat: 10.495, lng: 76.8 },
  { lat: 10.525, lng: 76.81 },
  { lat: 10.575, lng: 76.81 },
  { lat: 10.585, lng: 76.79 },
  { lat: 10.635, lng: 76.785 },
  { lat: 10.645, lng: 76.795 },
  { lat: 10.645, lng: 76.85 },
  { lat: 10.68, lng: 76.835 },
  { lat: 10.715, lng: 76.86 },
  { lat: 10.78, lng: 76.875 },
  { lat: 10.78, lng: 76.85 },
  { lat: 10.79, lng: 76.845 },
  { lat: 10.79, lng: 76.83 },
  { lat: 10.81, lng: 76.815 },
  { lat: 10.825, lng: 76.82 },
  { lat: 10.845, lng: 76.805 },
  { lat: 10.86, lng: 76.765 },
  { lat: 10.86, lng: 76.73 },
  { lat: 10.915, lng: 76.63 },
  { lat: 10.965, lng: 76.64 },
  { lat: 10.99, lng: 76.66 },
  { lat: 11.01, lng: 76.66 },
  { lat: 11.05, lng: 76.695 },
  { lat: 11.05, lng: 76.715 },
  { lat: 11.105, lng: 76.715 },
  { lat: 11.115, lng: 76.685 },
  { lat: 11.14, lng: 76.67 },
  { lat: 11.175, lng: 76.67 },
  { lat: 11.195, lng: 76.7 },
  { lat: 11.205, lng: 76.7 },
  { lat: 11.21, lng: 76.69 },
  { lat: 11.195, lng: 76.68 },
  { lat: 11.165, lng: 76.63 },
  { lat: 11.175, lng: 76.59 },
  { lat: 11.17, lng: 76.51 },
  { lat: 11.185, lng: 76.49 },
  { lat: 11.17, lng: 76.48 },
  { lat: 11.16, lng: 76.445 },
  { lat: 11.185, lng: 76.42 },
  { lat: 11.235, lng: 76.425 },
  { lat: 11.245, lng: 76.43 },
  { lat: 11.275, lng: 76.5 },
  { lat: 11.33, lng: 76.52 },
  { lat: 11.325, lng: 76.505 },
  { lat: 11.335, lng: 76.49 },
  { lat: 11.345, lng: 76.49 },
  { lat: 11.365, lng: 76.435 },
  { lat: 11.4, lng: 76.39 },
  { lat: 11.41, lng: 76.39 },
  { lat: 11.435, lng: 76.34 },
  { lat: 11.425, lng: 76.33 },
  { lat: 11.425, lng: 76.315 },
  { lat: 11.435, lng: 76.285 },
  { lat: 11.45, lng: 76.27 },
  { lat: 11.44, lng: 76.23 },
  { lat: 11.45, lng: 76.22 },
  { lat: 11.49, lng: 76.225 },
  { lat: 11.51, lng: 76.215 },
];

const LIBRARIES = ["places", "geometry"];
const loaderOptions = {
  id: "google-map-script",
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: LIBRARIES,
};

const SearchLocation = ({ propertyData }) => {

  const [activeMarker, setActiveMarker] = useState(null);
  const [polygonCoords, setPolygonCoords] = useState([]);
  const [mapCenter, setMapCenter] = useState(center);

  const coverLocation = sessionStorage.getItem("location");
  const decryCoverLocation = coverLocation ? decryptData(coverLocation) : "";
  const data =
    Array.isArray(propertyData) && propertyData.length > 0 ? propertyData : [];

  const { isLoaded } = useJsApiLoader(loaderOptions);
  const [map, setMap] = useState(null);
  const [mapZoom, setMapZoom] = useState(6);

  useEffect(() => {
    const createRoundedPolygon = (
      minLat,
      maxLat,
      minLon,
      maxLon,
      segments = 64
    ) => {
      const centerLat = (minLat + maxLat) / 2;
      const centerLng = (minLon + maxLon) / 2;
      const radiusLat = (maxLat - minLat) / 2;
      const radiusLng = (maxLon - minLon) / 2;

      const coords = [];
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * 2 * Math.PI;
        const lat = centerLat + radiusLat * Math.sin(angle);
        const lng = centerLng + radiusLng * Math.cos(angle);
        coords.push({ lat, lng });
      }
      return coords;
    };

    const showTamilNaduBoundary = () => {
      setPolygonCoords(tamilNaduPolygon);

      const center = tamilNaduPolygon.reduce(
        (acc, curr) => ({ lat: acc.lat + curr.lat, lng: acc.lng + curr.lng }),
        { lat: 0, lng: 0 }
      );

      setMapCenter({
        lat: center.lat / tamilNaduPolygon.length,
        lng: center.lng / tamilNaduPolygon.length,
      });
      setMapZoom(6);
      // setMapCenter({
      //   lat: 13.078187,
      //   lng: 79.972347
      // });

    };

    if (!decryCoverLocation) {
      showTamilNaduBoundary();
      return;
    }

    const fetchBoundary = async () => {
      try {
        const nominatimRes = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&polygon_geojson=1&q=${encodeURIComponent(
            decryCoverLocation + ", Tamil Nadu, India"
          )}`
        );
        const nominatimData = await nominatimRes.json();
        if (!nominatimData?.length) {
          console.warn("No location found, showing Tamil Nadu fallback.");
          return showTamilNaduBoundary();
        }
        const bestMatch = nominatimData[0];
        const { lat, lon, boundingbox, geojson, display_name } = bestMatch;

        const centerLat = parseFloat(lat);
        const centerLng = parseFloat(lon);

        if (
          geojson &&
          (geojson.type === "Polygon" || geojson.type === "MultiPolygon")
        ) {
          const coords =
            geojson.type === "Polygon"
              ? geojson.coordinates[0].map(([lng, lat]) => ({ lat, lng }))
              : geojson.coordinates[0][0].map(([lng, lat]) => ({ lat, lng }));

          setPolygonCoords(coords);
          setMapCenter({ lat: centerLat, lng: centerLng });
          setMapZoom(10)
        } else if (boundingbox) {
          const [minLat, maxLat, minLon, maxLon] = boundingbox.map(Number);

          // Create a rounded polygon
          const roundedPolygon = createRoundedPolygon(
            minLat,
            maxLat,
            minLon,
            maxLon,
            64
          );
          setPolygonCoords(roundedPolygon);
          setMapCenter({ lat: centerLat, lng: centerLng });
          setMapZoom(10)

          console.warn(
            ` Polygon missing — using rounded bounding box for ${display_name}`
          );
        } else {
          // fallback to Tamil Nadu polygon
          showTamilNaduBoundary();
        }
      } catch (err) {
        console.error("Boundary fetch error:", err);
        showTamilNaduBoundary();
      }
    };

    fetchBoundary();
  }, [decryCoverLocation]);

  const onLoad = useCallback(
    (mapInstance) => {
      setMap(mapInstance);
      if (polygonCoords.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        polygonCoords.forEach((p) => bounds.extend(p));
        mapInstance.fitBounds(bounds);
      }
    },
    [polygonCoords]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);



  const handleMarkerHover = (index) => {
    setActiveMarker((prevIndex) => {
      if (prevIndex === index) {
        return null;
      }
      return null;
    });

    setTimeout(() => {
      setActiveMarker(index);
    }, 0);
  };

  const closeClick = (id) => {
    setActiveMarker(null);
  };

  const mapTheme = [
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#686868",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f2f2f2",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {
          lightness: "-22",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          saturation: "11",
        },
        {
          lightness: "-51",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text",
      stylers: [
        {
          saturation: "3",
        },
        {
          lightness: "-56",
        },
        {
          weight: "2.20",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          lightness: "-52",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.stroke",
      stylers: [
        {
          weight: "6.13",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.icon",
      stylers: [
        {
          lightness: "-10",
        },
        {
          gamma: "0.94",
        },
        {
          weight: "1.24",
        },
        {
          saturation: "-100",
        },
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          lightness: "-16",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          saturation: "-41",
        },
        {
          lightness: "-41",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.stroke",
      stylers: [
        {
          weight: "5.46",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "geometry.fill",
      stylers: [
        {
          weight: "0.72",
        },
        {
          lightness: "-16",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          lightness: "-37",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#b7e4f4",
        },
        {
          visibility: "on",
        },
      ],
    },
  ];

  const mapOptions = {
    styles: mapTheme,
    disableDefaultUI: false,
    zoomControl: true,
  };

  return isLoaded ? (
    <section style={{ marginTop: "0px" }}>
      <div className="">
        <div
          className="map-container p-2"
          style={{ height: "725px", margin: "10px" }}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            // zoom={10}
            zoom={mapZoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={mapOptions}
          >
            {data?.map((item, index) => {
              if (!item.location || !item.location.includes(",")) {
                console.warn("Invalid location format:", item.location);
                return null;
              }
              const [lat, lng] = item.location?.split(",").map(Number);

              if (isNaN(lat) || isNaN(lng)) {
                console.warn("Invalid coordinates:", { lat, lng });
                return null;
              }
              return (
                <>
                  {(() => {
                    const currentProduct = data.find((p) => p.id === item.id);
                    return (
                      <>
                        <Marker
                          key={index}
                          position={{ lat, lng }}
                          onClick={() => handleMarkerHover(index)}
                          icon={{
                            url: loc,
                            scaledSize: new window.google.maps.Size(30, 30),
                          }}
                        >
                          {activeMarker === index && (
                            <InfoWindow
                              position={{ lat, lng }}
                              options={{
                                pixelOffset: new window.google.maps.Size(0, 5),
                                maxWidth: 400,
                              }}
                              onCloseClick={closeClick}
                            >
                              <div className="infowindow-detail">
                                {currentProduct && (
                                  <Link
                                    to={`/property/${currentProduct.id}/${currentProduct.propertyType}`}
                                    key={currentProduct.id}
                                    className="text-decoration-none text-dark"
                                  >
                                    {currentProduct.video ? (
                                      <video
                                        src={`${IMG_PATH}enquiry/video/${currentProduct.video}`}
                                        controls
                                        className="infowindow-media"
                                      />
                                    ) : (
                                      <Carousel
                                        interval={3000}
                                        controls={true}
                                        indicators={false}
                                        className="infowindow-carousel"
                                      >
                                        {currentProduct.images?.map((img, i) => (
                                          <Carousel.Item key={i}>
                                            <img
                                              src={`${IMG_PATH}enquiry/gallery/${img}`}
                                              alt={`slide-${i}`}
                                              className="infowindow-media"
                                            />
                                          </Carousel.Item>
                                        ))}
                                      </Carousel>
                                    )}

                                    <div className="infowindow-content p-2">
                                      <h5 className="p-0 m-0">{currentProduct.landType}</h5>
                                      <h5 className="p-0 m-0" style={{ color: "gray" }}>
                                        {currentProduct.propertyName}
                                      </h5>
                                      <p className="mb-1" style={{ letterSpacing: "0.5px" }}>
                                        <i className="fa fa-map-marker me-2 " />
                                        {currentProduct.taluk}
                                      </p>
                                      <div className="d-flex justify-content-between align-items-center">
                                        <span style={{ fontWeight: "600" }}>
                                          <i className="fa-solid fa-ruler-combined me-1" />
                                          {currentProduct.units}
                                        </span>
                                        <span className="infowindow-price">
                                          <i className="fa fa-inr me-1" />
                                          {currentProduct.price}
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                )}
                              </div>
                            </InfoWindow>
                          )}
                        </Marker>

                        {/* 🔹 Overlay updated to use currentProduct */}
                        {currentProduct && (
                          <OverlayView
                            position={{ lat: lat, lng: lng }}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                          >
                            <div className="custom-tooltip">{currentProduct.propertyName}</div>
                          </OverlayView>
                        )}
                      </>
                    );
                  })()}
                </>
              );
            })}
            {polygonCoords.length > 0 && (
              <Polygon
                paths={polygonCoords}
                options={{
                  strokeColor: "#05599F",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#78BDF6",
                  fillOpacity: 0.35,
                }}
              />
            )}
          </GoogleMap>
        </div>
      </div>
    </section>
  ) : null;
};

export default SearchLocation;
