import { useEffect, useState } from "react";
import { searchProducts } from "../services/product";
import { Product } from "../interfaces/Product";

const useSearchProducts = (query:string) => {

    const[results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if(!query){
            setResults([]);
            return;
        }

        const fetchProducts = async() => {
            setLoading(true);
            const products = await searchProducts(query);
            setResults(products);
            setLoading(false);
        };

        const debounce = setTimeout(fetchProducts, 300);
        return () => clearTimeout(debounce);
    }, [query]);

    return {results, loading}
}

export default useSearchProducts;