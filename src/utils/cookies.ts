import Cookies from "js-cookie";

export const setTokenCookie = async (param: string) => {
  Cookies.set("yp_tkn", param, {path: "/", expires: 1 / 24, secure: true});
}

export const setUserCookie = async (param: string) => {
  Cookies.set("yp_pfe", param);
}