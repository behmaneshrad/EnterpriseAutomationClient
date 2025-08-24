"use client"

import React from "react";
import { Action } from "@/types/workflow";

interface ActionTimelineProps {
  actions: Action[];
}

// نمایش تاریخ و زمان
const formatDateTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return (
    date.toLocaleDateString("fa-IR", options) +
    " - " +
    date.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })
  );
};

// تابع برای تعیین آیکون و رنگ براساس نوع اقدام
const getActionIcon = (actionType: string) => {
  switch (actionType.toLocaleLowerCase()) {
    case "approve":
      return { icon: "✅", color: "bg-green-500" };
    case "reject":
      return { icon: "❌", color: "bg-red-500" };
    case "submit":
      return { icon: "📥", color: "bg-blue-500" };
    case "start":
      return { icon: "▶️", color: "bg-yellow-500" };
    default:
      return { icon: "📝", color: "bg-gray-500" };
  }
};

const ActionTimeline: React.FC<ActionTimelineProps> = ({ actions }) => {
  if (!actions || actions.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500 dark:text-gray-400">
        هیچ اقدامی برای این درخواست ثبت نشده است.
      </div>
    );
  }

   return (
    <div className="relative border-r-4 border-gray-200 pr-8">
      {actions.map((action, index) => {
        const { icon, color } = getActionIcon(action.actionType);

        return (
          <div key={index} className="mb-8 flex items-start last:mb-0">
            <div className={`absolute w-8 h-8 flex items-center justify-center rounded-full text-white text-xl mt-0.5 -right-4 border-4 border-white ${color}`}>
              {icon}
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {action.actionType} - {action.phase}
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDateTime(action.timestamp)}
              </span>
              
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                اقدام‌کننده: {action.performer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActionTimeline;
