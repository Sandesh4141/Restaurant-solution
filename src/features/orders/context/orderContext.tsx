import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Order, OrderStatus } from "../types/order";
import { loadOrders, saveOrders } from "../services/orderService";

interface OrdersContextType {
  orders: Order[];
  loading: boolean;

  getOrderById: (id: string) => Order | undefined;

  updateOrderStatus: (id: string) => Promise<void>;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

interface OrdersProviderProps {
  children: React.ReactNode;
}

export function OrdersProvider({ children }: OrdersProviderProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeOrders();
  }, []);

  const initializeOrders = async () => {
    try {
      const data = await loadOrders();
      setOrders(data);
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = useCallback(
    (id: string) => {
      return orders.find((order) => order.id === id);
    },
    [orders],
  );

  const updateOrderStatus = useCallback(
    async (id: string) => {
      const updatedOrders = orders.map((order) => {
        if (order.id !== id) {
          return order;
        }

        let nextStatus = order.status;

        switch (order.status) {
          case OrderStatus.Pending:
            nextStatus = OrderStatus.InProgress;
            break;

          case OrderStatus.InProgress:
            nextStatus = OrderStatus.Completed;
            break;

          case OrderStatus.Completed:
            nextStatus = OrderStatus.Completed;
            break;
        }

        return {
          ...order,
          status: nextStatus,
        };
      });

      setOrders(updatedOrders);

      await saveOrders(updatedOrders);
    },
    [orders],
  );

  const value = useMemo(
    () => ({
      orders,
      loading,
      getOrderById,
      updateOrderStatus,
    }),
    [orders, loading, getOrderById, updateOrderStatus],
  );

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

export function useOrdersContext() {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error("useOrdersContext must be used within OrdersProvider");
  }

  return context;
}
