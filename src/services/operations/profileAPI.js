import toast from "react-hot-toast";
import { setLoading, setUser } from "../../store/slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";
import { navigate } from "../../hooks/setNavigate";

const { PROFILE_API, INSTRUCTOR_DASHBOARD_API } = profileEndpoints;

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
      toast.error(error.response.message);
      navigate("/login");
    }
    dispatch(setLoading(false));
  };
};

export const getInstructorDashboard = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("GET", INSTRUCTOR_DASHBOARD_API, null, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.success) {
      throw new Error(response.message);
    }

    result = response.data;
  } catch (error) {
    toast.error(error.response.message);
  }
  toast.dismiss(toastId);
  return result;
};
