import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-8 flex justify-between mx-8 mt-4">
      
      <p className="mt-2 text-blue-400"> {session.user?.name || "فائزه وحدت"} </p>
      <h1 className="text-xl text-blue-400 font-bold">داشبورد</h1>
    </div>
  );
}
