"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../lib/store";
import { setAuthState, setUserState } from "../store/userSlice";

export default function Header() {
  const rts = useRouter();
  const pathname = usePathname();

  const userState = useAppSelector((state: any) => state.user);
  const dispatch = useAppDispatch();

  const handleBack = () => {
    return rts.back();
  }

  const handleDotOptions = () => {}

  const handleInterestUpdate = async () => {
    const request = await fetch("/api/profile", {
      method: "PUT",
      body: JSON.stringify(userState.user)
    });

    if ([200, 201].includes(request.status)) {
      const payload = {...userState.user};
      Cookies.set("yp_pfe", JSON.stringify(payload));
      dispatch(setUserState(payload));
      rts.replace("/");
    }
  }

  return (
    <div className="flex items-center justify-between px-[18px]">
      <button
        type="button"
        className="text-white flex items-center font-bold text-sm gap-[10px]"
        onClick={handleBack}
      >
        <Image src={"/icons/arrow-back.png"} width={9} height={16} alt="back icon" />
        Back
      </button>
      {pathname == "/" && (
        <>
          {userState.user && <span className="text-sm font-semibold text-white">@{userState.user.username}</span>}
          <button
            type="button"
            className=""
            onClick={handleDotOptions}
          >
            <Image src={"/icons/three-dot.png"} width={22} height={7} alt="header options" />
          </button>
        </>
      )}
      {pathname == "/interest" && (
        <>
          <button
            type="button"
            className=""
            onClick={handleInterestUpdate}
          >
            <span className="text-gradient-darkblue text-sm font-semibold">Save</span>
          </button>
        </>
      )}
    </div>
  )
}