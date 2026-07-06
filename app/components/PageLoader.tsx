"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Loading from "../loading";

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350); // 350ms of clean page transition loading animation
    return () => clearTimeout(timer);
  }, [pathname]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
