import { Card, HistoryFilter, Transaction } from '@/app/types'
import { formatCurrency } from '@/app/utils'
import { Calendar, Filter, TrendingUp, TrendingDown } from 'lucide-react'


interface TransactionHistoryProps {
  transactions: Transaction[]
  cards: Card[]
  historyFilter: HistoryFilter
  selectedDate: string
  onFilterChange: (filter: HistoryFilter) => void
  onDateChange: (date: string) => void
  onBack: () => void
}

export default function TransactionHistory({
  transactions,
  cards,
  historyFilter,
  selectedDate,
  onFilterChange,
  onDateChange,
  onBack
}: TransactionHistoryProps) {
  const getFilteredTransactions = () => {
    if (historyFilter === 'daily') {
      return transactions.filter(t => t.date.startsWith(selectedDate))
    } else {
      const selectedMonth = selectedDate.substring(0, 7)
      return transactions.filter(t => t.date.startsWith(selectedMonth))
    }
  }

  const filteredTransactions = getFilteredTransactions()
  const periodTotal = filteredTransactions.reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Historial de Transacciones
              </h1>
              <p className="text-gray-500 mt-1">Revisa tus movimientos por período</p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
          >
            Volver al Dashboard
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 text-gray-500">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={historyFilter}
                  onChange={(e) => onFilterChange(e.target.value as HistoryFilter)}
                  className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="daily">Vista Diaria</option>
                  <option value="monthly">Vista Mensual</option>
                </select>
              </div>
              
              <input
                type={historyFilter === 'daily' ? 'date' : 'month'}
                value={selectedDate}
                onChange={(e) => onDateChange(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">Total del período:</span>
              <span className={`font-bold text-lg ${periodTotal >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(periodTotal)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay transacciones</h3>
              <p className="text-gray-500">No se encontraron movimientos para este período</p>
            </div>
          ) : (
            filteredTransactions.map(transaction => {
              const card = cards.find(c => c._id === transaction.card._id)
              return (
                <div key={transaction._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-200">
                  <div className="flex items-center justify-between">
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
                        <p className="font-semibold text-gray-900 text-lg mb-1">{transaction.description}</p>
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
                      <p className={`text-2xl font-bold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {transaction.amount > 0 ? 'Ingreso' : 'Gasto'}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
