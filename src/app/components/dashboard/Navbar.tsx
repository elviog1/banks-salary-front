"use client";
import { CreditCard, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Navbar() {
  const userName = localStorage.getItem("userName");
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    router.push("/");
  };
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Salary</h1>
              <p className="text-sm text-gray-600">Bienvenido {userName}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium px-4 py-2 cursor-pointer"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
