import React from "react";
import ActionTimeLine from "@/components/ActionTimeLine";

const exampleActions = [
  {
    phase: "ثبت درخواست",
    performer: "شکیلا مهری",
    actionType: "ایجاد",
    timestamp: "1404-05-25 10:00:00",
  },
  {
    phase: "تائید",
    performer: "شکیلا مهری",
    actionType: "تائید",
    timestamp: "1404-05-25 11:00:00",
  },
];
const RequestDetailsPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">تاریخچه اقدامات</h1>
      <ActionTimeLine actions={exampleActions} />
    </div>
  );
};

export default RequestDetailsPage;
