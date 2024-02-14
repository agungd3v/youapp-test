"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setFormAboutState } from "@/store/formSlice";
import { setUserState } from "@/store/userSlice";
import { toastInfo } from "@/utils/toast";
import { setUserCookie } from "@/utils/cookies";

interface CProps {
  title: string;
  action(): void;
  children: React.ReactNode;
  identity: string;
}

export default function CardInfoIndex({title, action, children, identity}: CProps) {
  const userState = useAppSelector((state: any) => state.user);
  const formState = useAppSelector((state: any) => state.form);
  const dispatch = useAppDispatch();

  const handleUpdate = async () => {
    const request = await fetch("/api/profile", {
      method: "PUT",
      body: JSON.stringify({...userState.user, interests: userState.user.interests})
    });

    if ([200, 201].includes(request.status)) {
      const payload = {...userState.user, interests: userState.user.interests};
      setUserCookie(JSON.stringify(payload));
      dispatch(setUserState(payload));
    } else {
      const response = await request.json();
      toastInfo(response.message);
    }

    dispatch(setFormAboutState(false));
  }

  return (
    <div className="rounded-[14px] bg-[#0E191F] px-[25px] py-[13px]">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-white">{title}</span>
        {identity == "about" && formState.formAbout ? (
          <button
            type="button"
            className="text-xs font-semibold text-gradient-golden"
            onClick={handleUpdate}
          >
            Save & Update
          </button>
        ) : (
          <button
            type="button"
            className=""
            onClick={action}
          >
            <Image src={"/icons/pen-edit.png"} width={16} height={16} alt="action info" />
          </button>
        )}
      </div>
      <div className="mt-4">
        {children}
      </div>
    </div>
  )
}