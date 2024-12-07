import toast from "react-hot-toast";
import { paymentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { navigate } from "../../hooks/setNavigate";
import { resetCart } from "../../store/slices/cartSlice";
import { setPaymentLoading } from "../../store/slices/courseSlice";

const { CAPTURE_PAYMENT_API, VERIFY_PAYMENT_API } = paymentEndpoints;

export const createOrderPayment = async (token, provider, courseIds) => {
  const toastId = toast.loading("Loading...");
  let result;
  try {
    // * Step-1: Create an order on the backend
    const orderResponse = await apiConnector(
      "POST",
      CAPTURE_PAYMENT_API,
      { provider, courseIds },
      { Authorization: `Bearer ${token}` }
    );

    if (!orderResponse.success) {
      throw new Error(orderResponse.message);
    }

    result = orderResponse.data;
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const verifyPayment = async (bodyData, token, dispatch) => {
  const toastId = toast.loading("Loading...");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector("POST", VERIFY_PAYMENT_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.success) {
      throw new Error(response.message);
    }
    toast.success(response.message);
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
};
