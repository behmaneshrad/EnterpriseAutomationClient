"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { requestFormSchema, RequestFormSchema } from "@/schemas/requestFormSchema";

// تعریف تایپ برای فرآیندها
type Workflow = {
  id: string;
  name: string;
};

const RequestForm = () => {
  // استفاده از هوک جدید useAuth
  const { tokens, isAuthenticated } = useAuth();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loadingWorkflows, setLoadingWorkflows] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RequestFormSchema>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      title: "",
      description: "",
      workflowId: "",
    },
  });

  // واکشی لیست فرآیندها از API
  useEffect(() => {
    const fetchWorkflows = async () => {
      // استفاده از isAuthenticated و tokens از هوک useAuth
      if (!isAuthenticated || !tokens?.accessToken) return;
      setLoadingWorkflows(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workflows`, {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error(`Workflow fetch failed: ${res.status}`);
        }
        const data: Workflow[] = await res.json();
        setWorkflows(data || []);
      } catch (err) {
        console.error(err);
        toast.error("خطا در دریافت لیست فرآیندها");
      } finally {
        setLoadingWorkflows(false);
      }
    };
    fetchWorkflows();
  }, [isAuthenticated, tokens?.accessToken]);

  const onSubmit = async (form: RequestFormSchema) => {
    if (!isAuthenticated || !tokens?.accessToken) {
      toast.error("توکن دسترسی وجود ندارد. لطفاً دوباره وارد شوید.");
      return;
    }
    if (!form.workflowId) {
      toast.error("لطفا یک فرایند انتخاب کنید.");
      return;
    }

    const body = {
      title: form.title,
      description: form.description,
      workflowId: form.workflowId,
    };

    setIsSubmitting(true);
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/requests/submit`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        let message = response.statusText;
        try {
          const err = await response.json();
          message = err?.message || message;
        } catch {
          /* ignore */
        }
        toast.error(`خطا در ارسال درخواست: ${message}`);
        return;
      }

      toast.success("درخواست با موفقیت ارسال شد!");
      reset();
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
      toast.error("خطا در اتصال به سرور. لطفاً دوباره امتحان کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-8 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-800"
    >
      {/* عنوان */}
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          عنوان درخواست
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>}
      </div>
      {/* شرح */}
      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          شرح درخواست
        </label>
        <textarea
          id="description"
          rows={4}
          {...register("description")}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      {/* انتخاب فرآیند */}
      <div className="mb-12">
        <label htmlFor="workflowId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          انتخاب فرآیند
        </label>
        <select
          id="workflowId"
          {...register("workflowId")}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          disabled={loadingWorkflows}
        >
          <option value="">
            {loadingWorkflows ? "در حال بارگذاری..." : "یک فرآیند انتخاب کنید"}
          </option>
          {workflows.map((wf) => (
            <option key={wf.id} value={wf.id}>
              {wf.name}
            </option>
          ))}
        </select>
        {errors.workflowId && <p className="mt-2 text-sm text-red-600">{errors.workflowId.message}</p>}
      </div>

      {/* دکمه ارسال */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isSubmitting ? "در حال ارسال..." : "ارسال درخواست"}
        </button>
      </div>
    </form>
  );
};

export default RequestForm;