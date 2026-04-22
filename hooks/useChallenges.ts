// hooks/useChallenges.ts
"use client";

import { useState, useEffect } from "react";
import { getDailyChallenges } from "@/lib/firestore";
import type { Challenge } from "@/types";

export function useChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDailyChallenges().then((data) => {
      setChallenges(data);
      setLoading(false);
    });
  }, []);

  return { challenges, loading };
}