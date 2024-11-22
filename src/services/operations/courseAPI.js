import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";

const {
  TAUGHT_COURSES_API,
  ENROLLED_COURSES_API,
  COURSES_API,
  SECTION_API,
  RATINGS_AND_REVIEWS_API,
} = courseEndpoints;

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

export const deleteCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "DELETE",
      `${COURSES_API}/${courseId}`,
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

export const getSingleCourse = async (courseId) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("GET", `${COURSES_API}/${courseId}`);
    if (!response.success) {
      throw new Error(response.message);
    }

    result = response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", COURSES_API);
    if (!response.success) {
      throw new Error(response.message);
    }

    result = response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const addCourseDetails = async (token, data) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", COURSES_API, data, {
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

export const updateCourseDetails = async (token, courseId, data) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      `${COURSES_API}/${courseId}`,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

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

export const createSection = async (token, courseId, data) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      `${COURSES_API}/${courseId}/sections`,
      data,
      { Authorization: `Bearer ${token}` }
    );

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

export const updateSection = async (token, courseId, sectionId, data) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      `${COURSES_API}/${courseId}/sections/${sectionId}`,
      data,
      { Authorization: `Bearer ${token}` }
    );

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

export const deleteSection = async (token, courseId, sectionId) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "DELETE",
      `${COURSES_API}/${courseId}/sections/${sectionId}`,
      null,
      { Authorization: `Bearer ${token}` }
    );

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

export const createSubSection = async (token, sectionId, data) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      `${SECTION_API}/${sectionId}/subsections`,
      data,
      { Authorization: `Bearer ${token}` }
    );

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

export const updateSubSection = async (
  token,
  sectionId,
  subSectionId,
  data
) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      `${COURSES_API}/${sectionId}/subsections/${subSectionId}`,
      data,
      { Authorization: `Bearer ${token}` }
    );

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

export const deleteSubSection = async (token, sectionId, subSectionId) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "DELETE",
      `${COURSES_API}/${sectionId}/subsections/${subSectionId}`,
      null,
      { Authorization: `Bearer ${token}` }
    );

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

export const createRating = async (token, courseId, data) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      `${COURSES_API}/${courseId}/ratings`,
      data,
      { Authorization: `Bearer ${token}` }
    );

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

export const averageRating = async (courseId) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      `${COURSES_API}/${courseId}/ratings`
    );

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

export const allRatingsAndReviews = async () => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("GET", RATINGS_AND_REVIEWS_API);

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
