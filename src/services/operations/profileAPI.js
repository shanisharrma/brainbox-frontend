import toast from "react-hot-toast";
import { setLoading, setUser } from "../../store/slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";
import { navigate } from "../../hooks/setNavigate";

const { PROFILE_API, ENROLLED_COURSES_API } = profileEndpoints;

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

export const getUserEnrolledCourses = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", ENROLLED_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.success) {
      throw new Error(response.message);
    }

    toast.success(response.message);
    result = response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};
