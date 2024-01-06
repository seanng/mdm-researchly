import Cookies from "universal-cookie";
import { AUTH_TOKEN_KEY } from "shared/constants";

export const cookies = new Cookies();

// export const getAuthTokenFromCookie = () => cookies.get(AUTH_TOKEN_KEY);

export const setAuthCookie = (token) =>
  cookies.set(AUTH_TOKEN_KEY, token, {
    path: "/",
  });

// export const removeAuthTokenFromCookie = () => cookies.remove(AUTH_TOKEN_KEY);
