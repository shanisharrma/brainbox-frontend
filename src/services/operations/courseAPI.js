import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";

const { DELETE_COURSE_API, TAUGHT_COURSES_API } = courseEndpoints;

export const deleteCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "DELETE",
      `${DELETE_COURSE_API}/courseId`,
      null,
      { Authorization: `Bearer ${token}` }
    );

    if (!response.success) {
      throw new Error(response.message);
    }

    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
};

export const getInstructorCourses = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", TAUGHT_COURSES_API, null, {
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
