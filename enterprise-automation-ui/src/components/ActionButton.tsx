interface Props {
    label: string;
  }
  
  export function ActionButton({ label }: Props) {
    return (
      <button className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
        {label}
      </button>
    );
  }