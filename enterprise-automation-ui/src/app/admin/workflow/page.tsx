import React from "react";
import WorkflowForm from "@/components/WorkflowForm";

const AdminWorkFlowPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
        ثبت فرآیند جدید
      </h1>
      <WorkflowForm />
    </div>
  );
};

export default AdminWorkFlowPage;
