"use client";

import React, { useState } from "react";
import { Lock, CheckCircle } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordForm() {
  const params = useParams();
  const token = params.token
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsError(false);

    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DB_URL}/users/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error al cambiar la contraseña");
      }

      setIsSuccess(true);
      setMessage(data.message || "Contraseña cambiada correctamente");
    } catch (err: any) {
      setIsError(true);
      setMessage(err.message || "Ocurrió un error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-6 rounded-xl py-6 border-0 shadow-xl bg-white/80 backdrop-blur-sm w-full max-w-md">
        <div className="grid auto-rows-min items-start gap-1.5 px-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 mx-auto">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-slate-800">
            Contraseña cambiada
          </div>
          <div className="text-sm text-slate-400">
            Ya podés iniciar sesión con tu nueva contraseña.
          </div>
        </div>

        <div className="px-6">
          <Link href="/login">
            <button className="w-full bg-slate-800 hover:bg-slate-950 text-white h-9 px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer">
              Volver al Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-6 rounded-xl py-6 border-0 shadow-xl bg-white/80 backdrop-blur-sm w-full max-w-md">
        <div className="grid auto-rows-min items-start gap-1.5 px-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mb-4 mx-auto">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-slate-800">
            Restablecer Contraseña
          </div>
          <div className="text-sm text-slate-400">
            Ingresá tu nueva contraseña a continuación
          </div>
        </div>

        <div className="px-6">
          <form onSubmit={handleSubmit} className="space-y-4 text-slate-900">
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-800"
              >
                Nueva Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs border-input placeholder:text-gray-500 disabled:opacity-50 focus-visible:ring-[3px] focus-visible:ring-ring/50"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-slate-800"
              >
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs border-input placeholder:text-gray-500 disabled:opacity-50 focus-visible:ring-[3px] focus-visible:ring-ring/50"
              />
            </div>

            {message && (
              <div
                className={`px-4 py-2 rounded text-sm ${
                  isError
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="w-full cursor-pointer bg-slate-800 hover:bg-slate-950 text-white h-9 px-4 py-2 rounded-md transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Cambiando..." : "Cambiar Contraseña"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
