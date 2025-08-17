import { ArrowLeft } from "lucide-react";
import React from "react";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          href="/login"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al login
        </Link>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
