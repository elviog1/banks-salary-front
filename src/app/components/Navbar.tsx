import { CreditCard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Salary
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/login" className='rounded-md text-sm font-medium transition duration-200 h-9 px-4 py-2 bg-blue-200 hover:bg-blue-300 text-slate-900'>
                Iniciar Sesión
              </Link>
              <Link href="/register" className='rounded-md text-sm font-medium transition duration-200 h-9 px-4 py-2 bg-slate-800 hover:bg-slate-950 text-slate-100'>
                Crear Cuenta
              </Link>
            </div>
          </div>
        </div>
      </div>
  )
}