"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  requestFormSchema,
  RequestFormSchema,
} from "@/schemas/requestFormSchema";
import axiosInstance from "@/lib/api";

interface Workflow {
  id: string;
  name: string;
}

const RequestForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loadingWorkflows, setLoadingWorkflows] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>("مرخصی");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RequestFormSchema>({
    resolver: zodResolver(requestFormSchema),
  });

  useEffect(() => {
    const fetchWorkflows = async () => {
      setLoadingWorkflows(true);
      try {
        const res = await axiosInstance.get("/api/workflows");
        setWorkflows(res.data);
      } catch (err) {
        toast.error("خطا در دریافت لیست فرآیندها");
      } finally {
        setLoadingWorkflows(false);
      }
    };
    fetchWorkflows();
  }, []);

  const filteredWorkflows = workflows.filter((wf) =>
    wf.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = async (data: RequestFormSchema) => {
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post("/api/requests/submit", data);
      toast.success("درخواست با موفیت ارسال شد");
      reset();
      router.push("/request/success");
    } catch (err: unknown) {
      const e = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(
        `خطا در ارسال: ${e.response?.data?.message || e.message || "نامشخص"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">
          ثبت درخواست جدید
        </h1>
        <button onClick={() => router.back()} 
          className="text-sm text-blue-800 hover:underline">
            بازگشت
          </button>
          </div>

          {/* انتخاب نوع درخواست */}
          <div className="flex gap-2 mb-6">
             {["مرخصی", "خرید تجهیزات"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-md border ${
                selectedType === type
                  ? "bg-blue-800 text-white border-blue-800"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
          </div>

          {/* فرم */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* اگر مرخصی انتخاب شد → فیلدهای تاریخ */}
          {selectedType === "مرخصی" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  از تاریخ
                </label>
                <input
                  type="date"
                  {...register("startDate")}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  تا تاریخ
                </label>
                <input
                  type="date"
                  {...register("endDate")}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800"
                />
              </div>
            </div>
          )}

          {/* توضیحات */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              توضیحات
            </label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="توضیحات..."
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800"
            />
          </div>

           {/* فایل پیوست */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              فایل پیوست:
            </label>
            <input
              type="file"
              {...register("file")}
              className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-800 file:text-white hover:file:bg-blue-900"
            />
          </div>

           {/* انتخاب فرآیند + سرچ */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              انتخاب فرآیند
            </label>
            <input
              type="text"
              placeholder="جستجو در فرآیندها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1 mb-2 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800"
            />
            <select
              {...register("workflowId")}
              className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800"
            >
               <option value="">انتخاب فرآیند</option>
              {filteredWorkflows.map((wf) => (
                <option key={wf.id} value={wf.id}>
                  {wf.name}
                </option>
              ))}
            </select>
          </div>

               {/* دکمه‌ها */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border rounded-md text-gray-700 border-gray-300 hover:bg-gray-100"
            >
              لغو
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-md text-white bg-blue-800 hover:bg-blue-900 disabled:opacity-50"
            >
              {isSubmitting ? "در حال ارسال..." : "ثبت"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
