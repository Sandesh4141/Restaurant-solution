import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { RootStackParamList } from "../../../navigation/types/types";

import { useOrders } from "../hooks/useOrder";
import { OrderStatus } from "../types/order";

import OrderCard from "../components/OrderCard";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";

type Props = NativeStackScreenProps<RootStackParamList, "Orders">;

export default function OrdersScreen({ navigation }: Props) {
  const { orders, loading } = useOrders();

  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "All">(
    "All",
  );

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
        order.id.toLowerCase().includes(searchText.toLowerCase());

      const matchesStatus =
        selectedStatus === "All" || order.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchText, selectedStatus]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <View style={styles.logoCircle}>
          <MaterialCommunityIcons
            name="chef-hat"
            size={32}
            color="#4F46E5"
          />
        </View>
        <Text style={styles.loadingTitle}>Loading Orders</Text>
        <Text style={styles.loadingSubtitle}>
          Please wait while we fetch your orders
        </Text>
        <ActivityIndicator
          size="large"
          color="#4F46E5"
          style={{ marginTop: 24 }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.content}>
        <SearchBar value={searchText} onChangeText={setSearchText} />

        <StatusFilter
          selectedStatus={selectedStatus}
          onSelectStatus={setSelectedStatus}
        />

        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons
                name="clipboard-text-off-outline"
                size={48}
                color="#CBD5E1"
              />
              <Text style={styles.emptyText}>No orders found.</Text>
              <Text style={styles.emptySubtext}>
                Try adjusting your search or filters
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <OrderCard
              order={item}
              onPress={() =>
                navigation.navigate("OrderDetails", {
                  orderId: item.id,
                })
              }
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerCard: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 4,
    lineHeight: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  list: {
    paddingBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  loadingTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E293B",
    marginTop: 24,
    textAlign: "center",
  },
  loadingSubtitle: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 8,
    textAlign: "center",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#374151",
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 6,
    textAlign: "center",
  },
});
