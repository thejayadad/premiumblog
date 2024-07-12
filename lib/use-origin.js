'use client'

import { useState, useEffect } from "react";

export const useOrigin = () => {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    const getOrigin = () => {
      if (typeof window !== "undefined") {
        setOrigin(window.location.origin);
      }
    };

    getOrigin();
  }, []);

  return origin;
};
