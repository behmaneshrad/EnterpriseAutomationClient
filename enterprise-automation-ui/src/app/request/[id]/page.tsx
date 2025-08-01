"use client";

import React from "react";

interface RequestDetailPageProps {
  params: {
    id: string;
  };
}

const RequestDetailPage: React.FC<RequestDetailPageProps> = ({ params }) => {
  const { id } = params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        جزئیات درخواست <span className="text-blue-600">{id}</span>
      </h1>
    </div>
  );
};

export default RequestDetailPage;
