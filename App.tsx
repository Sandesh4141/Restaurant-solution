import ToastProvider from "react-native-toast-message";
import { View } from "react-native";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { OrdersProvider } from "./src/features/orders/context/orderContext";
import { Toast, toastConfig } from "./src/components/Toast";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function App() {

  //  useEffect(() => {
  //   async function reset() {
  //     await AsyncStorage.removeItem("@restaurant_orders");
  //     console.log("Orders reset");
  //   }

  //   reset();
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <OrdersProvider>
        <AppNavigator />
      </OrdersProvider>
      <Toast config={toastConfig} />
    </View>
  );
}
