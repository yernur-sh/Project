// hooks/usePoints.ts
"use client";

import { useState, useEffect } from "react";
import { getUserProgress } from "@/lib/firestore";
import type { UserProgress } from "@/types";

export function usePoints(uid: string | undefined) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }
    getUserProgress(uid).then((data) => {
      setProgress(data);
      setLoading(false);
    });
  }, [uid]);

  return { progress, loading };
}