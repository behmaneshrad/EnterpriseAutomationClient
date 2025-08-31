"use client";

import NavIcon from "./layout/NavIcon";
import { useState } from "react";
import Image from "next/image";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      className={`bg-gray-100 border-l border-gray-300 flex flex-col py-4 space-y-6 fixed right-0 top-0 h-screen z-10 transition-all duration-300 ${
        isOpen ? "w-64 items-start px-4" : "w-20 items-center"
      }`}
    >
      {/* دکمه باز و بسته کردن منو */}
      <button onClick={() => setIsOpen(!isOpen)} className="mb-16 mt-2 ">
        <Image src="/icons/menu.svg" alt="منو" width={24} height={24} />
      </button>

      {/* آیکون‌ها */}
      <NavIcon label="خانه" iconName="home" href="/dashboard" isOpen={isOpen} />
      <NavIcon label="مدیریت درخواست‌ها" iconName="note" href="/request" isOpen={isOpen} />
      <NavIcon label="بررسی درخواست‌ها" iconName="task-square" href="/request" isOpen={isOpen} />
      <NavIcon label="تنظیمات" iconName="setting" href="/profile" isOpen={isOpen} />
      <NavIcon label="خروج" iconName="login" href="/signout" isOpen={isOpen} />
    </aside>
  );
}

