"use client";

import React from "react";
import { WorkflowStep } from "@/types/workflow";

interface WorkflowTimelineProps {
  steps: WorkflowStep[];
}

const getStepClass = (step: WorkflowStep) => {
  if (step.status === "approved") return "bg-green-500 text-white";
  if (step.status === "rejected") return "bg-red-500 text-white";
  if (step.status === "pending") return "bg-blue-500 text-white animate-pulse";
  return "bg-gray-300 text-gray-700";
};

const getLineClass = (step: WorkflowStep) => {
  if (step.status === "approved") return "bg-green-500";
  if (step.status === "pending" || step.status === "rejected")
    return "bg-gray-300";
  return "bg-gray-300";
};

const WorkflowTimeline: React.FC<WorkflowTimelineProps> = ({ steps }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start md:items-center space-y-8 md:space-y-0 md:space-x-8 rtl:space-x-reverse">
      {steps.map((step, index) => (
        <div
          key={step.stepId}
          className="flex-1 flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg transition-all duration-300 ${getStepClass(
                step
              )}`}
            >
              {index + 1}
            </div>
            <div className="mt-2 text-center">
              <p className="font-semibold text-gray-800">{step.stepName}</p>
              <p className="text-sm text-gray-500">
                {step.status === "approved"
                  ? "تائید شده"
                  : step.status === "rejected"
                  ? "رد شده"
                  : "در انتظار"}
              </p>
              <p className="text-xs text-gray-400">نقش: {step.approverRole}</p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`hidden md:block w-20h-1 transition-all duration-300 ${getLineClass(
                step
              )}`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WorkflowTimeline;
