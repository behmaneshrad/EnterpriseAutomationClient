"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RequestFormLeave from "./RequestFormLeave";
import RequestFormEquipment from "./RequestFormEquipment";



const RequestForm = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const router = useRouter();
 
  return (
     <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-5xl">
        {/* هدر */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-800">ثبت درخواست جدید</h1>
          <button
            onClick={() => router.back()}
            className="text-sm text-blue-800 hover:underline"
          >
            بازگشت
          </button>
        </div>

        {/* انتخاب نوع درخواست */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نوع درخواست خود را انتخاب کنید
          </label>
          <select value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800">

                <option value="">-- نوع درخواست خود را انتخاب کنید --</option>
                <option value="مرخصی">مرخصی</option>
                <option value="خرید تجهیزات">خرید تجهیزات</option>
                
               </select>
        </div>

        {/* فرم‌ها */}
        {selectedType === "مرخصی" && <RequestFormLeave />}
        {selectedType === "خرید تجهیزات" && <RequestFormEquipment />}
      </div>
    </div>
  );
};

export default RequestForm;
