"use client";

import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export type RegisterInput = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginInput = {
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

export async function loginUser({ email, password }: LoginInput) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

export function authErrorMessage(err: unknown): string {
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case "auth/invalid-email":
        return "Email inválido";
      case "auth/user-disabled":
        return "Usuário desativado.";
      case "auth/user-not-found":
        return "Usuário não encontrado";
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Credenciais inválidas. Verifique e tente novamente.";
      case "auth/too-many-requests":
        return "Muitas tentativas. Tente novamente mais tarde.";
      default:
        return "Erro de autenticação. Tente novamente.";
    }
  }

  if (err instanceof Error) {
    return err.message || "Não foi possível entrar. Tente novamente.";
  }

  return "Não foi possível entrar. Tente novamente.";
}
