import { ArrowDown, ArrowUp, ShoppingCart } from "lucide-react";
import { Product } from "../interfaces/Product";

interface ProductCardProps {
  product: Product;
  specialPrice?: number | null;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, specialPrice }) => {
  const hasSpecialPrice =
    specialPrice !== null &&
    specialPrice !== undefined &&
    specialPrice !== product.price;
  const isSpecialPriceHigher = hasSpecialPrice && specialPrice! > product.price;

  return (
    <div className={`bg-white shadow-md rounded-2xl p-4 w-full max-w-xs transition-all hover:shadow-lg border-4 ${
        hasSpecialPrice ? (isSpecialPriceHigher ? "border-red-600" : "border-green-600") : "border-transparent"}`}
    >
      <div className="flex justify-center items-center bg-gray-100 rounded-lg p-4">
        <ShoppingCart className="text-gray-600 w-12 h-12" />
      </div>

      <h2 className="text-lg font-semibold mt-3 text-gray-900">
        {product.name}
      </h2>

      {hasSpecialPrice ? (
        <div className="mt-2">
          <p className="line-through text-gray-500 text-sm">
            Antes: ${product.price}
          </p>
          <p
            className={`text-xl font-bold flex items-center gap-1 ${
              isSpecialPriceHigher ? "text-red-600" : "text-green-600"
            }`}
          >
            Ahora: ${specialPrice}{" "}
            {isSpecialPriceHigher ? (
              <ArrowUp size={16} />
            ) : (
              <ArrowDown size={16} />
            )}
          </p>
        </div>
      ) : (
        <p className="text-xl font-bold text-black mt-1">${product.price}</p>
      )}

      <p className="text-sm text-gray-500 mt-1">{product.category}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {product.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-gradient-to-r from-[#5e60e7] via-[#9c7af2] to-[#9c7af2] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md"
          >
            {tag}
          </span>
        ))}
      </div>
      <button className="mt-4 w-full bg-black hover:bg-gray-700 text-white py-2 rounded-lg font-semibold transition-all">
        Ver más
      </button>
    </div>
  );
};

export default ProductCard;
