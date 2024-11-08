import toast from "react-hot-toast";
import {
  setLoading,
  setToken,
  setSignupData,
} from "../../store/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apis";
import { navigate } from "../../hooks/setNavigate";

const {
  REGISTER_API,
  LOGIN_API,
  ACCOUNT_VERIFICATION_API,
  LOGOUT_API,
  FORGOT_PASSWORD_API,
  RESET_PASSWORD_API,
} = authEndpoints;

export const register = (
  { firstName, lastName, email, phoneNumber, password, role, consent },
  navigate
) => {
  return async (dispatch) => {
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

      console.log("signup response ===>", response);

      toast.success(response.message);

      // * adding the register response to signupData
      dispatch(setSignupData(response.data));

      navigate(`/account-confirmation`);
    } catch (error) {
      toast.error(error.response.message);
      navigate("/signup");
    }
    dispatch(setLoading(false));
  };
};

export const login = ({ email, password }) => {
  return async (dispatch) => {
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

      // * storing the token in the localStorage
      localStorage.setItem("token", JSON.stringify(response.data.accessToken));
      navigate("/dashboard/my-profile");
    } catch (error) {
      toast.error(error.response.message);
      navigate("/login");
    }
    dispatch(setLoading(false));
  };
};

export const accountVerification = (token, code) => {
  return async (dispatch) => {
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
      toast.error(error.response.message);
      navigate("/login");
    }
    dispatch(setLoading(false));
  };
};

export const requestAccountVerification = (email) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", ACCOUNT_VERIFICATION_API, {
        email,
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message);
      navigate(`/account-confirmation/${response.data.token}`);
    } catch (error) {
      toast.error(error.response.message);
      navigate("/dashboard/my-profile");
    }
    dispatch(setLoading(false));
  };
};

export const logout = (token) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGOUT_API, null, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message);
      dispatch(setToken(null));
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log("error ->", error);
      toast.error(error.response.message);
    }
  };
};

export const forgotPassword = (email, setEmailSent) => {
  return async (dispatch) => {
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
      toast.error(error.response.message);
    }
    dispatch(setLoading(false));
  };
};

export const resetPassword = ({ password, confirmPassword }, token) => {
  return async (dispatch) => {
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
      toast.error(error.response.message);
    }
    dispatch(setLoading(false));
  };
};
