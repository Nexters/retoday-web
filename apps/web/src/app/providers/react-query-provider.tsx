"use client";

import React from "react";
import { ReactQueryProvider as ReactQueryProviderComponent } from "@recap/react-query";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReactQueryProviderComponent>{children}</ReactQueryProviderComponent>;
}
