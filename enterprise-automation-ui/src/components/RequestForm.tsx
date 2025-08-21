"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { requestFormSchema, RequestFormSchema } from "@/schemas/requestFormSchema";

const RequestForm = () => {
  const { tokens } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();


  //React Hook Form با  resolver راه اندازی
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RequestFormSchema>({
    resolver: zodResolver(requestFormSchema),
  });

  const onSubmit = async (data: RequestFormSchema) => {
    if (!tokens?.accessToken) {
      toast.error("خطا: توکن دسترسی وجود ندارد.");
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl =  `${process.env.NEXT_PUBLIC_API_URL}/api/requests/submit`;
        const response = await fetch(apiUrl, {
          method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens?.accessToken}`,
        },
        body: JSON.stringify(data),
      });
        
      if (response.ok) {
        toast.success("درخواست با موفقیت ارسال شد!");
        reset();
        router.push("/request/success");
      } else {
        const errorData = await response.json();
        toast.error(`خطا در ارسال: ${errorData.message}`);
      }
    } catch (error) {
      toast.error("خطا در برقراری ارتباط با سرور");
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

          {/* دکمه ارسال */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
