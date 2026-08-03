"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import AiRecapEmptyPage from "@/pages/ai-recap/ui/AiRecapEmptyPage";

export default function Error({ reset }: { reset: () => void }) {
  const searchParams = useSearchParams();
  const query = searchParams?.toString() ?? "";
  const failedQuery = useRef(query);

  useEffect(() => {
    if (failedQuery.current === query) return;

    failedQuery.current = query;
    reset();
  }, [query, reset]);

  return <AiRecapEmptyPage />;
}
