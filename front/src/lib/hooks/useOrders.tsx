import { useEffect, useState } from "react";
import axios from "axios";
import { OrderData } from "@/types/order";

const TOKEN_KEY = "authToken";

export type OrderStatus =
  | "created"
  | "collected"
  | "at_station"
  | "in_transit"
  | "delivered"
  | "cancelled";

export default function useOrders() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem(TOKEN_KEY);
      console.log(token);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Error al cargar las órdenes");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating order status:", err);
      setError("Error al actualizar el estado");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    updateOrderStatus,
  };
}
