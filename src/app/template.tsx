"use client";

import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../lib/store";
import { setAuthState, setUserState } from "../store/userSlice";
import { useEffect } from "react";

export default function Template({children}: {children: React.ReactNode}) {
  const dispatch = useAppDispatch();

  const getProfile = async () => {
    const token = Cookies.get("yp_tkn");
    if (token) {
      const profile = Cookies.get("yp_pfe");
      if (!profile) {
        const request = await fetch("/api/profile");
        if ([200, 201].includes(request.status)) {
          const response = await request.json();
          console.log(response.data);
          Cookies.set("yp_pfe", JSON.stringify(response.data));

          const userCook = JSON.parse(Cookies.get("yp_pfe") ?? "undefined");
          if (userCook && typeof userCook.name === "undefined") {
            const body = {...userCook, name: "", birthday: "", height: 0, weight: 0, interests: []};

            const requestNext = await fetch("/api/profile", {
              method: "POST",
              body: JSON.stringify(body)
            });
            if ([200, 201].includes(requestNext.status)) {
              Cookies.set("yp_pfe", JSON.stringify(body));

              dispatch(setAuthState(true));
              dispatch(setUserState(body));
              return;
            }
          }

          dispatch(setAuthState(true));
          dispatch(setUserState(response.data));
          return;
        }
      }

      dispatch(setAuthState(true));
      dispatch(setUserState(JSON.parse(profile ?? "{}")));
      return;
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return <>{children}</>;
}