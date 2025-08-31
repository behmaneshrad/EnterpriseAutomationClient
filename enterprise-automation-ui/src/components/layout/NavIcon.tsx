"use client"

import Link from "next/link";
import Image from "next/image";

interface Props {
  label: string;
  iconName: string; // 👈 اسم آیکون به صورت داینامیک
  href: string;
  isOpen: boolean;

}

export default function NavIcon({ label, iconName, href, isOpen }: Props) {
    return (
      <Link href={href} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
        <Image src={`/icons/${iconName}.svg`} alt={label} width={24} height={24} />
        {isOpen && <span className="text-sm">{label}</span>}
      </Link>
    );
  }
  