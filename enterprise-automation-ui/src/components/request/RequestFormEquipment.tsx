"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestFormSchemaEquipment, RequestFormEquipmentSchema } from "@/schemas/requestFormSchema";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axiosApi";
import { useRouter } from "next/navigation";

const RequestFormEquipment = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestFormEquipmentSchema>({
    resolver: zodResolver(requestFormSchemaEquipment),
  });

  const onSubmit = async (data: RequestFormEquipmentSchema) => {
    try {
      await axiosInstance.post("/api/requests/submit", data);
      toast.success("درخواست خرید ثبت شد");
      router.push("/request/success");
    } catch {
      toast.error("خطا در ثبت خرید تجهیزات");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* نام تجهیز */}
      <div>
        <label className="block text-sm font-medium text-gray-700">نام تجهیز</label>
        <input
          type="text"
          {...register("equipmentName")}
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-800 focus:border-blue-800"
        />
        {errors.equipmentName && (
          <p className="text-sm text-red-600">{errors.equipmentName.message}</p>
        )}
      </div>

      {/* تعداد */}
      <div>
        <label className="block text-sm font-medium text-gray-700">تعداد</label>
        <input
          type="number"
          {...register("quantity", { valueAsNumber: true })}
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-800 focus:border-blue-800"
        />
        {errors.quantity && (
          <p className="text-sm text-red-600">{errors.quantity.message}</p>
        )}
      </div>

      {/* توضیحات */}
      <div>
        <label className="block text-sm font-medium text-gray-700">توضیحات</label>
        <textarea
          {...register("description")}
          rows={4}
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-800 focus:border-blue-800"
        />
      </div>

      {/* فایل پیوست */}
      <div>
        <label className="block text-sm font-medium text-gray-700">فایل پیوست</label>
        <input
          type="file"
          {...register("file")}
          className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-800 file:text-white hover:file:bg-blue-900"
        />
      </div>

      {/* دکمه‌ها */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          type="submit"
          className="px-6 py-2 rounded-md text-white bg-blue-800 hover:bg-blue-900"
        >
          ثبت
        </button>
      </div>
    </form>
  );
};

export default RequestFormEquipment;
