// hooks/useLogin.ts
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function useLogin() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.message)) {
          setError(data.message.join(", "));
        } else {
          setError(data.message || "Error al iniciar sesión");
        }
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.userName);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al loguearse:", error);
      setError("Error de servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
}
