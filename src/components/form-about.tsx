"use client";

import Image from "next/image";

export default function FormAbout() {
  const handleChangePhoto = () => {}

  return (
    <>
      <div className="flex items-center gap-[12px] mt-6">
        <button
          type="button"
          className="w-[58px] h-[58px] rounded-[16px] bg-[#FFFFFF14] flex items-center justify-center"
          onClick={handleChangePhoto}
        >
          <Image src={"/icons/plus-gold.png"} width={20} height={20} alt="plus gold icon" />
        </button>
        <span className="text-xs text-white">Add image</span>
      </div>
      <div className="flex flex-col gap-[12px] mt-[20px]">
        <div className="flex items-center items-center">
          <div className="text-xs text-[#FFFFFF54] whitespace-nowrap w-[100px]">
            Display name:
          </div>
          <div className="flex-1">
            <input
              type="text"
              autoComplete="off"
              className="w-full text-white text-right text-xs bg-[#D9D9D90F] border border-[#FFFFFF38] rounded-[8px] px-[20px] h-[36px] outline-none w-full placeholder:text-[#FFFFFF4D]"
              placeholder="Enter name"
            />
          </div>
        </div>
        <div className="flex items-center items-center">
          <div className="text-xs text-[#FFFFFF54] whitespace-nowrap w-[100px]">
            Gender:
          </div>
          <div className="selectdiv flex-1">
            <select className="w-full custom-select bg-[#D9D9D90F] border border-[#FFFFFF38] text-[#FFFFFF4D]">
              <option value={""}>Select Gender</option>
              <option value={"M"}>Male</option>
              <option value={"F"}>Female</option>
            </select>
          </div>
        </div>
        <div className="flex items-center items-center">
          <div className="text-xs text-[#FFFFFF54] whitespace-nowrap w-[100px]">
            Birthday:
          </div>
          <div className="flex-1">
            <input
              type="text"
              autoComplete="off"
              className="w-full text-white text-right text-xs bg-[#D9D9D90F] border border-[#FFFFFF38] rounded-[8px] px-[20px] h-[36px] outline-none w-full placeholder:text-[#FFFFFF4D]"
              placeholder="DD MM YYYY"
            />
          </div>
        </div>
        <div className="flex items-center items-center">
          <div className="text-xs text-[#FFFFFF54] whitespace-nowrap w-[100px]">
            Horoscope:
          </div>
          <div className="flex-1">
            <input
              type="text"
              autoComplete="off"
              className="w-full text-white text-right text-xs bg-[#D9D9D90F] border border-[#FFFFFF38] rounded-[8px] px-[20px] h-[36px] outline-none w-full placeholder:text-[#FFFFFF4D]"
              placeholder="--"
            />
          </div>
        </div>
        <div className="flex items-center items-center">
          <div className="text-xs text-[#FFFFFF54] whitespace-nowrap w-[100px]">
            Height:
          </div>
          <div className="flex-1">
            <input
              type="text"
              autoComplete="off"
              className="w-full text-white text-right text-xs bg-[#D9D9D90F] border border-[#FFFFFF38] rounded-[8px] px-[20px] h-[36px] outline-none w-full placeholder:text-[#FFFFFF4D]"
              placeholder="Add height"
            />
          </div>
        </div>
        <div className="flex items-center items-center">
          <div className="text-xs text-[#FFFFFF54] whitespace-nowrap w-[100px]">
            Weight:
          </div>
          <div className="flex-1">
            <input
              type="text"
              autoComplete="off"
              className="w-full text-white text-right text-xs bg-[#D9D9D90F] border border-[#FFFFFF38] rounded-[8px] px-[20px] h-[36px] outline-none w-full placeholder:text-[#FFFFFF4D]"
              placeholder="Add weight"
            />
          </div>
        </div>
      </div>
    </>
  )
}