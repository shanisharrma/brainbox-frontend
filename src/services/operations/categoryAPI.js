import toast from "react-hot-toast";
import { categoriesEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const { CATEGORIES_API } = categoriesEndpoints;

export const getAllCategories = async () => {
  let result = null;
  try {
    const response = await apiConnector("GET", CATEGORIES_API);
    if (!response.success) {
      throw new Error(response.message);
    }

    result = response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
  return result;
};

export const getCoursesByCategory = async (category) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("GET", `${CATEGORIES_API}/${category}`);
    if (!response.success) {
      throw new Error(response.message);
    }

    result = response.data;
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createCategory = async (token, data) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", CATEGORIES_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.success) {
      throw new Error(response.message);
    }

    result = response.data;
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};
