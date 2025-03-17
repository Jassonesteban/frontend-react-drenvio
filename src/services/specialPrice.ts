import { SpecialPrice } from "../interfaces/SpecialPrices";

const urlAPI = "http://localhost:5000/api/special-prices";

export const createSpecialPrice = async (data: {
  userId: string;
  productId: string;
  specialPrice: number;
}) => {
  try {
    const response = await fetch(`${urlAPI}/add-special-price`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al agregar el precio especial");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const getSpecialPricesByUser = async (
  userId: string
): Promise<SpecialPrice> => {
  const response = await fetch(`${urlAPI}/${userId}`);
  if (!response.ok) throw new Error("Error al obtener los precios especiales");
  return response.json();
}; 

export const updateSpecialPrice = async( data: {userId: string; productId: string;specialPrice: number;}) => {

  try {
    const response = await fetch(`${urlAPI}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el precio especial");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }

}
