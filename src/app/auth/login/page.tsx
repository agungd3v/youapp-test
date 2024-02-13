"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toastSuccess, toastInfo } from "@/utils/toast";
import { setTokenCookie } from "@/utils/cookies";

export default function Login() {
  const rts = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginInfo, setLoginInfo] = useState<{username: string; email: string; password: string}>({
    username: "",
    email: "",
    password: ""
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleChangeUsername = (evt: any) => {
    setLoginInfo((prevState: any) => ({
      ...prevState,
      username: evt.target.value,
      email: evt.target.value
    }));
  }
  
  const handleChangePassword = (evt: any) => {
    setLoginInfo((prevState: any) => ({
      ...prevState,
      password: evt.target.value
    }));
  }

  const handleLogin = async () => {
    const request = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(loginInfo)
    });
    const response = await request.json();

    if ([200, 201].includes(response.status)) {
      if (response.message && response.message == "User has been logged in successfully") {
        toastSuccess(response.message);
        setTokenCookie(response.access_token);

        return rts.replace("/");
      }
      return toastInfo(response.message);
    }
  }

  return (
    <div className="px-[25px] mt-[50px]">
      <h3 className="text-white text-[24px] font-bold pl-3">Login</h3>
      <div className="flex flex-col gap-[15px] mt-[25px]">
        <input
          type="text"
          className="outline-none text-white h-[50px] px-[18px] rounded-[9px] bg-[#FFFFFF0F] text-xs"
          placeholder="Enter Username/Email"
          autoComplete="off"
          value={loginInfo.username}
          onChange={handleChangeUsername}
        />
        <div className="rounded-[9px] bg-[#FFFFFF0F] flex items-center overflow-hidden">
          <input
            type={showPassword ? "text" : "password"}
            className="outline-none text-white h-[50px] px-[18px] text-xs w-full bg-transparent"
            placeholder="Enter password"
            autoComplete="off"
            value={loginInfo.password}
            onChange={handleChangePassword}
          />
          <div className="pr-[18px]">
            <button
              type="button"
              className="outline-none"
              onClick={handleShowPassword}
            >
              <Image src={"/icons/eye-slash-gold.png"} height={22} width={19} alt="eye password" />
            </button>
          </div>
        </div>
        <div className="mt-[10px] relative">
          <button
            type="button"
            className={`w-full h-[48px] rounded-[8px] text-sm text-white font-bold bg-gradient-blue transition-all ${loginInfo.username == "" || loginInfo.password == "" ? "opacity-50" : "shadow"}`}
            disabled={loginInfo.username == "" || loginInfo.password == "" ? true : false}
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div className="text-xs text-white font-semibold text-center mt-[32px]">
          No account? <Link href={"/auth/register"} className="font-semibold text-gradient-golden border-b">Register here</Link>
        </div>
      </div>
    </div>
  )
}