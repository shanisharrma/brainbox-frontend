import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import { setUser } from "../../store/slices/profileSlice";

const { UPDATE_PROFILE_API, CHANGE_PASSWORD_API } = settingsEndpoints;

export const updateProfilePicture = (token, data) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success("Profile picture updated");

      dispatch(setUser(response.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  };
};

export const updateProfile = (token, data) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, data, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message);
      dispatch(setUser(response.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  };
};

export const changePassword = (token, data) => {
  return async () => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", CHANGE_PASSWORD_API, data, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  };
};
