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

  const onSubmit = async (data: RequestFormSchema) => {
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post("/api/requests/submit", data);
      toast.success("درخواست با موفیت ارسال شد");
      reset();
      router.push("/request/success");
    } catch (err: unknown) {
      const e = err as {response?: {data?: {message?: string}}; message?: string};
      toast.error(
        `خطا در ارسال: ${e.response?.data?.message || e.message || "نامشخص"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          ارسال درخواست جدید
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* فیلد عنوان */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              عنوان درخواست
            </label>
            <input
              type="text"
              id="title"
              {...register("title")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* فیلد شرح */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              شرح درخواست
            </label>
            <textarea
              id="description"
              {...register("description")}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
          {/* Dropdown انتخاب Workflow */}

          <div>
            <label
              htmlFor="workflowId"
              className="block text-sm font-medium text-gray-700"
            >
              انتخاب فرآیند
            </label>

            {loadingWorkflows ? (
              <p className="text-gray-500 text-sm mt-1">در حال بارگذاری...</p> // ✅ وقتی لود می‌کنه
            ) : (
              <select
                id="workflowId"
                {...register("workflowId")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">انتخاب فرآیند</option>
                {workflows.map((wf) => (
                  <option key={wf.id} value={wf.id}>
                    {wf.name}
                  </option>
                ))}
              </select>
            )}
            {errors.workflowId && (
              <p className="mt-2 text-sm text-red-600">
                {errors.workflowId.message}
              </p>
            )}
          </div>

          {/* دکمه ارسال */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-8"
            >
              {isSubmitting ? "در حال ارسال..." : "ارسال درخواست"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
