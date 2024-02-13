"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toastInfo, toastSuccess } from "@/utils/toast";
import Image from "next/image";
import Link from "next/link";

type showHidePassword = {
  password: boolean;
  confirm: boolean;
}

type registerInfo = {
  email: string;
  username: string;
  password: string;
}

export default function Register() {
  const rts = useRouter();

  const [showPassword, setShowPassword] = useState<showHidePassword>({
    password: false,
    confirm: false
  });
  const [registerInfo, setRegisterInfo] = useState<registerInfo>({
    email: "",
    username: "",
    password: ""
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChangeRegister = (value: string, prefix: string) => {
    setRegisterInfo((prevState: any) => ({
      ...prevState,
      [prefix]: value
    }));
  }

  const handleShowPassword = (value: boolean, prefix: string) => {
    setShowPassword((prevState: any) => ({
      ...prevState,
      [prefix]: value
    }));
  }

  const handleConfirmPassword = (evt: any) => {
    setConfirmPassword(evt.target.value);
  }

  const handleRegister = async () => {
    // const validEmail = validateTypeEmail(registerInfo.email);
    // console.log(validEmail);
    setErrorMessage("");

    const request = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(registerInfo)
    });
    const response = await request.json();

    if ([200, 201].includes(response.status)) {
      if (response.message && response.message == "User has been created successfully") {
        toastSuccess(response.message);
        return rts.replace("/auth/login");
      }
      return toastInfo(response.message);
    }

    setErrorMessage(response.message.toString());
  }

  return (
    <div className={`px-[25px] ${errorMessage == "" ? "mt-[50px]" : "mt-3"}`}>
      {errorMessage != "" && (
        <div className="text-xs text-red-600 font-semibold mb-3 bg-[#FFFFFF0F] rounded p-2">
          {errorMessage}
        </div>
      )}
      <h3 className="text-white text-[24px] font-bold pl-3">Login</h3>
      <div className="flex flex-col gap-[15px] mt-[25px]">
        <input
          type="text"
          className="outline-none text-white h-[50px] px-[18px] rounded-[9px] bg-[#FFFFFF0F] text-xs"
          placeholder="Enter email"
          autoComplete="off"
          value={registerInfo.email}
          onChange={(evt: any) => handleChangeRegister(evt.target.value, "email")}
        />
        <input
          type="text"
          className="outline-none text-white h-[50px] px-[18px] rounded-[9px] bg-[#FFFFFF0F] text-xs"
          placeholder="Enter username"
          autoComplete="off"
          value={registerInfo.username}
          onChange={(evt: any) => handleChangeRegister(evt.target.value, "username")}
        />
        <div className="rounded-[9px] bg-[#FFFFFF0F] flex items-center overflow-hidden">
          <input
            type={showPassword.password ? "text" : "password"}
            className="outline-none text-white h-[50px] px-[18px] text-xs w-full bg-transparent"
            placeholder="Create password"
            autoComplete="off"
            value={registerInfo.password}
            onChange={(evt: any) => handleChangeRegister(evt.target.value, "password")}
          />
          <div className="pr-[18px]">
            <button
              type="button"
              className="outline-none"
              onClick={() => handleShowPassword(!showPassword.password, "password")}
            >
              <Image src={"/icons/eye-slash-gold.png"} height={22} width={19} alt="eye password" />
            </button>
          </div>
        </div>
        <div className="rounded-[9px] bg-[#FFFFFF0F] flex items-center overflow-hidden">
          <input
            type={showPassword.confirm ? "text" : "password"}
            className="outline-none text-white h-[50px] px-[18px] text-xs w-full bg-transparent"
            placeholder="Confirm password"
            autoComplete="off"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
          <div className="pr-[18px]">
            <button
              type="button"
              className="outline-none"
              onClick={() => handleShowPassword(!showPassword.confirm, "confirm")}
            >
              <Image src={"/icons/eye-slash-gold.png"} height={22} width={19} alt="eye password" />
            </button>
          </div>
        </div>
        <div className="mt-[10px] relative">
          <button
            type="button"
            // className={`w-full h-[48px] rounded-[8px] text-sm text-white font-bold bg-gradient-blue transition-all ${loginInfo.username == "" || loginInfo.password == "" ? "opacity-50" : "shadow"}`}
            className={`w-full h-[48px] rounded-[8px] text-sm text-white font-bold bg-gradient-blue transition-all shadow`}
            // disabled={loginInfo.username == "" || loginInfo.password == "" ? true : false}
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
        <div className="text-xs text-white font-semibold text-center mt-[32px]">
          Have an account? <Link href={"/auth/login"} className="font-semibold text-gradient-golden border-b">Login here</Link>
        </div>
      </div>
    </div>
  )
}