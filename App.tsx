import { View } from "react-native";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { OrdersProvider } from "./src/features/orders/context/orderContext";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      
      <OrdersProvider>
        <AppNavigator />;
      </OrdersProvider>
    </View>
  );
}
