"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/dashboard/Navbar";
import Header from "../components/dashboard/Header";
import { Card, HistoryFilter, ViewMode } from "../types";
import TotalSummary from "../components/dashboard/TotalSummary";
import { useCards } from "../hooks/useCards";
import CardGrid from "../components/dashboard/CardGrid";
import AddCardModal from "../components/dashboard/AddCardModal";
import EditCardModal from "../components/dashboard/EditCardModal";
import AddTransactionModal from "../components/dashboard/AddTransactionModal";
import { useTransactions } from "../hooks/useTransaction";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import TransactionHistory from "../components/dashboard/TransactionHistory";
export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [showAddCard, setShowAddCard] = useState(false);
  const { cards, deleteCard, createCard,updateCard,updateCardBalance, totalBalance } = useCards();
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const { transactions, createTransaction } = useTransactions(selectedCard);
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>('daily')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const handleDeleteCard = async (cardId: string) => {
    try {
      await deleteCard(cardId);
      // Si quieres forzar recarga desde backend:
      // await fetchCards();
    } catch (error) {
      if(error instanceof Error){
        alert(error.message || "Error al eliminar la tarjeta");
      }
    }
  };

  const handleAddCard = async (name: string, color: string) => {
    try {
      await createCard({ name, color });
      setShowAddCard(false);
    } catch (error) {
      if(error instanceof Error){
        alert(error.message || "Error al crear la tarjeta");
      }
    }
  };

  const handleEditCard = async (cardId: string, name: string, color: string) => {
  try {
    await updateCard(cardId,{ name, color });
    setEditingCard(null);
  } catch (error) {
    if(error instanceof Error){
      alert(error.message || "Error al actualizar la tarjeta");
    }
  }
};

const handleAddTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCard) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const description = formData.get("description") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const date = formData.get("date") as string;

   try {
    const newTx = await createTransaction({ description, amount, date });

    // Actualizar solo el balance de la card localmente
    updateCardBalance(selectedCard, newTx.amount);

    setShowAddTransaction(false);
    form.reset();
    //fetchTransactions(); // refrescar lista
  } catch (err) {
    if(err instanceof Error){
      alert(err.message || "Error al crear la transacción");
    }
  }
  };


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (viewMode === 'history') {
    return (
      <TransactionHistory
        transactions={transactions}
        cards={cards}
        historyFilter={historyFilter}
        selectedDate={selectedDate}
        onFilterChange={setHistoryFilter}
        onDateChange={setSelectedDate}
        onBack={() => setViewMode('dashboard')}
      />
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-300">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onAddCard={() => setShowAddCard(true)}
        />

        <TotalSummary totalBalance={totalBalance} cardCount={cards.length} />

        <CardGrid
          cards={cards}
          onEditCard={setEditingCard}
          onDeleteCard={handleDeleteCard}
          onAddTransaction={(cardId) => {
            setSelectedCard(cardId);
            setShowAddTransaction(true);
          }}
        />

        <RecentTransactions
          transactions={transactions}
          cards={cards}
        />

        <AddCardModal
          isOpen={showAddCard}
          onClose={() => setShowAddCard(false)}
          onSubmit={handleAddCard}
        />

        <EditCardModal
          isOpen={!!editingCard}
          card={editingCard}
          onClose={() => setEditingCard(null)}
          onEditCard={handleEditCard}
        />

        <AddTransactionModal
          isOpen={showAddTransaction}
          onClose={() => {
            setShowAddTransaction(false)
            setSelectedCard('')
          }}
          onSubmit={handleAddTransaction}
        />
      </div>
    </main>
  );
}
