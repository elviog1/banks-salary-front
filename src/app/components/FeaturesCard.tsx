import { LucideIcon } from "lucide-react";
import React from "react";

type FeaturesCardProps = {
  icon: LucideIcon;
  colorIcon?: string;
};


export default function FeaturesCard({icon:Icon,colorIcon}: FeaturesCardProps) {
  return (
    <div className="text-card-foreground flex flex-col gap-6 rounded-xl py-6 border-0 shadow-lg bg-white/60 backdrop-blur-sm">
      <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
          {Icon && <Icon className={`h-6 w-6 ${colorIcon}`} />}

        </div>
        <div className="leading-none font-semibold text-black">Gestión de Tarjetas</div>
        <div className="text-slate-500 text-sm">
          Organiza todas tus tarjetas bancarias en un solo lugar y mantén el
          control de cada una.
        </div>
      </div>
    </div>
  );
}
