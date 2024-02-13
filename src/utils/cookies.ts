import Cookies from "js-cookie";

export const setTokenCookie = async (param: string) => {
  Cookies.set("yp_tkn", param, {path: "/", expires: 1, secure: true});
}