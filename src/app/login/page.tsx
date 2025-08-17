import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import LoginForm from "../components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 font-bold">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Link>
        <LoginForm />
      </div>
    </main>
  );
}
