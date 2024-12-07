const BASE_URL = import.meta.env.VITE_API_URL;

export const authEndpoints = {
  LOGIN_API: BASE_URL + "/login",
  REGISTER_API: BASE_URL + "/register",
  ACCOUNT_VERIFICATION_API: BASE_URL + "/account-confirmation", // PUT -> /account-confirmation and PUT -> /account-confirmation/:token
  REFRESH_TOKEN_API: BASE_URL + "/refresh-token",
  LOGOUT_API: BASE_URL + "/logout",
  FORGOT_PASSWORD_API: BASE_URL + "/forgot-password",
  RESET_PASSWORD_API: BASE_URL + "/reset-password", //reset-password/:token
};

export const profileEndpoints = {
  PROFILE_API: BASE_URL + "/profile", // GET
  INSTRUCTOR_DASHBOARD_API: BASE_URL + "/dashboard/instructor", //GET
};

export const settingsEndpoints = {
  UPDATE_PROFILE_API: BASE_URL + "/profile/", // PUT
  CHANGE_PASSWORD_API: BASE_URL + "/change-password", // PUT
};

export const categoriesEndpoints = {
  CATEGORIES_API: BASE_URL + "/categories",
};

export const contactUsEndpoints = {
  CONTACT_US_API: BASE_URL + "/contact-us",
};

export const courseEndpoints = {
  COURSES_API: BASE_URL + "/courses", //GET all courses and for all the sections API
  ENROLLED_COURSES_API: BASE_URL + "/courses/enrolled", // GET
  TAUGHT_COURSES_API: BASE_URL + "/courses/taught", //GET
  SECTION_API: BASE_URL + "/sections", // For all the subsections API
  RATINGS_AND_REVIEWS_API: BASE_URL + "/ratings", // For all the subsections API
};

export const tagEndpoints = {
  TAG_API: BASE_URL + "/tags", // GET all tags
  TAG_SUGGESTIONS_API: BASE_URL + "/tags/suggestions", //GET the suggested tags
};

export const catalogDataEndpoints = {
  CATALOG_PAGE_DATA_API: BASE_URL + "/categories", //GET all the courses related to category
};

export const paymentEndpoints = {
  CAPTURE_PAYMENT_API: BASE_URL + "/payments/capture", //POST
  VERIFY_PAYMENT_API: BASE_URL + "/payments/verify", //POST
};
