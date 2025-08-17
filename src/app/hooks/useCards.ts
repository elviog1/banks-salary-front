import { useCallback, useEffect, useState } from "react";

export interface Card {
  _id: string;
  name: string;
  color: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  balance: number;
}

interface CreateCardInput {
  name: string;
  color: string;
}

export function useCards() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const total = cards.reduce((sum, card) => {
      const balance = Number(card.balance) || 0; // conversión segura
      return sum + balance;
    }, 0);
    setTotalBalance(total);
  }, [cards]);

  // Obtener token al montar
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const fetchCards = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/cards`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener las tarjetas");
      }

      const data = await response.json();
      setCards(data);
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Cargar cards cuando haya token
  useEffect(() => {
    if (token) {
      fetchCards();
    } else {
      setIsLoading(false);
    }
  }, [fetchCards,token]);

  const createCard = async ({ name, color }: CreateCardInput) => {
    if (!token) throw new Error("No autenticado");

    const response = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, color }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "Error al crear la tarjeta");
    }

    const newCard = await response.json();
    setCards((prev) => [...prev, newCard]);
    return newCard;
  };

  const deleteCard = async (cardId: string) => {
    if (!token) throw new Error("No autenticado");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "Error al eliminar la tarjeta");
    }

    // Eliminar del estado local sin recargar todo
    setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
  };

  const updateCard = async (
    cardId: string,
    updates: Partial<CreateCardInput>
  ) => {
    if (!token) throw new Error("No autenticado");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DB_URL}/cards/${cardId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updates),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Error al actualizar la tarjeta");
      }

      const updatedCard = await response.json();

      // Actualizar estado local sin tener que recargar todo
      setCards((prevCards) =>
        prevCards.map((card) =>
          card._id === cardId ? { ...card, ...updatedCard } : card
        )
      );

      return updatedCard;
    } catch (error: any) {
      setError(error.message || "Error desconocido");
      throw error;
    }
  };

  const updateCardBalance = (cardId: string, amount: number) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card._id === cardId
          ? { ...card, balance: (card.balance || 0) + amount }
          : card
      )
    );
  };

  return {
    cards,
    isLoading,
    error,
    createCard,
    deleteCard,
    fetchCards,
    updateCard,
    updateCardBalance,
    totalBalance,
  };
}
