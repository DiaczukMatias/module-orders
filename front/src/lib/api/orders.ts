import { OrderData } from "@/types/order";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const createOrder = async (orderData: OrderData, token: string) => {
  try {
    const response = await axios.post(`${API_URL}/orders `, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error to create order");
    throw error;
  }
};
