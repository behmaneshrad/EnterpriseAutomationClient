'use client';

import React from 'react';
import { WorkflowStep } from '@/types/workflow';

interface WorkflowTimelineProps {
  steps: WorkflowStep[];
}

const WorkflowTimeline: React.FC<WorkflowTimelineProps> = ({ steps }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start md:items-center space-y-8 md:space-y-0 md:space-x-8 rtl:space-x-reverse">
      {steps.map((step, index) => {
        const isCurrent = step.status === 'pending';
        const isCompleted = step.status === 'approved';
        const isRejected = step.status === 'rejected';

        const stepClass = isCompleted
          ? 'bg-green-500 text-white'
          : isRejected
          ? 'bg-red-500 text-white'
          : isCurrent
          ? 'bg-blue-500 text-white animate-pulse'
          : 'bg-gray-300 text-gray-700';
        
        const lineClass = isCompleted ? 'bg-green-500' : isCurrent || isRejected ? 'bg-gray-300' : 'bg-gray-300';

        return (
          <React.Fragment key={step.stepId}>
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg transition-all duration-300 ${stepClass}`}
              >
                {index + 1}
              </div>
              <div className="mt-2 text-center">
                <p className="font-semibold text-gray-800">{step.stepName}</p>
                <p className="text-sm text-gray-500">
                  {step.status === 'approved' ? 'تایید شده' :
                   step.status === 'rejected' ? 'رد شده' :
                   'در انتظار'}
                </p>
                <p className="text-xs text-gray-400">
                  نقش: {step.approverRole}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`hidden md:block w-20 h-1 transition-all duration-300 ${lineClass}`}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default WorkflowTimeline;