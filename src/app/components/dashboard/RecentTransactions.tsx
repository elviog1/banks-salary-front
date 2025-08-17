import { Card, Transaction } from '@/app/types'
import { formatCurrency } from '@/app/utils'
import { TrendingUp, TrendingDown, Receipt } from 'lucide-react'


interface RecentTransactionsProps {
  transactions: Transaction[]
  cards: Card[]
}

export default function RecentTransactions({ transactions, cards }: RecentTransactionsProps) {

  if (transactions.length === 0) {
    return null
  }

  const recentTransactions = transactions.slice(-5).reverse()

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-100 rounded-xl">
          <Receipt className="w-6 h-6 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Transacciones Recientes</h2>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {recentTransactions.map((transaction, index) => {
          const card = cards.find(c => c._id === transaction.card._id)
          return (
            <div 
              key={transaction._id} 
              className={`flex items-center justify-between p-6 ${
                index !== recentTransactions.length - 1 ? 'border-b border-gray-100' : ''
              } hover:bg-gray-50 transition-colors duration-200`}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${card?.color}20` }}
                >
                  {transaction.amount >= 0 ? (
                    <TrendingUp className="w-6 h-6" style={{ color: card?.color }} />
                  ) : (
                    <TrendingDown className="w-6 h-6" style={{ color: card?.color }} />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{transaction.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: card?.color }}
                    />
                    <span>{card?.name}</span>
                    <span>•</span>
                    <span>{new Date(transaction.date).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`text-lg font-bold ${
                  transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatCurrency(transaction.amount)}
                </p>
                <p className="text-sm text-gray-500">
                  {/* {transaction.type === 'income' ? 'Ingreso' : 'Gasto'} */}
                  {transaction.amount > 0 ? 'Ingreso' : 'Gasto'}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
