"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import CardInfoIndex from "./card-info.index";
import CardPhotoIndex from "./card-photo-index";
import FormAbout from "./form-about";
import { useRouter } from "next/navigation";
import { setFormAboutState } from "@/store/formSlice";
import moment from "moment";

export default function Profile() {
  const rts = useRouter();

  const userState = useAppSelector((state: any) => state.user);
  const formState = useAppSelector((state: any) => state.form);
  const dispatch = useAppDispatch();

  const changeUpdateAbout = () => {
    dispatch(setFormAboutState(true));
  }

  const changeUpdateInterest = () => {
    rts.push("/interest");
  }

  const handleChangePhoto = () => {}

  return (
    <div className="px-[18px]">
      <CardPhotoIndex />
      <div className="flex flex-col gap-[16px] mt-[24px]">
        <CardInfoIndex title="About" action={changeUpdateAbout} identity="about">
          {!formState.formAbout ? (
            <>
              {userState.user && userState.user.name != "" ? (
                <div className="flex flex-col text-xs gap-[8px]">
                  <div className="flex items-center">
                    <div className="text-[#FFFFFF54]">Birthday:</div>
                    <div className="pl-1 text-white">
                      {moment(userState.user.birthday).format("DD MMM YYYY")}
                      <span className="ml-1">(Age {moment().diff(moment(userState.user.birthday, "YYYY-MM-DD"), "years")})</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-[#FFFFFF54]">Horoscope:</div>
                    <div className="pl-1 text-white">{userState.user.horoscope}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-[#FFFFFF54]">Zodiac:</div>
                    <div className="pl-1 text-white">{userState.user.zodiac}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-[#FFFFFF54]">Height:</div>
                    <div className="pl-1 text-white">{userState.user.height}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-[#FFFFFF54]">Weight:</div>
                    <div className="pl-1 text-white">{userState.user.weight}</div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-white opacity-50">
                  Add in your your to help others know you better
                </div>
              )}
            </>
          ) : (
            <FormAbout />
          )}
        </CardInfoIndex>
        <CardInfoIndex title="Interest" action={changeUpdateInterest} identity="interest">
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