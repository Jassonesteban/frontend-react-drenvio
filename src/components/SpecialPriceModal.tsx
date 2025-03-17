import { useState } from "react";
import SearchUser from "./SearchUser";
import { createSpecialPrice } from "../services/specialPrice";
import { useProducts } from "../store/ProductContext";

interface SpecialPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SpecialPriceModal: React.FC<SpecialPriceModalProps> = ({ isOpen, onClose }) => {
  const { products } = useProducts();
  const [formData, setFormData] = useState({
    userId: "",
    productId: "",
    specialPrice: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUserSelect = (userId: string) => {
    setFormData({ ...formData, userId });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createSpecialPrice({
        userId: formData.userId,
        productId: formData.productId,
        specialPrice: Number(formData.specialPrice),
      });
      alert("Precio especial agregado exitosamente!");
      onClose();
    } catch (error) {
      setError("Hubo un error");
      console.log(error);
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
          Agregar Precio Especial
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-3">Usuario</label>
            <SearchUser onSelectUser={handleUserSelect} />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-3">Producto</label>
            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="w-full p-2 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              required
            >
              <option value="">Seleccionar producto</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-3">Precio especial</label>
            <input
              type="number"
              name="specialPrice"
              value={formData.specialPrice}
              onChange={handleChange}
              className="w-full p-2 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              required
              placeholder="Ingresar precio"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Agregar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SpecialPriceModal;
