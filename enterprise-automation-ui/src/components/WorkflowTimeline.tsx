import React from "react";


// تعریف ساختار هر مرحله از گردش کار
interface WorkflowStep {
  stepName: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface WorkflowTimelineProps {
  steps: WorkflowStep[];
}

const WorkflowTimeline: React.FC<WorkflowTimelineProps> = ({ steps }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                step.isCompleted
                  ? "bg-green-500"
                  : step.isCurrent
                  ? "bg-blue-500"
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
            >
              {step.isCompleted ? "✓" : index + 1}
            </div>
            {/* نام مرحله */}
            <span
              className={`mr-4 ml-2 text-sm font-medium ${
                step.isCompleted
                  ? "text-green-600"
                  : step.isCurrent
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {step.stepName}
            </span>
          </div>
          
          {/* خط اتصال بین مراحل */}
          {index < steps.length - 1 && (
            <div className="flex-grow border-t-2 border-gray-300 mx-4 md:border-l-2 md:h-12 w-0.5 md:w-auto"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default WorkflowTimeline;
