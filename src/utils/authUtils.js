import { jwtDecode } from "jwt-decode";

// export const getAccessToken = () => {
//   const token = localStorage.getItem("token")
//     ? JSON.parse(localStorage.getItem("token"))
//     : null;
//   return token;
// };

// Function to decode token expiry
export const decodeTokenExpiry = (token) => {
  const decoded = jwtDecode(token);
  console.log("expiring time", decoded.exp);
  return decoded.exp * 1000;
};

// Function to check if token is expiring soon
export const isTokenExpiringSoon = (token) => {
  //   const expiryTime = decodeTokenExpiry(token);
  //   const currentTime = Math.floor(Date.now() / 1000);
  //   console.log("currentTime", Date.now());
  //   return expiryTime - currentTime < 60 * 60; // Check if less than 1 hour left

  if (token) {
    const currentTime = Date.now();
    const expiryTime = decodeTokenExpiry(token);
    const timeDifference = expiryTime - currentTime;
    const thirtyMinutesInMs = 60 * 60 * 1000;
    return timeDifference < thirtyMinutesInMs;
  }
};
