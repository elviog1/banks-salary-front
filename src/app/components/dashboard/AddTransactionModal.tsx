import { X, Plus } from 'lucide-react'
import { FormEvent } from 'react'

interface AddTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export default function AddTransactionModal({ isOpen, onClose, onSubmit }: AddTransactionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-xl">
              <Plus className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Nueva Transacción</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-6 text-gray-700">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Descripción
            </label>
            <input
              type="text"
              name="description"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Ej: Compra en supermercado"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Monto
            </label>
            <input
              type="number"
              name="amount"
              step="0.01"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Ej: -50.00 (gasto) o 100.00 (ingreso)"
            />
            <p className="text-sm text-gray-500 mt-2">
              💡 Usa números positivos para ingresos y negativos para gastos
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Fecha
            </label>
            <input
              type="date"
              name="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            >
              Agregar Transacción
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
