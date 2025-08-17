import { formatCurrency } from "@/app/utils";
import { TrendingUp, CreditCard } from "lucide-react";

interface TotalSummaryProps {
  totalBalance: number;
  cardCount: number;
}

export default function TotalSummary({
  totalBalance,
  cardCount,
}: TotalSummaryProps) {

  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white mb-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-indigo-100 text-sm font-medium mb-1">
              Balance Total
            </p>
            <p className="text-4xl font-bold">{formatCurrency(totalBalance)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
            <CreditCard className="w-8 h-8" />
          </div>
          <div className="text-right">
            <p className="text-indigo-100 text-sm font-medium mb-1">
              Tarjetas Activas
            </p>
            <p className="text-3xl font-bold">{cardCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
