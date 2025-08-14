"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import {
  requestFormSchema,
  RequestFormSchema,
} from "@/schemas/requestFormSchema";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, {useState} from "react";

const RequestForm = () => {
    const {data: session} = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RequestFormSchema>({
    resolver: zodResolver(requestFormSchema),
  });

  const onSubmit = async (data: RequestFormSchema) => {
    // بررسی وجود توکن
    if (!session?.accessToken) {
        toast.error('خطا: توکن دسترسی وجود ندارد. لطفا مجددا وارد شوید')
        return;
    }

    setIsSubmitting(true);

    try {
        const response = await fetch("http://localhost:5285/api/requests/submit", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`,
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            toast.success('درخواست با موفقیت ارسال شد!');
            reset();
            router.push('/request')
        } else {
            const errorData = await response.json();
            toast.error(`خطا ارسال درخواست: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        toast.error('خطا در اتصال به سرور. لطفا دوباره امتحان کنید.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-8 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-800"
    >
      <div className="mb-6">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          عنوان درخواست
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.title && (
          <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          شرح درخواست
        </label>
        <textarea
          id="description"
          rows={4}
          {...register("description")}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled={isSubmitting}
        >
           {isSubmitting ? 'در حال ارسال...' : 'ارسال درخواست'}
        </button>
      </div>
    </form>
  );
};

export default RequestForm;
