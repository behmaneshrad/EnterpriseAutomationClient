"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

export interface Request {
  RequestId: number;
  Title: string;
  CurrentStatus: "pending" | "approved" | "rejected";
  Description: string;
}

interface Props {
  data: Request[];
}

const getStatusIcon = (status: Request["CurrentStatus"]) => {
  const baseClass = "w-5 h-5 inline-block";
  switch (status) {
    case "approved":
      return (
        <Image
          src="/icons/tick-square.svg"
          alt="تأیید شده"
          className={baseClass}
        />
      );
    case "rejected":
      return (
        <Image
          src="/icons/close-square.svg"
          alt="رد شده"
          className={baseClass}
        />
      );
    default:
      return (
        <Image
          src="/icons/minus-square.svg"
          alt="در حال بررسی"
          className={baseClass}
        />
      );
  }
};

const RequestTable: React.FC<Props> = ({ data }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "" | "pending" | "approved" | "rejected"
  >("");

  // داده‌های فیلتر شده
  const filteredData = useMemo(() => {
    return data.filter((req) => {
      const matchesSearch =
        req.Title.toLowerCase().includes(search.toLowerCase()) ||
        req.Description.toLowerCase().includes(search.toLowerCase()) ||
        req.RequestId.toString().includes(search);

      const matchesStatus = statusFilter
        ? req.CurrentStatus === statusFilter
        : true;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter]);

  return (
    <div>
      {/* بخش جستجو و فیلتر */}
      <div className="flex gap-4 mb-4 text-gray-900">
        <input
          type="text"
          placeholder="جستجو..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 flex-1"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="">همه وضعیت‌ها</option>
          <option value="pending">در حال بررسی</option>
          <option value="approved">تأیید شده</option>
          <option value="rejected">رد شده</option>
        </select>
      </div>

      {/* جدول */}
      <div className="overflow-x-auto border border-gray-300 rounded-lg">
        <table className="min-w-full text-sm text-right">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">شماره درخواست</th>
              <th className="px-4 py-2">نوع درخواست</th>
              <th className="px-4 py-2">وضعیت</th>
              <th className="px-4 py-2">توضیحات</th>
              <th className="px-4 py-2">مشاهده</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((req) => (
              <tr
                key={req.RequestId}
                className="border-y-4 border-gray-50 hover:bg-gray-100 text-gray-700"
              >
                <td className="px-4 py-2">{req.RequestId}</td>
                <td className="px-4 py-2">{req.Title}</td>
                <td className="px-4 py-2">
                  {getStatusIcon(req.CurrentStatus)}
                </td>
                <td className="px-4 py-2">{req.Description}</td>
                <td className="px-4 py-2 text-center">
                  <Image
                    src="/icons/eye.svg"
                    alt="مشاهده"
                    className="w-5 h-5 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestTable;
