import AsyncStorage from "@react-native-async-storage/async-storage";

import ordersData from "../data/dummydata.json";

import { Order } from "../types/order";

const STORAGE_KEY = "@restaurant_orders";

export async function loadOrders(): Promise<Order[]> {
  try {
    const storedOrders = await AsyncStorage.getItem(STORAGE_KEY);

    if (storedOrders) {
      return JSON.parse(storedOrders);
    }

    await saveOrders(ordersData as Order[]);

    return ordersData as Order[];
  } catch (error) {
    console.error("Failed to load orders", error);
    return ordersData as Order[];
  }
}

export async function saveOrders(orders: Order[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error("Failed to save orders", error);
  }
}

export async function resetOrders() {
  await AsyncStorage.removeItem("@restaurant_orders");
}