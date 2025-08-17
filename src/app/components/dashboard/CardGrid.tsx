import { Card } from '@/app/types'
import React from 'react'
import CardItem from './CardItem'

interface CardGridProps {
  cards: Card[]
  onEditCard: (card: Card) => void
  onDeleteCard: (cardId: string) => void
  onAddTransaction: (cardId: string) => void
}

export default function CardGrid({ cards, onEditCard, onDeleteCard, onAddTransaction }: CardGridProps) {
   if (cards.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">💳</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No tienes tarjetas</h3>
        <p className="text-gray-500">Crea tu primera tarjeta para comenzar a gestionar tus gastos</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map(card => (
        <CardItem
          key={card._id}
          card={card}
          onEdit={onEditCard}
          onDelete={onDeleteCard}
          onAddTransaction={onAddTransaction}
        />
      ))}
    </div>
  )
}
