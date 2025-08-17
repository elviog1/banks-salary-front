import { useEffect, useState } from "react";

export interface Transaction {
  _id: string;
  amount: number; // positivo para ingreso, negativo para gasto
  description: string;
  date: string;
  card: string; // ID de la card
}

interface CreateTransactionInput {
  amount: number;
  description: string;
  date: string;
}

export function useTransactions(cardId?: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);
  
  useEffect(() => {
    if (token) { 
      fetchTransactions();
    }
  }, [token]);
  
  
  /* const fetchTransactions = async () => {
    if (!token || !cardId) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/transactions/${cardId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          },
          });
          
          if (!res.ok) {
            throw new Error("Error al obtener transacciones");
      }

      const data: Transaction[] = await res.json();
      setTransactions(data);
      
      // Calcular balance sumando amounts
      const total = data.reduce((sum, tx) => sum + tx.amount, 0);
      setBalance(total);

    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }; */

  const fetchTransactions = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      // 👇 Si hay cardId → endpoint por tarjeta, si no → endpoint user/me
      const url = `${process.env.NEXT_PUBLIC_DB_URL}/transactions/me`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Error al obtener transacciones");
      }

      const data: Transaction[] = await res.json();
      setTransactions(data);

      // Calcular balance sumando amounts
      const total = data.reduce((sum, tx) => sum + tx.amount, 0);
      setBalance(total);
      return data
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      return null; // 👈 para que no quede undefined
    } finally {
      setIsLoading(false);
    }
  };

  const createTransaction = async (input: CreateTransactionInput) => {
    if (!token) throw new Error("No autenticado");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/transactions/${cardId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Error al crear transacción");
      }

      const newTx: Transaction = await res.json();

      setTransactions((prev) => [...prev, newTx]);
      setBalance((prev) => prev + newTx.amount);
      fetchTransactions();
      return newTx;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    }
  };

  return { transactions, balance, isLoading, error, fetchTransactions,createTransaction };
}
