import Link from "next/link";

interface Props {
    label: string;
    id : string;
    href : string;
  }
  
  export function ActionButton({ label, id, href }: Props) {
    const finalHref = href?.includes("[id]") ? href.replace("[id]", id) : href ?? `/request/${id}`;
  
    return (
      <Link
        href={finalHref}
        className="bg-gray-400 text-gray-900 py-3 rounded hover:bg-gray-500 transition"
      >
        <button>{label}</button>
      </Link>
    );
  }
  