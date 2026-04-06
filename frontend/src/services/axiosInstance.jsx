import axios from 'axios'
import { apiBaseUrl } from './appConfig'

const instance = axios.create({
    baseURL: apiBaseUrl,
    withCredentials:true
})
instance.interceptors.request.use((config)=>{
    const token= localStorage.getItem("token")
    console.log(token)
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
})

instance.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config
        const status = error.response?.status

        if (status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true
            try {
                const refreshResponse = await axios.post(`${apiBaseUrl}/refresh-token`, {}, {
                    withCredentials: true
                })

                localStorage.setItem("token", refreshResponse.data.accessToken)
                originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`
                return instance(originalRequest)
            }
            catch (err) {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                if (window.location.pathname !== "/login") {
                    window.location.href = "/login"
                }
            }
        }

        return Promise.reject(error)
    }
)

export default instance
