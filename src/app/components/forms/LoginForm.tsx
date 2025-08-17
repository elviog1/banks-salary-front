"use client";
import { useLogin } from "@/app/hooks/useLogin";
import { CreditCard, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex flex-col gap-6 rounded-xl py-6 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <div className="grid auto-rows-min gridrows-[auto_auto] items-start gap-1.5 px-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mb-4 mx-auto">
          <CreditCard className="h-6 w-6 text-white" />
        </div>
        <div className="text-2xl font-bold text-slate-800">Iniciar Sesión</div>
        <div className="text-sm text-slate-400">
          Ingresa a tu cuenta de My Salary
        </div>
      </div>
      <div className="px-6">
        <form onSubmit={handleSubmit} className="space-y-4 text-slate-900">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm leading-none font-medium text-slate-800"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              disabled={isLoading}
              className="file:text-foreground placeholder:text-gray-500 selection:bg-primary selection:text-primary-foreground dark:bg-gray-200/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="flex items-center gap-2 text-sm leading-none font-medium text-slate-800"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                required
                disabled={isLoading}
                className="file:text-foreground placeholder:text-gray-500 selection:bg-primary selection:text-primary-foreground dark:bg-gray-200/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
              />
              <button
                type="button"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div>
              <div className="text-red-700 font-bold">{error}</div>
            </div>
          )}

          <button
            type="submit"
            className="w-full cursor-pointer bg-slate-800 hover:bg-slate-950 text-slate-100 h-9 px-4 py-2 rounded-md duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Crear cuenta
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
