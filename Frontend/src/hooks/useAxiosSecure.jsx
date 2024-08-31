import { useContext, useEffect } from "react"
import { AuthContext } from "../ultilites/providers/AuthProvider"
import {useNavigate} from "react-router-dom"
import axios from "axios"

const useAxiosSecure = () => {
  const {logout} = useContext(AuthContext)
  const navigate = useNavigate()

  const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    
    
  });
  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('token')
      if(token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
     })
      axiosSecure.interceptors.response.use((response) =>  response, async(error) =>{
      if(error.response && (error.response.status === 401 || error.response.status === 403)) {
        await logout()
        navigate('/login')
        
      }
      throw error
     })
     return axiosSecure
  })
  
  return axiosSecure
}

export default useAxiosSecure