"use client";
import React from "react";
import { TableProvider } from "./context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <TableProvider>{children}</TableProvider>;
}
