import { useState, useEffect } from 'react'
import { Card } from '@/app/types'
import { CARD_COLORS } from '@/app/utils'
import { X, Edit2 } from 'lucide-react'

interface EditCardModalProps {
  isOpen: boolean
  card: Card | null
  onClose: () => void
  onEditCard: (id: string, name: string, color: string) => void
}

export default function EditCardModal({ isOpen, card, onClose, onEditCard }: EditCardModalProps) {
  const [name, setName] = useState('')
  const [color, setColor] = useState('')

  // Cuando cambie la tarjeta seleccionada, actualizamos los campos
  useEffect(() => {
    if (card) {
      setName(card.name)
      setColor(card.color)
    }
  }, [card])

  if (!isOpen || !card) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEditCard(card._id, name, color) // llamamos a la función del padre
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl">
              <Edit2 className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Editar Tarjeta</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-200 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Nombre de la tarjeta
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border text-gray-700 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Selecciona un color
            </label>
            <div className="grid grid-cols-4 gap-3">
              {CARD_COLORS.map((c) => (
                <label key={c} className="cursor-pointer group">
                  <input
                    type="radio"
                    value={c}
                    checked={color === c}
                    onChange={() => setColor(c)}
                    className="sr-only peer"
                  />
                  <div
                    className="w-16 h-16 rounded-2xl border-4 border-transparent hover:border-gray-600 peer-checked:border-gray-400 peer-checked:scale-110 transition-all duration-200 shadow-lg"
                    style={{ backgroundColor: c }}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium cursor-pointer"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
