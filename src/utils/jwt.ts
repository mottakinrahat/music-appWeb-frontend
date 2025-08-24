import { jwtDecode } from "jwt-decode";

export const decodedToken = (token: string) => {
  if (!token) return null;
  return jwtDecode(token);
};
