"use client";
import { useEffect } from "react";
import { authStore } from "@/stores/useAuthStore";

export default function AuthInitializer() {
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/VerifyToken`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          authStore.getState().setIsLoggedIn(true);
        } else {
          authStore.getState().setIsLoggedIn(false);
        }
      } catch (err) {
        authStore.getState().setIsLoggedIn(false);
      }
    };

    verifyToken();
  }, []);

  return null;
}
