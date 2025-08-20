import React from "react";

const RequestSuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-4">
        درخواست شما با موفقیت ثبت شد!
      </h1>
      <p className="text-gray-600">
        شما می‌توانید وضعیت درخواست خود را در صفحه داشبور پیگیری کنید.
      </p>
    </div>
  );
};

export default RequestSuccessPage;
