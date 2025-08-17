import { useEffect, useState } from "react";

export function useTotalBalance() {
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotal = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No autenticado");
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/cards/total-balance`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al obtener el balance total");

        const data = await res.json();

        setTotalBalance(data.totalBalance ?? 0);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotal();
  }, []);

  return { totalBalance, isLoading, error };
}
