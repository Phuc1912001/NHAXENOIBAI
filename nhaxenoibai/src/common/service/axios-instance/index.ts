import { cookie } from "@/common/helpers/cookie/cookie";
import { Modal } from "antd";
import axios from "axios";

const apiUrl = "https://localhost:7053/api";
const user: A = cookie.getCookie("userLogin") ?? "{}";
const token = JSON.parse(user)?.token ?? "";
const source = axios.CancelToken.source();

const instance = axios.create({
  timeout: 600000,
  baseURL: apiUrl,
  headers: {
    // 'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  },
  // withCredentials: true,
  cancelToken: source.token,
});

// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      Modal.error({
        title: "Unauthorized",
        content: "Your session has expired. Please log in again.",
        onOk: () => {
          cookie.clearCookie("userLogin");
          location.href = "/login";
        },
      });
    } else if (
      error.response?.status !== 200 &&
      error.response?.status !== 422 &&
      error.response?.status !== 400
    ) {
      Modal.error({
        title: error.response?.status,
        content: "Something wrong!",
      });
    }
    return Promise.reject(error);
  }
);

export default instance;
