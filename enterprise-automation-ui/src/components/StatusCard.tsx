interface Props {
    title: string;
    count: number;
    color: "red" | "yellow" | "green";
  }
  
  export function StatusCard({ title, count, color }: Props) {
    const bgColor = {
      red: "bg-red-100 text-red-700",
      yellow: "bg-yellow-100 text-yellow-700",
      green: "bg-green-100 text-green-700",
    }[color];
  
    return (
      <div className={`p-4 rounded shadow ${bgColor}`}>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-3xl font-bold">{count}</p>
      </div>
    );
  }