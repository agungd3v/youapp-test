"use client";

import Image from "next/image";
import { useAppSelector } from "../lib/store";
import { useRef } from "react";

export default function CardPhotoIndex() {
  const userState = useAppSelector((state: any) => state.user);

  const photoRef = useRef<any>(null);

  const handleEditPhoto = () => {
    // 
  }

  return (
    <div
      className="h-[190px] rounded-[14px] bg-[#162329] mt-[24px] relative"
      style={{
        backgroundImage: `url(${userState.user && userState.user.photo ? userState.user.photo : ""})`,
        backgroundPosition: "center center"
      }}
    >
      <div className="absolute top-[8px] right-[14px]">
        <button
          type="button"
          className=""
          onClick={handleEditPhoto}
        >
          <Image src={"/icons/pen-edit.png"} width={18} height={18} alt="pen icon edit" />
        </button>
        <input type="file" hidden ref={photoRef} />
      </div>
      {userState.user && (
        <div className="absolute bottom-[14px] left-[14px]">
          {userState.user.gender && (
            <span className="text-xs text-white">
              {userState.user.gender == "M" ? "Male" : "Female"}
            </span>
          )}
          <div className="flex items-center mb-[6px]">
            <span className="font-bold text-white">@{userState.user.username},</span>
          </div>
          <div className="flex items-center gap-[5px]">
            {userState.user.horoscope && (
              <div className="flex items-center text-xs gap-1 font-semibold text-white bg-[#1F231F] h-[32px] px-4 rounded-full">
                <Image src={"/icons/horoscope-white.png"} width={18} height={18} alt="horoscope" />
                {userState.user.horoscope}
              </div>
            )}
            {userState.user.zodiac && (
              <div className="flex items-center text-xs gap-1 font-semibold text-white bg-[#1F231F] h-[32px] px-4 rounded-full">
                <Image src={"/icons/zodiac-white.png"} width={18} height={18} alt="horoscope" />
                {userState.user.zodiac}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}