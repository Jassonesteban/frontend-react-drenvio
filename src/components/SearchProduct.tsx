import { useEffect, useRef, useState } from "react";
import { Product } from "../interfaces/Product";
import useSearchProducts from "../hooks/useSearchProducts";

interface SearchProductProps {
  onSelectProduct: (productId: string) => void;
}

const SearchProduct: React.FC<SearchProductProps> = ({ onSelectProduct }) => {
  const [query, setQuery] = useState("");
  const { results } = useSearchProducts(query);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSelectProduct = (product: Product) => {
    setQuery(product.name);
    onSelectProduct(product._id);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={searchRef}>
      <input
        type="text"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Buscar producto..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
      />

      {showDropdown && results.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto z-50">
          {results.map((product: Product) => (
            <li
              key={product._id}
              className="p-3 hover:bg-blue-500 hover:text-white cursor-pointer"
              onClick={() => handleSelectProduct(product)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchProduct;
