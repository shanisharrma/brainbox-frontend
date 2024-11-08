import axios from "axios";
import { authEndpoints } from "./apis";
import toast from "react-hot-toast";
import { navigate } from "../hooks/setNavigate";
import { store } from "../store/store";
import { setLoading, setToken } from "../store/slices/authSlice";
const { REFRESH_TOKEN_API } = authEndpoints;

const options = {
  baseURL: import.meta.env.VITE_API_URL,
};

export const apiClient = axios.create(options);

export const tokenRefreshClient = axios.create(options);
tokenRefreshClient.interceptors.response.use((response) => response.data);

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response;

    if (status === 401 && data.message === "Authorization token expired.") {
      store.dispatch(setLoading(true));
      try {
        const refreshResponse = await tokenRefreshClient.post(
          REFRESH_TOKEN_API,
          null,
          config
        );

        if (!refreshResponse) {
          throw new Error(refreshResponse.message);
        }

        // * update the state of token
        store.dispatch(setToken(refreshResponse.data.accessToken));

        // * updating the value of token in localStorage
        localStorage.setItem(
          "token",
          JSON.stringify(refreshResponse.data.accessToken)
        );
      } catch (error) {
        toast.error(error.refreshResponse.message);
        navigate("/login", {
          state: {
            redirectUrl: window.location.pathname,
          },
        });
        return Promise.reject(error);
      }
    }
    store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

export const apiConnector = (method, url, bodyData, headers, params) => {
  return apiClient({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
