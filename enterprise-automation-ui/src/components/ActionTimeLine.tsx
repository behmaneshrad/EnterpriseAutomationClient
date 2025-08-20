import React from 'react';
import { Action } from '@/types/workflow';

interface ActionTimelineProps {
  actions: Action[];
}

const ActionTimeline: React.FC<ActionTimelineProps> = ({ actions }) => {
  if (!actions || actions.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500 dark:text-gray-400">
        هیچ اقدامی برای این درخواست ثبت نشده است.
      </div>
    );
  }

  return (
    <div className="relative border-r-4 border-blue-500 dark:border-blue-400 pr-8">
      {actions.map((action, index) => (
        <div key={index} className="mb-8 flex items-start last:mb-0">
          <div className="absolute w-4 h-4 bg-blue-600 dark:bg-blue-300 rounded-full mt-1.5 -right-2 border-4 border-white dark:border-gray-800" />
          
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {action.actionType} - {action.phase}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {action.timestamp}
            </span>
            
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              اقدام‌کننده: {action.performer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActionTimeline;