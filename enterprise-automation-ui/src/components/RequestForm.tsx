"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";

// zod اعتبار سنجی با
const RequestFormSchema = z.object({
  title: z
    .string()
    .min(5, { message: "عنوان باید حداقل 5 کاراکتر باشد." })
    .max(100, { message: "عنوان نمی‌تواند بیشتر از 100 کاراکتر باشد." }),
  description: z
    .string()
    .min(10, { message: "شرح باید حداقل 10 کاراکتر باشد." })
    .max(500, { message: "شرح نمی‌تواند بیشتر از 500 کاراکتر باشد." }),
});

type RequestFormSchema = z.infer<typeof RequestFormSchema>;

const RequestForm = () => {
  // استفاده از هوک جدید useAuth
  const { tokens } = useAuth();
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  //React Hook Form با  resolver راه اندازی
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RequestFormSchema>({
    resolver: zodResolver(RequestFormSchema),
  });

  const onSubmit = async (data: RequestFormSchema) => {
    setSubmissionStatus("در حال درخواست...");

    try {
      const response = await fetch("http://localhost:5285/api/request/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens?.accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmissionStatus("درخواست با موفقیت ارسال شد!");
      } else {
        const errorData = await response.json();
        setSubmissionStatus(`خطا در ارسال: ${errorData.message}`);
      }
    } catch (error) {
      setSubmissionStatus("خطا در برقراری ارتباط با سرور");
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

          {/* دکمه ارسال */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ارسال درخواست
            </button>
          </div>

          {/* وضعیت ارسال */}
          {submissionStatus && (
            <p className="text-center mt-4 text-sm font-medium">
              {submissionStatus}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
