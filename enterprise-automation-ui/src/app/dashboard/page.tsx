import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { StatusCard } from "@/components/StatusCard";
import { ActionButton } from "@/components/ActionButton";
import Sidebar from "@/components/Sidebar";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>لطفا ابتدا وارد شوید.</div>;
  }

  // مطمئن می‌شویم roles همیشه آرایه است
  const roles: string[] = session.user?.roles || [];

  // اگر نقش کارمند دارد، هدایت به داشبورد مخصوص کارمند
  if (roles.includes("employee")) {
    redirect("/dashboard/employee");
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* نوار وظیفه سمت راست */}
      <Sidebar />

      {/* محتوای اصلی */}
      <main className="flex-1 py-6 space-y-6 overflow-y-auto pr-24 pl-8">
        {/* وضعیت درخواست‌ها */}
        <div className="grid grid-cols-3 gap-4">
          <StatusCard title="درخواست رد شده" count={2} color="red" />
          <StatusCard title="درخواست در حال بررسی" count={3} color="yellow" />
          <StatusCard title="درخواست تایید شده" count={10} color="green" />
        </div>

        {/* دکمه‌ها */}
        <div className="grid grid-cols-3 gap-4">
          <ActionButton label="بررسی درخواست ها" href="/request/[id]" />
          <ActionButton label="ثبت درخواست جدید" href="/request/new" />
          <ActionButton label="مشاهده درخواست ها" href="/request" />
        </div>
      </main>
    </div>
  );
}