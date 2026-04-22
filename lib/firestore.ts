// lib/firestore.ts
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type {
  User,
  Challenge,
  UserProgress,
  RecyclingPoint,
} from "@/types";

export async function createUserProfile(
  uid: string,
  data: Omit<User, "uid" | "createdAt" | "points">
) {
  await setDoc(doc(db, "users", uid), {
    ...data,
    uid,
    points: 0,
    createdAt: serverTimestamp(),
  });
}

export async function getUserProfile(uid: string): Promise<User | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as User) : null;
}

export async function updateUserPoints(uid: string, points: number) {
  await updateDoc(doc(db, "users", uid), { points });
}

export async function getDailyChallenges(): Promise<Challenge[]> {
  const q = query(
    collection(db, "challenges"),
    where("type", "==", "daily"),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Challenge));
}

export async function getAllChallenges(): Promise<Challenge[]> {
  const snap = await getDocs(collection(db, "challenges"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Challenge));
}

export async function getUserProgress(
  uid: string
): Promise<UserProgress | null> {
  const snap = await getDoc(doc(db, "userProgress", uid));
  return snap.exists() ? (snap.data() as UserProgress) : null;
}

export async function completeChallenge(
  uid: string,
  challengeId: string,
  pointsToAdd: number
) {
  const progressRef = doc(db, "userProgress", uid);
  const userRef = doc(db, "users", uid);

  const progressSnap = await getDoc(progressRef);
  const completedIds: string[] = progressSnap.exists()
    ? progressSnap.data().completedChallengeIds ?? []
    : [];

  if (completedIds.includes(challengeId)) return;

  await setDoc(
    progressRef,
    {
      uid,
      completedChallengeIds: [...completedIds, challengeId],
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  const userSnap = await getDoc(userRef);
  const currentPoints: number = userSnap.exists()
    ? userSnap.data().points ?? 0
    : 0;

  await updateDoc(userRef, { points: currentPoints + pointsToAdd });
}

export async function getRecyclingPoints(): Promise<RecyclingPoint[]> {
  const snap = await getDocs(collection(db, "recyclingPoints"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as RecyclingPoint));
}

export async function addRecyclingPoint(data: Omit<RecyclingPoint, "id">) {
  const ref = await addDoc(collection(db, "recyclingPoints"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}