"use client";
import { Spin } from "antd";

export default function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <Spin />
      <p>Loading...</p>
    </div>
  );
}
