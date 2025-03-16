import { useState } from "react";
import SearchUser from "./SearchUser";
import { SpecialPrice } from "../interfaces/SpecialPrices";
import { getSpecialPricesByUser } from "../services/specialPrice";
import { useUser } from "../store/UserContext";

interface SearchUserSpecialPriceModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

const SearchUserSpecialPriceModal: React.FC<SearchUserSpecialPriceModalProps> = ({isOpen,onClose}) => {

  const [formData, setFormData] = useState({userId: ""});

  const { setUserId } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_specialPrices, setSpecialPrices] = useState<SpecialPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUserSelect = (userId: string) => {
    setFormData({ ...formData, userId });
    setSpecialPrices([]);
    setUserId(userId);
    setError("");
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userId) {
        setError("Selecciona un usuario antes de buscar.");
        return;
    }

      setLoading(true);
      setError("");

      try {
        const prices = await getSpecialPricesByUser(formData.userId);
        const pricesArray = prices.specialPrices || [];
        const formattedSpecialPrices: SpecialPrice = {
            _id: "some_unique_id",
            userId: formData.userId,
            specialPrices: pricesArray,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setSpecialPrices([formattedSpecialPrices]);
        if (formattedSpecialPrices.specialPrices.length > 0) {
            onClose();
        } else {
            setError("No se encontraron precios especiales para este usuario.");
        }
    } catch (err) {
        console.log(err);
        setError("Error al obtener los precios especiales.");
    } finally {
        setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-t from-transparent via-black/30 to-transparent flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-120 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold text-center mb-4">
          Buscar precios especiales
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Cliente
            </label>
            <SearchUser onSelectUser={handleUserSelect} />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Consultando..." : "Buscar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchUserSpecialPriceModal;