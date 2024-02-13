"use client";

import { useAppSelector } from "@/lib/store";
import CardInfoIndex from "./card-info.index";
import CardPhotoIndex from "./card-photo-index";
import FormAbout from "./form-about";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  const rts = useRouter();
  const [updateAbout, setUpdateAbout] = useState<boolean>(false);

  const userState = useAppSelector((state: any) => state.user);

  const changeUpdateAbout = () => {
    return setUpdateAbout(true);
  }

  const changeUpdateInterest = () => {
    rts.push("/interest");
  }

  const handleChangePhoto = () => {}

  return (
    <div className="px-[18px]">
      <CardPhotoIndex />
      <div className="flex flex-col gap-[16px] mt-[24px]">
        <CardInfoIndex title="About" action={changeUpdateAbout}>
          {!updateAbout ? (
            <div className="text-xs text-white opacity-50">
              Add in your your to help others know you better
            </div>
          ) : (
            <FormAbout />
          )}
        </CardInfoIndex>
        <CardInfoIndex title="Interest" action={changeUpdateInterest}>
          {userState.user && userState.user.interests.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {userState.user.interests.map((ab: any, cd: number) => {
                return (
                  <div key={cd} className="text-white text-xs flex items-center gap-[6px] px-[8px] h-[31px] rounded-[4px] bg-[#FFFFFF1A]">{ab}</div>
                )
              })}
            </div>
          ) : (
            <div className="text-xs text-white opacity-50">
              Add in your interest to find a better match
            </div>
          )}
        </CardInfoIndex>
      </div>
    </div>
  )
}