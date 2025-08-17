export interface Transaction {
  _id: string
  card: string
  description: string
  amount: number
  date: string
  //type: 'income' | 'expense'
}

export interface Card {
  _id: string
  name: string
  color: string
  balance: number
}

export type ViewMode = 'dashboard' | 'history'
export type HistoryFilter = 'daily' | 'monthly'
