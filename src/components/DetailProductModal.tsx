import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  DollarSign,
  Package,
  Tag,
  X,
} from "lucide-react";
import { updateSpecialPrice } from "../services/specialPrice";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  createdAt: string;
}

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  assignedUser: string | null;
  idUser: string | null;
  specialPrice: number | null;
  onUpdatePrice: (productId: string, newPrice: number) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product,
  assignedUser,
  idUser,
  specialPrice,
  onUpdatePrice,
}) => {
  const [newSpecialPrice, setNewSpecialPrice] = useState<number | null>(specialPrice);
  const [priceColor, setPriceColor] = useState<string>("text-blue-600");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setNewSpecialPrice(specialPrice);
      setIsEditing(false);
      if (specialPrice !== null) {
        updatePriceColor(specialPrice);
      }
    }
  }, [isOpen, product, specialPrice]);

  const updatePriceColor = (price: number) => {
    if (price < product.price) {
      setPriceColor("text-green-600");
    } else if (price > product.price) {
      setPriceColor("text-red-600");
    } else {
      setPriceColor("text-blue-600");
    }
  };

  const handleUpdatePrice = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleBlur = async () => {
    if (newSpecialPrice !== specialPrice) {
      const result = await Swal.fire({
        title: "Actualizar precio especial",
        text: `¿Deseas actualizar el precio especial a ${newSpecialPrice}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
      });

      if (!result.isConfirmed) {
        setNewSpecialPrice(specialPrice);
        setIsEditing(false);
        return;
      }

      try {
        await updateSpecialPrice({
          userId: idUser!,
          productId: product._id,
          specialPrice: newSpecialPrice!,
        });

        Swal.fire({
          title: "¡Actualizado!",
          text: "El precio especial se actualizó correctamente.",
          icon: "success",
        });

        onUpdatePrice(product._id, newSpecialPrice ?? specialPrice ?? 0);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `Hubo un problema al actualizar el precio. ${error}`,
          icon: "error",
        });
        setNewSpecialPrice(specialPrice);
      }
    }

    setIsEditing(false);
  };

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-t from-transparent via-black/30 to-transparent flex items-center justify-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-120 relative animate-fadeIn">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700">{product.description}</p>

          <div className="flex items-center">
            <Tag className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-gray-800">{product.category}</span>
          </div>

          <div className="flex items-center">
            <Package className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-gray-800">Stock: {product.stock}</span>
          </div>

          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-gray-800">
              Creado el: {new Date(product.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-gray-800">Precio base: ${product.price}</span>
          </div>

          {assignedUser && idUser && specialPrice !== null && (
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Precio especial para {assignedUser}:
              </h3>

              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <input
                    ref={inputRef}
                    type="number"
                    value={newSpecialPrice ?? ""}
                    onChange={(e) => setNewSpecialPrice(Number(e.target.value))}
                    onBlur={handleBlur}
                    className="border border-gray-300 rounded px-2 py-1 w-20"
                  />
                ) : (
                  <span className={`text-xl font-semibold ${priceColor}`}>
                    ${newSpecialPrice}
                  </span>
                )}

                {newSpecialPrice! < product.price && (
                  <ArrowDown className="w-5 h-5 text-green-600" />
                )}
                {newSpecialPrice! > product.price && (
                  <ArrowUp className="w-5 h-5 text-green-600" />
                )}
              </div>

              <button
                onClick={handleUpdatePrice}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Actualizar Precio Especial
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
