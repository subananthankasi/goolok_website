import axios from 'axios';


const axiosInstance = axios.create({
  // baseURL: "https://api.goolok.com",
  // baseURL: "https://api.rooptek.in",
  baseURL: 'https://webman.co.in/goolok'
});

 axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('zxcvbnm@#'); 
    if (token) {
      config.headers['Authorization'] = `${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
