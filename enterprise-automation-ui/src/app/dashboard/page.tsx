import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>لطفا ابتدا وارد شوید.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">به داشبورد خوش آمدید.</h1>
      <p>نام کاربری شما: {session.user?.name}</p>
      <p>نقش شما: {session.user?.role}</p>
    </div>
  );
}
