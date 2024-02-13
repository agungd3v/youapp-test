"use client";

import Image from "next/image";
import { useAppSelector } from "../lib/store";

export default function CardPhotoIndex() {
  const userState = useAppSelector((state: any) => state.user);

  const handleEditPhoto = () => {}

  return (
    <div className="h-[190px] rounded-[14px] bg-[#162329] mt-[24px] relative">
      <div className="absolute top-[8px] right-[14px]">
        <button
          type="button"
          className=""
          onClick={handleEditPhoto}
        >
          <Image src={"/icons/pen-edit.png"} width={18} height={18} alt="pen icon edit" />
        </button>
      </div>
      <div className="absolute bottom-[14px] left-[14px]">
        <div className="flex items-center">
          {userState.user && <span className="font-bold text-white">@{userState.user.username},</span>}
        </div>
      </div>
    </div>
  )
}