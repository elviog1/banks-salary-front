import { CARD_COLORS } from "@/app/utils";
import { X, CreditCard } from "lucide-react";
import { useState } from "react";

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, color: string) => void;
}

export default function AddCardModal({
  isOpen,
  onClose,
  onSubmit,
}: AddCardModalProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(CARD_COLORS[0]);
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    if (!name || !color) return; // validación simple
    onSubmit(name, color);
    setName("")
    setColor(CARD_COLORS[0])
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl">
              <CreditCard className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Nueva Tarjeta</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Nombre de la tarjeta
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-700"
              placeholder="Ej: Tarjeta Principal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Selecciona un color
            </label>
            <div className="grid grid-cols-4 gap-3">
              {CARD_COLORS.map((currentColor) => (
                <label key={currentColor} className="cursor-pointer group">
                  <input
                    type="radio"
                    name="color"
                    value={currentColor}
                    required
                    className="sr-only peer"
                    checked={color === currentColor}
                    onChange={() => setColor(currentColor)}
                  />
                  <div
                    className="w-16 h-16 rounded-2xl border-4 border-transparent hover:border-gray-200 peer-checked:border-gray-400 peer-checked:scale-110 transition-all duration-200 shadow-lg"
                    style={{ backgroundColor: currentColor }}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 cursor-pointer border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-300 hover:border-gray-300 transition-all duration-200 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 cursor-pointer py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            >
              Crear Tarjeta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
