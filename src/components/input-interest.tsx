"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setInterests } from "@/store/userSlice";

export default function InputInterest() {
  const userState = useAppSelector((state: any) => state.user);
  const dispatch = useAppDispatch();

  const [typeInterest, setTypeInterest] = useState<string>("");

  const inputRef = useRef<any>(null);

  const handleKeyUp = (evt: any) => {
    if ([13, 39].includes(evt.keyCode) && typeInterest !== "") {
      dispatch(setInterests([...userState.interests, typeInterest]));
      setTypeInterest("");
    }
  }

  const handleOnChange = (evt: any) => {
    setTypeInterest(evt.target.value);
  }

  const handleFocusInput = () => {
    inputRef.current?.focus();
  }

  const handleEraseInterest = (param: number) => {
    userState.interests.splice(param, 1);
    setInterests([...userState.interests]);
  }

  useEffect(() => {
    if (userState.user) dispatch(setInterests(userState.user.interests));
  }, [userState.user]);

  return (
    <>
      <div className="px-[35px] mt-[73px]">
        <p className="text-gradient-golden font-bold text-sm">Tell everyone about yourself</p>
        <h3 className="text-white font-bold text-[20px] mt-[8px]">What interest you?</h3>
        <div className="min-h-[46px] mt-[20px] rounded-[10px] py-[8px] px-[16px] bg-[#D9D9D90F] flex items-center flex-wrap gap-[4px]" onClick={handleFocusInput}>
          {userState.interests.length > 0 && userState.interests.map((ab: string, cd: number) => {
            return (
              <div key={cd} className="text-white text-xs flex items-center gap-[6px] px-[8px] h-[31px] rounded-[4px] bg-[#FFFFFF1A]">
                <span>{ab}</span>
                <button
                  type="button"
                  onClick={() => handleEraseInterest(cd)}
                >
                  <Image src={"/icons/x-white.png"} width={14} height={14} alt="x" />
                </button>
              </div>
            )
          })}
          <input
            ref={inputRef}
            type="text"
            onKeyUp={handleKeyUp}
            className="outline-none bg-transparent text-white text-sm"
            value={typeInterest}
            onChange={handleOnChange}
          />
        </div>
      </div>
    </>
  )
}