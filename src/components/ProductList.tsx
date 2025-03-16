import { useEffect, useState } from "react";
import { getProducts } from "../services/product";
import { Product } from "../interfaces/Product";
import ProductCard from "./ProductCard";
import { getSpecialPricesByUser } from "../services/specialPrice";
import { useUser } from "../store/UserContext";
import { getUserId } from "../services/user";

const ProductList: React.FC = () => {
  const { userId } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const[userName, setUserName] = useState<string | null>(null);
  const [specialPrices, setSpecialPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchSpecialPrices = async () => {
      try {

        const user = await getUserId(userId);
        if(user){
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

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        {userName ? `Hola, ${userName}, tienes productos con precios especiales:` : "Nuestros Productos"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            specialPrice={specialPrices[product._id] || null} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
