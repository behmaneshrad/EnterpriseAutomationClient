"use client";

import React from "react";
import RequestForm from "@/components/request/RequestForm";

const NewRequestPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        ارسال درخواست جدید
      </h1>
      <RequestForm/>
    </div>
  );
};

export default NewRequestPage;
