import RequestTable, { Request } from "@/components/request/RequestTable";
import Sidebar from "@/components/layout/Sidebar";

const requests: Request[] = [
  { id: 1, type: "خرید مودم ", statusIcon: "pending", description: "در حال بررسی" },
  { id: 2, type: "خرید تجهیزات", statusIcon: "approved", description: "در حال بررسی" },
  { id: 3, type: "خرید  لپ تاپ ", statusIcon: "rejected", description: "در حال بررسی" },
  { id: 4, type: "مرخصی  ", statusIcon: "approved", description: "در حال بررسی" },
];


export default function Page() {
  return (
    <div className="flex h-screen bg-gray-50">
       <Sidebar />

       <main className="flex-1 py-6 space-y-6 overflow-y-auto pr-24 pl-8">
        <RequestTable data={requests} />;
       </main> 
    </div>
 
)
}
