"use client";

import Image from "next/image";

interface CProps {
  title: string;
  action(): void;
  children: React.ReactNode;
}

export default function CardInfoIndex({title, action, children}: CProps) {
  return (
    <div className="rounded-[14px] bg-[#0E191F] px-[25px] py-[13px]">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-white">{title}</span>
        <button
          type="button"
          className=""
          onClick={action}
        >
          <Image src={"/icons/pen-edit.png"} width={16} height={16} alt="action info" />
        </button>
      </div>
      <div className="mt-4">
        {children}
      </div>
    </div>
  )
}