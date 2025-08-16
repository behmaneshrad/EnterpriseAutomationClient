"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import WorkflowForm from "@/components/WorkflowForm";

const AdminWorkFlowPage = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p>درحال بارگذاری...</p>
      </div>
    );
  }

  // بررسی نقش کاربر برای دسترسی به این صفحه
  const isAdminOrApprover = user?.role === "admin" || user?.role === "approver";

  if (!isAdminOrApprover) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          شما به این صفحه دسترسی ندارید.
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        تعریف فرآیندهای کاری
      </h1>
      <WorkflowForm />
    </div>
  );
};

export default AdminWorkFlowPage;
