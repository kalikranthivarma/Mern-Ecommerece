
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:2000/api",
  withCredentials: true,
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } )

  axiosInstance.interceptors.response.use(
    res=>res,
    async error=>{
      const originalRequest=error.config
      if(error.reseponse.status==400 && !originalRequest._retry) {
        originalRequest.__retry=true
        try{
          await axios.post("http://localhost:2000/api/seller/refresh-token", {},{
            withCredentials:true
          })
          .then((res)=>{
            localStorage.setItem("token",res.data.accessToken)
            originalRequest.headers.Authorization=`Bearer ${res.data.accessToken}`
            return instance(originalRequest)
          })
        }
        catch(err){
          localStorage.removeItem("token")
          window.location.href="/login"

        }
      }
       return Promise(error)
    }
  )

export default axiosInstance;
