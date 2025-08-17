import React from "react";
import FeaturesCard from "./FeaturesCard";
import {
  ArrowRight,
  BarChart3,
  CreditCard,
  Shield,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
const cardInfo = [
  {
    icon: CreditCard,
    title: "Gestión de Tarjetas",
    description:
      "Organiza todas tus tarjetas bancarias en un solo lugar y mantén el control de cada una.",
    color: "text-blue-600",
  },
  {
    icon: TrendingUp,
    title: "Ingresos y Gastos",
    description:
      "Registra tanto ingresos como gastos para tener una visión completa de tu flujo de dinero.",
    color: "text-green-600",
  },
  {
    icon: BarChart3,
    title: "Historial Detallado",
    description:
      "Consulta tu historial mensual con resúmenes detallados y estadísticas de tus movimientos.",
    color: "text-purple-600",
  },
];

export default function Features() {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {cardInfo.map((card) => (
          <FeaturesCard
            key={card.title}
            icon={card.icon}
            colorIcon={card.color}
          />
        ))}

      </div>
        <div className="text-center">
          <div className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white max-w-4xl mx-auto">
            <div className="p-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">
                ¿Listo para tomar el control?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Únete a miles de usuarios que ya gestionan sus finanzas de
                manera inteligente
              </p>
              <Link
                href="/register"
                className="bg-slate-100 text-blue-600 hover:bg-gray-300 transition duration-200 inline-flex items-center justify-center gap-2 text-sm font-medium rounded-md px-6 h-10"
              >
                Crear mi cuenta gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
    </>
  );
}
