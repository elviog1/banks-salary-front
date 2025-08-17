import ResetPasswordForm from '@/app/components/forms/ResetPasswordForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function ResetPasswordPage() {
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
        <ResetPasswordForm />
      </div>
      </main>
  )
}
