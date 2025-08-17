import { Card } from '@/app/types'
import { formatCurrency } from '@/app/utils'
import { CreditCard, Edit2, Trash2, Plus } from 'lucide-react'


interface CardItemProps {
  card: Card
  onEdit: (card: Card) => void
  onDelete: (cardId: string) => void
  onAddTransaction: (cardId: string) => void
}

export default function CardItem({ card, onEdit, onDelete, onAddTransaction }: CardItemProps) {

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div
        className="h-40 p-6 text-white relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 100%)` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-lg">{card.name}</p>
                <p className="text-white/80 text-sm">Tarjeta de débito</p>
              </div>
            </div>
            
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => onEdit(card)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(card._id)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-white/80 text-sm mb-1">Balance disponible</p>
            <p className="text-2xl font-bold"> {formatCurrency(card.balance)}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-gray-200">
        <button
          onClick={() => onAddTransaction(card._id)}
          className="w-full flex items-center justify-center gap-2 py-3 border-2 cursor-pointer border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Agregar Transacción
        </button>
      </div>
    </div>
  )
}
