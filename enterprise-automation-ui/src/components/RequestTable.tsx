import React from "react";


interface Request {
  id: number;
  type: string;
  statusIcon: "pending" | "approved" | "rejected";
  description: string;
}

const requests: Request[] = [
  { id: 1, type: "خرید تجهیزات", statusIcon: "pending", description: "در حال بررسی" },
  { id: 2, type: "خرید تجهیزات", statusIcon: "approved", description: "در حال بررسی" },
  { id: 3, type: "خرید تجهیزات", statusIcon: "rejected", description: "در حال بررسی" },
  { id: 4, type: "خرید تجهیزات", statusIcon: "approved", description: "در حال بررسی" },
];

const getStatusIcon = (status: Request["statusIcon"]) => {
    const baseClass = "w-5 h-5 inline-block";
  
    switch (status) {
      case "approved":
        return <img src="/icons/tick-square.svg" alt="تأیید شده" className={`${baseClass}`} />;
      case "rejected":
        return <img src="/icons/close-square.svg" alt="رد شده" className={`${baseClass}`} />;
      default:
        return <img src="/icons/minus-square.svg" alt="در حال بررسی" className={`${baseClass}`} />;
    }
  };

const RequestTable: React.FC = () => {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-lg">
      <table className="min-w-full text-sm text-right">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">شماره درخواست</th>
            <th className="px-4 py-2">نوع درخواست</th>
            <th className="px-4 py-2">وضعیت</th>
            <th className="px-4 py-2">توضیحات</th>
            <th className="px-4 py-2">مشاهده</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className=" border-y-4 border-gray-50 hover:bg-gray-50 text-gray-700">
              <td className="px-4 py-2">{req.id}</td>
              <td className="px-4 py-2">{req.type}</td>
              <td className="px-4 py-2">{getStatusIcon(req.statusIcon)}</td>
              <td className="px-4 py-2">{req.description}</td>
              <td className="px-4 py-2 text-center">
              <img src="/icons/eye.svg" alt="مشاهده" className="w-5 h-5 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;