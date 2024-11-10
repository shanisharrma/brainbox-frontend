import { jwtDecode } from "jwt-decode";

// Function to decode token expiry
export const decodeToken = (token) => {
  const decoded = jwtDecode(token);
  return decoded;
};

// Function to check if token is expiring soon
export const isTokenExpiringSoon = (token) => {
  if (token) {
    const currentTime = Date.now();
    const { exp } = decodeToken(token);
    const expiryTime = exp * 1000;
    const timeDifference = expiryTime - currentTime;
    const tenMinutesInMs = 10 * 60 * 1000;
    return timeDifference < tenMinutesInMs;
  }
};

export function hasRequiredRoles(requiredRoles, roles) {
  return requiredRoles.some((role) => roles.includes(role));
}
