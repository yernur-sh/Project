// types/index.ts
import { Timestamp } from "firebase/firestore";

// ─── USER ─────────────────────────────────────────────────

export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  points: number;
  level: number;
  createdAt: Timestamp;
}

// ─── CHALLENGE ────────────────────────────────────────────

export type ChallengeType = "daily" | "weekly";
export type ChallengeCategory = "sort" | "transport" | "water" | "energy" | "other";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  type: ChallengeType;
  category: ChallengeCategory;
  iconUrl?: string;
  createdAt: Timestamp;
}

// ─── USER PROGRESS ────────────────────────────────────────

export interface UserProgress {
  uid: string;
  completedChallengeIds: string[];
  updatedAt: Timestamp;
}

// ─── RECYCLING POINT ──────────────────────────────────────

export type RecyclingCategory = "plastic" | "paper" | "glass" | "electronics" | "organic";

export interface RecyclingPoint {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  categories: RecyclingCategory[];
  workingHours?: string;
  phone?: string;
  rating?: number;
  createdAt: Timestamp;
}

// ─── AIR QUALITY ──────────────────────────────────────────

export type AQIStatus = "good" | "moderate" | "unhealthy" | "hazardous";

export interface AirQuality {
  city: string;
  aqi: number;
  status: AQIStatus;
  updatedAt: string;
}