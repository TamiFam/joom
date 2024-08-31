import { useEffect } from "react";
import axios from "axios";

const useAxiosFetch = () => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
  });

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        // Можете сделать что-нибудь с перед отправкой запроса
        return config;
      },
      (error) => {
        // Сделайте что-нибудь с ошибкой запроса
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        // Любой код состояния, находящийся в диапазоне 2xx, вызывает срабатывание этой функции
        // Можете сделать что-нибудь с ответом
        return response;
      },
      (error) => {
        // Любые коды состояния, выходящие за пределы диапазона 2xx, вызывают срабатывание этой функции
        // Можете сделать что-нибудь с ошибкой ответа
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []); // Пустая зависимость, чтобы эффект выполнялся только при монтировании компонента

  return axiosInstance;
};

export default useAxiosFetch;