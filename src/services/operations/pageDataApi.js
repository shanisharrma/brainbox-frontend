import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogDataEndpoints } from "../apis";

const { CATALOG_PAGE_DATA_API } = catalogDataEndpoints;

export const getCatalogPageData = async (category) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      `${CATALOG_PAGE_DATA_API}/${category}`
    );

    if (!response.success) {
      throw new Error(response.message);
    }

    result = response;
  } catch (error) {
    toast.error(error.response.data.message);
    result = error.response.data.data;
  }
  toast.dismiss(toastId);
  return result;
};
