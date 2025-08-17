"use client"

import React, { useState } from "react"
import { Mail, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    setIsError(false)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/users/request-password-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || "Error al enviar el correo")
      }

      setIsSuccess(true)
      setMessage("Correo enviado correctamente. Revisá tu bandeja de entrada.")
    } catch (err) {
      if(err instanceof Error){
        setIsError(true)
        setMessage(err.message || "Ocurrió un error inesperado")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div>
        <div className="flex flex-col gap-6 rounded-xl py-6 border-0 shadow-xl bg-white/80 backdrop-blur-sm w-full max-w-md">
          <div className="grid auto-rows-min items-start gap-1.5 px-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 mx-auto">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-slate-800">Email Enviado</div>
            <div className="text-sm text-slate-400">
              Revisá tu bandeja de entrada y seguí las instrucciones
            </div>
          </div>

          <div className="px-6 text-center text-slate-700 text-sm">
            Hemos enviado el enlace a <span className="font-medium">{email}</span>.
            <p className="text-xs text-gray-500 mt-2">
              Si no lo encontrás, revisá tu carpeta de spam o correo no deseado.
            </p>
          </div>

          <div className="px-6">
            <Link href="/login">
              <button className="w-full bg-slate-800 hover:bg-slate-950 text-white h-9 px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer">
                Volver al Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-6 rounded-xl py-6 border-0 shadow-xl bg-white/80 backdrop-blur-sm w-full max-w-md">
        <div className="grid auto-rows-min items-start gap-1.5 px-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mb-4 mx-auto">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-slate-800">¿Olvidaste tu contraseña?</div>
          <div className="text-sm text-slate-400">
            Te enviaremos un enlace para restablecerla
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

            {message && (
              <div
                className={`px-4 py-2 rounded text-sm ${
                  isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="w-full cursor-pointer bg-slate-800 hover:bg-slate-950 text-slate-100 h-9 px-4 py-2 rounded-md duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar Instrucciones"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            ¿Recordaste tu contraseña?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
