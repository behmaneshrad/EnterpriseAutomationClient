import React from 'react';
import WorkflowTimeline from '@/components/WorkflowTimeline';


const exampleSteps = [
  {stepName: 'درخواست ثبت شد', isCompleted: true, isCurrent: false},
  {stepName: 'تایید مدیر', isCompleted: false, isCurrent: true},
  {stepName: 'در حال اجرا', isCompleted: false, isCurrent: false},
  {stepName: 'تکمیل شده', isCompleted: false, isCurrent: false},
];

const RequestDetailPage = () => {
  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-4xl font-bold mb-8 text-center'>جزئیات درخواست</h1>

      <div className='mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner'>
        <h2 className='text-xl font-semibold'>عنوان: درخواست مرخصی</h2>
        <p className='text-gray-600 dark:text-gray-300'>
          این یک درخواست برای مرخصی است که باید توسط مدیر تایید شود.
        </p>
      </div>

      <WorkflowTimeline steps={exampleSteps}/>
    </div>
  )
}

export default RequestDetailPage;
