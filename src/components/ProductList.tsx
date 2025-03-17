import { useEffect, useState } from "react";
import { useProducts } from "../store/ProductContext";
import { useUser } from "../store/UserContext";
import { getUserId } from "../services/user";
import ProductCard from "./ProductCard";
import ProductDetailModal from "./DetailProductModal";
import { getSpecialPricesByUser } from "../services/specialPrice";
import { Product } from "../interfaces/Product";

const ProductList: React.FC = () => {
  const { products } = useProducts(); // Usa el contexto de productos
  const { userId } = useUser();
  const [userName, setUserName] = useState<string | null>(null);
  const [specialPrices, setSpecialPrices] = useState<{ [key: string]: number }>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchSpecialPrices = async () => {
      try {
        const user = await getUserId(userId);
        if (user) {
          setUserName(user.name);
        }
        const specialPriceData = await getSpecialPricesByUser(userId);
        const priceMap: { [key: string]: number } = {};

        specialPriceData.specialPrices.forEach(({ productId, specialPrice }: { productId: string; specialPrice: number }) => {
          priceMap[productId] = specialPrice;
        });

        setSpecialPrices(priceMap);
      } catch (error) {
        console.error("Error al obtener precios especiales", error);
      }
    };

    fetchSpecialPrices();
  }, [userId]);

  const handleViewMore = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSpecialPriceUpdate = (productId: string, newPrice: number) => {
    setSpecialPrices((prevPrices) => ({
      ...prevPrices,
      [productId]: newPrice,
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        {userName ? `Hola, ${userName}, tienes productos con precios especiales:` : "Nuestros Productos"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard
            key={product._id}
            product={product}
            specialPrice={specialPrices[product._id] || null}
            onViewMore={() => handleViewMore(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
          assignedUser={userName}
          idUser={userId}
          onUpdatePrice={handleSpecialPriceUpdate}
          specialPrice={specialPrices[selectedProduct._id] || null}
        />
      )}
    </div>
  );
};

export default ProductList;
