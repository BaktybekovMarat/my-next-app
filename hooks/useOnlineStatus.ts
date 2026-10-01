"use client";

import { useEffect, useState } from "react";

export default function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isConnected, setIsConnected] = useState("");
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsConnected("");
    };
    const handleOffline = () => {
      setIsOnline(false);
      setIsConnected("No internet connection");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isConnected;
}
