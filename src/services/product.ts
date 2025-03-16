import { Product } from "../interfaces/Product";

const urlAPI = "http://localhost:5000/api/products";

export const getProducts = async():Promise<Product[]> => {
    const response = await fetch(urlAPI);
    if(!response.ok) throw new Error("Error al obtener los productos");
    return response.json();
}

export const searchProducts = async(query:string):Promise<Product[]> => {

    if(!query) return [];

    try {
        const response = await fetch(`${urlAPI}/search?query=${query}`);
        if(!response.ok) throw new Error("Error en la busqueda");

        return await response.json();
    } catch (error) {
        console.log("Hubo un error", error)
        return []
    }
}

export const getProductById = async (productId: string): Promise<Product | null> => {
    try {
        const response = await fetch(`${urlAPI}/${productId}`);
        
        if (!response.ok) {
            throw new Error("No se encontró el producto");
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        return null;
    }
}; 
