/**************************************************************************************************
AXIOS WRAPPER
**************************************************************************************************/
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: (process.env.NODE_ENV == 'development' ? 'http://localhost:8000' : 'https://injurycheck1.appspot.com' ),
  headers: {'Content-Type': 'application/json'},
});

export default axiosInstance;
