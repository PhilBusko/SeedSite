/**************************************************************************************************
AXIOS WRAPPER
- axios is bugged and doesnt use the baseURL, like the online help says
- next best solution is to create your own instance, for which the baseURL does work
**************************************************************************************************/
import axios from 'axios';

console.log("axios");
console.log(process.env.NODE_ENV);
console.log(window.location.hostname);

let host = 'http://localhost:8000';
if (window.location.host.includes('localhost') == false) 
    host = `https://${window.location.host}:443`;

const axiosInstance = axios.create({
  baseURL: host,
  headers: {'Content-Type': 'application/json'},
});

export default axiosInstance;
