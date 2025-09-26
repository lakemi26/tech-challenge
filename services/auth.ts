"use client";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export type RegisterInput = {
  fullName: string;
  email: string;
  password: string;
};

export async function registerUser({
  fullName,
  email,
  password,
}: RegisterInput): Promise<User> {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  if (auth.currentUser && fullName) {
    await updateProfile(auth.currentUser, { displayName: fullName });
  }

  await setDoc(doc(db, "users", cred.user.uid), {
    uid: cred.user.uid,
    fullName,
    email,
    createdAt: serverTimestamp(),
  });

  return cred.user;
}
