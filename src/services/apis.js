const BASE_URL = import.meta.env.VITE_API_URL;

console.log("API Url", BASE_URL);

export const categories = {
  CATEGORIES_API: BASE_URL + "/categories",
};
