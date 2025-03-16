import { User } from "../interfaces/User";

const urlAPI = "http://localhost:5000/api/user";

export const searchUsers = async(query:string):Promise<User[]> => {

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

export const getUserId = async(userId:string):Promise<User | null> => {
    try {
        const response = await fetch(`${urlAPI}/${userId}`);
        
        if (!response.ok) {
            throw new Error("No se encontró el usuario");
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        return null;
    }
}