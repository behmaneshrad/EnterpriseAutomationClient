"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  requestFormSchema,
  RequestFormSchema,
} from "@/schemas/requestFormSchema";
import React from "react";

const RequestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestFormSchema>({
    resolver: zodResolver(requestFormSchema),
  });

  const onSubmit = (data: RequestFormSchema) => {
    // این تابع پس از اعتبارسنجی موفق اجرا میشود
    console.log(data);
    // کد ارسال درخواست به سرور
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
          className="mt-l block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
          className="mt-1 block w-full text-red-600"
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
        >
          ارسال درخواست
        </button>
      </div>
    </form>
  );
};

export default RequestForm;
