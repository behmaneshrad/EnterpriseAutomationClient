import Link from "next/link";

interface Props {
    label: string;
    href : string;
  }
  
  export function ActionButton({ label, href }: Props) {
    return (
     <Link href={href} className="bg-gray-400 text-gray-900 py-3 rounded hover:bg-gray-500 transition">
      <button >
        {label}
      </button>
    </Link>

    );
  }