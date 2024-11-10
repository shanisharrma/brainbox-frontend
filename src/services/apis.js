const BASE_URL = import.meta.env.VITE_API_URL;

export const authEndpoints = {
  LOGIN_API: BASE_URL + "/login",
  REGISTER_API: BASE_URL + "/register",
  ACCOUNT_VERIFICATION_API: BASE_URL + "/account-confirmation", // PUT -> /account-confirmation and POST -> /account-confirmation/:token
  REFRESH_TOKEN_API: BASE_URL + "/refresh-token",
  LOGOUT_API: BASE_URL + "/logout",
  FORGOT_PASSWORD_API: BASE_URL + "/forgot-password",
  RESET_PASSWORD_API: BASE_URL + "/reset-password", //reset-password/:token
};

export const profileEndpoints = {
  PROFILE_API: BASE_URL + "/profile", // GET
};

export const categories = {
  CATEGORIES_API: BASE_URL + "/categories",
};

export const contactUsEndpoints = {
  CONTACT_US_API: BASE_URL + "/contact-us",
};
