import { ViewMode } from '@/app/types'
import { Plus, Calendar, Wallet } from 'lucide-react'

interface HeaderProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  onAddCard: () => void
}

export default function Header({ viewMode, onViewModeChange, onAddCard }: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
          <Wallet className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Gestor de Gastos
          </h1>
          <p className="text-gray-500 mt-1">Administra tus tarjetas y transacciones</p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={() => onViewModeChange(viewMode === 'dashboard' ? 'history' : 'dashboard')}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm cursor-pointer"
        >
          <Calendar className="w-5 h-5" />
          {viewMode === 'dashboard' ? 'Historial' : 'Dashboard'}
        </button>
        
        {viewMode === 'dashboard' && (
          <button
            onClick={onAddCard}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Nueva Tarjeta
          </button>
        )}
      </div>
    </div>
  )
}
