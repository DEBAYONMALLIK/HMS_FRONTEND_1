import axios from "axios";

const BASE_URL_DEV="http://localhost:8080/hms/"
  const BASE_URL_PROD="https://hms-backend-1-3.onrender.com/hms"

const axiosInstance = axios.create({
     baseURL :BASE_URL_PROD,
     withCredentials:true,
     timeout: 5000, //ms
});

export default axiosInstance;
