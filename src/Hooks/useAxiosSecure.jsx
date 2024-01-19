import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptorRequest = axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      config.headers.authorization = `Bearer ${token}`;
      return config;
    }, (err) => {
      return Promise.reject(err);
    })

    const interceptorResponse = axiosSecure.interceptors.response.use((response) => {
      return response;
    }, async (err) => {
      const status = err.response.status;
      if (status === 401 || status === 403) {
        await logout();
        navigate('/login')
      }
      return Promise.reject(err)
    })
    return () => {
      axiosSecure.interceptors.request.eject(interceptorRequest);
      axiosSecure.interceptors.response.eject(interceptorResponse);
    };
  }, [logout,navigate])


  return axiosSecure;
};

export default useAxiosSecure;