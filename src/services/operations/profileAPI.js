import toast from "react-hot-toast";
import { setLoading, setUser } from "../../store/slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";
import { navigate } from "../../hooks/setNavigate";

const { PROFILE_API } = profileEndpoints;

export const getUserDetails = (token) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.success) {
        throw new Error(response.message);
      }
      dispatch(setUser(response.data));
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("/login");
    }
    dispatch(setLoading(false));
  };
};
