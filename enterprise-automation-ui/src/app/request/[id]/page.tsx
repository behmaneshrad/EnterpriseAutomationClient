'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import WorkflowTimeline from '@/components/WorkflowTimeline';
import ActionTimeline from '@/components/ActionTimeline';
import toast from 'react-hot-toast';
import { RequestDetails, WorkflowStep } from '@/types/workflow';

const RequestDetailsPage = () => {
  const { tokens, isAuthenticated, user } = useAuth();
  const { id } = useParams<{ id: string }>();

  const [request, setRequest] = useState<RequestDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && tokens?.accessToken && id) {
      const fetchRequestDetails = async () => {
        setLoading(true);
        try {
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/requests/${id}`;
          const response = await fetch(apiUrl, {
            headers: {
              'Authorization': `Bearer ${tokens.accessToken}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch request details: ${response.statusText}`);
          }

          const data = await response.json();
          setRequest(data);
        } catch (error) {
          console.error('Error fetching request details:', error);
          toast.error('خطا در دریافت جزئیات درخواست.');
        } finally {
          setLoading(false);
        }
      };
      fetchRequestDetails();
    }
  }, [isAuthenticated, tokens, id]);

  if (loading) {
    return <div className="text-center mt-10">در حال بارگذاری...</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-center mt-10">لطفا وارد شوید.</div>;
  }

  if (!request) {
    return <div className="text-center mt-10 text-red-500">درخواست مورد نظر یافت نشد.</div>;
  }
  
  const workflowSteps: WorkflowStep[] = request.workflow.workflowSteps.map(step => {
    let status: 'pending' | 'approved' | 'rejected' | string = 'pending';
    if (step.stepId < request.currentStep) { // 
      status = 'approved';
    } else if (step.stepId === request.currentStep) {
    if (request.currentStatus === 'approved') {
      status = 'approved';
    } else if (request.currentStatus === 'rejected') {
      status = 'rejected';
    } else {
      status = 'pending';
    }
  } else {
    status = 'pending';
  }

    return {
      stepId: step.stepId,
      stepName: step.stepName,
      approverRole: step.approverRole,
      status: status
    };
  });

  // بررسی نقش کاربر و مرحله فعلی برای نمایش دکمه تائید
  const userRole = user?.roles?.[0];
  const currentStepDetails = request.workflow.workflowSteps.find(step => step.stepId === request.currentStep);
  const isUserApprover = userRole === currentStepDetails?.approverRole;
  const isPending = request.currentStatus === 'pending';

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">جزئیات درخواست</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto">
        <div className="mb-6">
          <p className="text-gray-500 text-sm">عنوان</p>
          <h2 className="text-xl font-semibold">{request.title}</h2>
        </div>
        <div className="mb-6">
          <p className="text-gray-500 text-sm">شرح</p>
          <p className="text-gray-700">{request.description}</p>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4">مراحل گردش کار</h3>
          <WorkflowTimeline steps={workflowSteps} />
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4">تاریخچه اقدامات</h3>
          <ActionTimeline actions={request.actions} />
        </div>
        
        <div className="flex justify-end mt-8 space-x-4 rtl:space-x-reverse">
          {isPending && isUserApprover && (
            <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
              تایید
            </button>
          )}
          <button className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsPage;