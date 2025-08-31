"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { WorkflowFormSchema, workflowSchema } from "@/schemas/workflowSchema";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";

const WorkflowForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {tokens, isAuthenticated}= useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<WorkflowFormSchema>({
    resolver: zodResolver(workflowSchema),
    defaultValues: {
      workflowName: "",
      steps: [{ stepName: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const onSubmit = async (data: WorkflowFormSchema) => {
    // بررسی وجود توکن دسترسی
    if (!isAuthenticated || !tokens?.accessToken) {
        toast.error('خطا: توکن دسترسی وجود ندارد. لطفا مجددا وارد شوید.');
        return;
    }

    setIsSubmitting(true);

     try {
      const apiUrl = `${process.env.NEXT_POBLIC_API_URL}/api/workflowdefinitions/upsertworkflow`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('فرآیند با موفقیت ثبت شد!');
        reset();
      } else {
        const errorData = await response.json();
        toast.error(`خطا در ثبت فرآیند: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      toast.error('خطا در اتصال به سرور. لطفا دوباره امتحان کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        ثبت فرآیند جدید
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* فیلد نام فرآیند */}
        <div className="mb-4">
          <label
            htmlFor="workflowName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            نام فرآیند
          </label>
          <input
            type="text"
            id="workflowName"
            {...register("workflowName")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors.workflowName && (
            <p className="mt-2 text-sm text-red-600">
              {errors.workflowName.message}
            </p>
          )}
        </div>

        {/* فیلدهای مراحل */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            مراحل
          </label>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center space-x-2 rtl:space-x-reverse mb-2 "
            >
              <input
                type="text"
                {...register(`steps.${index}.stepName` as const)}
                placeholder={`نام مرحله ${index + 1}`}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
              >
                حذف
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ stepName: "" })}
            className="mt-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
          >
            افزودن مرحله
          </button>
          {errors.steps && (
            <p className="mt-2 text-sm text-red-600">{errors.steps.message}</p>
          )}
        </div>

        {/* دکمه ثبت */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 focus:outline-none"
          >
            {isSubmitting ? "در حال ثبت..." : "ثبت فرآیند"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkflowForm;
