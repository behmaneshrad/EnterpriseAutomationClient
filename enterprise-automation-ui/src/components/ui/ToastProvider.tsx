"use client";

import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

const ToastProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <Toaster position="bottom-right" />;
};

export default ToastProvider;
