import toast from "react-hot-toast";
import {
  setLoading,
  setToken,
  setRoles,
  clearAuth,
} from "../../store/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apis";
import { navigate } from "../../hooks/setNavigate";
import { setUser } from "../../store/slices/profileSlice";
import { decodeToken } from "../../utils/authUtils";
import { persistor } from "../../store/store";

const {
  REGISTER_API,
  LOGIN_API,
  ACCOUNT_VERIFICATION_API,
  LOGOUT_API,
  FORGOT_PASSWORD_API,
  RESET_PASSWORD_API,
} = authEndpoints;

export const register = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  role,
  consent,
}) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", REGISTER_API, {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        role,
        consent,
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message);

      navigate(
        `/account-confirmation/${response.data.accountConfirmation.token}`
      );
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("/signup");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

export const login = ({ email, password }) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message);

      // // * setting the token value
      dispatch(setToken(response.data.accessToken));

      // * get and set roles from the token
      const { roles } = decodeToken(response.data.accessToken);
      dispatch(setRoles(roles));

      navigate("/dashboard/my-profile");
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("/login");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

export const accountVerification = (token, code) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "PUT",
        `${ACCOUNT_VERIFICATION_API}/${token}`,
        { code }
      );

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("/login");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

export const requestAccountVerification = (email, token) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "PUT",
        ACCOUNT_VERIFICATION_API,
        {
          email,
        },
        { Authorization: `Bearer ${token}` }
      );

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message);
      navigate(`/account-confirmation`);
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("/dashboard/my-profile");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

export const logout = (token) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGOUT_API, null, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message);

      dispatch(clearAuth());
      dispatch(setUser(null));

      persistor.purge();

      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

export const forgotPassword = (email, setEmailSent) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", FORGOT_PASSWORD_API, {
        email,
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message);
      setEmailSent(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

export const resetPassword = ({ password, confirmPassword }, token) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "PUT",
        `${RESET_PASSWORD_API}/${token}`,
        { password, confirmPassword }
      );

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};
