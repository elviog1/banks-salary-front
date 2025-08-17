import { CreditCard } from 'lucide-react'
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Salary
              </span>
            </div>
            <p className="text-gray-600 text-sm">© 2024 My Salary. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
  )
}
