"use client";
import { Alert } from "antd";

export default function ErrorAlert({ ...props }) {
  return <Alert className="alert" {...props} />;
}
