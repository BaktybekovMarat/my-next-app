"use client";

import checkErrorStatus from "@/utils/checkErrorStatus";
import { useEffect, useState } from "react";

export default function useCreateGuestSession() {
  const [error, setError] = useState("");
  useEffect(() => {
    const getSession = async () => {
      setError("");
      try {
        const response = await fetch("/api/guestSession");
        if (!response.ok) {
          const checkResponseStatus = checkErrorStatus(
            response.status,
            "useCreateSession",
          );
          setError(checkResponseStatus);
        }
        const result = await response.json();
        console.log(result.success);
      } catch (error) {
        console.error(error);
        setError("Failed to create guest session");
      }
    };
    getSession();
  }, []);

  return error;
}
