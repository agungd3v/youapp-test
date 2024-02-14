"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import Image from "next/image";
import moment from "moment";
import { useRef } from "react";
import { setUserState } from "@/store/userSlice";

export default function FormAbout() {
  const userState = useAppSelector((state: any) => state.user);
  const dispatch = useAppDispatch();

  const dateRef = useRef<any>(null);

  const handleChangePhoto = () => {}

  const openDate = () => {
    dateRef.current.showPicker();
  }

  const handleDateChange = (evt: any) => {
    dispatch(setUserState({...userState.user, birthday: evt.target.value}));
  }

  const handleNameChange = (evt: any) => {
    dispatch(setUserState({...userState.user, name: evt.target.value}));
  }

  const handleGenderChange = (evt: any) => {
    dispatch(setUserState({...userState.user, gender: evt.target.value}));
  }

  const handleHeightChange = (evt: any) => {
    dispatch(setUserState({...userState.user, height: parseInt(evt.target.value)}));
  }

  const handleWeightChange = (evt: any) => {
    dispatch(setUserState({...userState.user, weight: parseInt(evt.target.value)}));
  }

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
              value={userState.user.name}
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="flex items-center items-center">
          <div className="text-xs text-[#FFFFFF54] whitespace-nowrap w-[100px]">
            Gender:
          </div>
          <div className="selectdiv flex-1">
            <select className="w-full custom-select bg-[#D9D9D90F] border border-[#FFFFFF38] text-[#FFFFFF4D]" value={userState.user.gender} onChange={handleGenderChange}>
              <option value={""}>Select Gender</option>
              <option value={"M"}>Male</option>
              <option value={"F"}>Female</option>
            </select>
          </div>
        </div>
        <div className="flex items-center items-center relative">
          <div className="text-xs text-[#FFFFFF54] whitespace-nowrap w-[100px]">
            Birthday:
          </div>
          <div className="flex-1">
            <label htmlFor="date" onClick={openDate}>
              <div className={`flex items-center justify-end w-full text-xs bg-[#D9D9D90F] border border-[#FFFFFF38] rounded-[8px] px-[20px] h-[36px] outline-none ${userState.user.birthday == "" ? "text-[#FFFFFF4D]" : "text-white"}`}>
                {userState.user.birthday == "" ? "DD MM YYYY" : moment(userState.user.birthday).format("DD MMM YYYY")}
              </div>
              <input type="date" hidden ref={dateRef} onChange={handleDateChange} id="date" />
            </label>
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
              className={`w-full text-right text-xs bg-[#D9D9D90F] border border-[#FFFFFF38] rounded-[8px] px-[20px] h-[36px] outline-none ${userState.user.horoscope == "Error" ? "text-[#FFFFFF4D]" : "text-white"}`}
              placeholder={`${userState.user.horoscope == "Error" ? "--" : userState.user.horoscope}`}
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
              className="w-full text-white text-right text-xs bg-[#D9D9D90F] border border-[#FFFFFF38] rounded-[8px] px-[20px] h-[36px] outline-none placeholder:text-[#FFFFFF4D]"
              placeholder="Add height"
              value={userState.user.height == 0 ? "" : userState.user.height}
              onChange={handleHeightChange}
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
              className="w-full text-white text-right text-xs bg-[#D9D9D90F] border border-[#FFFFFF38] rounded-[8px] px-[20px] h-[36px] outline-none placeholder:text-[#FFFFFF4D]"
              placeholder="Add weight"
              value={userState.user.weight == 0 ? "" : userState.user.weight}
              onChange={handleWeightChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}