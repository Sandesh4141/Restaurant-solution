import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../features/auth/screens/LoginScreen";

import { RootStackParamList } from "./types/types";
import OrdersScreen from "../features/orders/screens/OrdersScreen";
import OrdersDetailsScreen from "../features/orders/screens/OrdersDetailsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerBackTitle: "Back",
          animation: "slide_from_right",
          headerShown : false
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Login",

          }}
        />

        <Stack.Screen
          name="Orders"
          component={OrdersScreen}
          options={{
            title: "Orders",
          }}
        />

        <Stack.Screen
          name="OrderDetails"
          component={OrdersDetailsScreen}
          options={{
            title: "Order Details",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
