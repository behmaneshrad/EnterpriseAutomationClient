"use client"

import Link from "next/link";

interface Props {
    label: string;
    id?: string;
    href : string;
  }
  
  export function ActionButton(props: Props) {
    const { label, id, href } = props; // destructuring درست
  
    const finalHref =
      id && href.includes("[id]")
        ? href.replace("[id]", id)
        : href;
  
    return (
      <Link
        href={finalHref}
        className="bg-gray-400 text-gray-900 py-3 rounded hover:bg-gray-500 transition"
      >
        <button>{label}</button>
      </Link>
    );
  }
  