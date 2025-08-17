import { ArrowRight, CreditCard } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function HeroSection() {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-6">
        <CreditCard className="h-12 w-12 text-blue-600" />
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        Controla tus{" "}
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Finanzas
        </span>
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        Gestiona tus tarjetas bancarias, registra ingresos y gastos, y mantén un
        control total de tu dinero con nuestra plataforma intuitiva y segura.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/register"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-10 rounded-md px-6 inline-flex items-center justify-center gap-2 text-sm font-medium duration-200 transition"
        >
          Comenzar Gratis
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
        <Link href="/login" className="h-10 rounded-md px-6 inline-flex items-center justify-center gap-2 text-black bg-gradient-to-r from-blue-300 to-slate-300 hover:from-blue-400 hover:to-slate-400 text-sm font-medium duration-200 transition">Ya tengo cuenta</Link>
      </div>
    </div>
  );
}
