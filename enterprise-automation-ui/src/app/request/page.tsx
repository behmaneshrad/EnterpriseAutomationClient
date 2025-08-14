import RequestTable, { Request } from "@/components/RequestTable";
import Sidebar from "@/components/Sidebar";

const requests: Request[] = [
  { RequestId: 1, Title: "خرید مودم ", CurrentStatus: "pending", Description: "در حال بررسی" },
  { RequestId: 2, Title: "خرید تجهیزات", CurrentStatus: "approved", Description: "در حال بررسی" },
  { RequestId: 3, Title: "خرید  لپ تاپ ", CurrentStatus: "rejected", Description: "در حال بررسی" },
  { RequestId: 4, Title: "مرخصی  ", CurrentStatus: "approved", Description: "در حال بررسی" },
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
