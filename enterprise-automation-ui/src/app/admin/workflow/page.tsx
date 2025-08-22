"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import WorkflowForm from "@/components/WorkflowForm";
import { useRouter } from "next/navigation";


const AdminWorkFlowPage = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/login')
    return null;
  }

  const isAdmin = user?.roles?.includes('admin');
  const isApprover = user?.roles?.includes('approver');

  if (!isAdmin && isApprover) {
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
