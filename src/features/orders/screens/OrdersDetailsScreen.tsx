import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import { RootStackParamList } from "../../../navigation/types/types";
import { useOrders } from "../hooks/useOrder";
import { OrderStatus } from "../types/order";
import StatusBadge from "../components/StatusBadge";

type Props = NativeStackScreenProps<RootStackParamList, "OrderDetails">;

export default function OrdersDetailsScreen({
  navigation,
  route,
}: Props) {
  const { orderId } = route.params;
  const { orders, loading, getOrderById, updateOrderStatus } = useOrders();

  const [updating, setUpdating] = useState(false);

  const order = useMemo(() => getOrderById(orderId), [orders, orderId]);

  useEffect(() => {
    if (!order) {
      navigation.setOptions({ title: "Order Details" });
    }
  }, [order, navigation]);

  const handleUpdateStatus = async () => {
    if (!order) {
      return;
    }

    setUpdating(true);

    const nextLabel = nextStatusLabel(order.status);

    try {
      await updateOrderStatus(order.id);
      Toast.show({
        type: "success",
        text1: `Order #${order.id} marked as ${nextLabel}`,
        visibilityTime: 2500,
      });
    } finally {
      setUpdating(false);
    }
  };

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
        <Text style={styles.loadingTitle}>Loading Order</Text>
        <Text style={styles.loadingSubtitle}>
          Please wait while we fetch your order
        </Text>
        <ActivityIndicator
          size="large"
          color="#4F46E5"
          style={{ marginTop: 24 }}
        />
      </SafeAreaView>
    );
  }

  if (!order) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <MaterialCommunityIcons
          name="clipboard-text-off-outline"
          size={48}
          color="#CBD5E1"
        />
        <Text style={styles.emptyText}>Order not found.</Text>
        <Text style={styles.emptySubtext}>
          The order you are looking for does not exist.
        </Text>
      </SafeAreaView>
    );
  }

  const itemCount = order.items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const canUpdate = order.status !== OrderStatus.Completed;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          android_ripple={{ color: "#E5E7EB" }}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={22}
            color="#1E293B"
          />
        </Pressable>
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={styles.backButton} />
      </View>

      <View style={styles.content}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.orderId}>#{order.id}</Text>
            <StatusBadge status={order.status} />
          </View>

          <Text style={styles.customerName}>{order.customerName}</Text>

          <View style={styles.summaryRow}>
            <View style={styles.summaryRowItem}>
              <Text style={styles.summaryLabel}>Date</Text>
              <Text style={styles.summaryValue}>
                {new Date(order.createdAt).toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.summaryRowItem}>
              <Text style={styles.summaryLabel}>Items</Text>
              <Text style={styles.summaryValue}>
                {itemCount} item{itemCount === 1 ? "" : "s"}
              </Text>
            </View>

            <View style={styles.summaryRowItem}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.summaryValue}>
                ₹{order.totalAmount.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Order Items</Text>

        <View style={styles.itemsCard}>
          <FlatList
            data={order.items}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.itemDivider} />}
            renderItem={({ item }) => {
              const lineTotal = item.price * item.quantity;

              return (
                <View style={styles.itemRow}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemQty}>
                      x{item.quantity}
                    </Text>
                  </View>

                  <View style={styles.itemPriceBlock}>
                    <Text style={styles.itemPrice}>
                      ₹{item.price.toFixed(2)}
                    </Text>
                    <Text style={styles.itemLineTotal}>
                      ₹{lineTotal.toFixed(2)}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>
              ₹{order.totalAmount.toFixed(2)}
            </Text>
          </View>

          {canUpdate && (
            <Pressable
              style={[
                styles.actionButton,
                updating && styles.actionButtonDisabled,
              ]}
              onPress={handleUpdateStatus}
              disabled={updating}
              android_ripple={{ color: "#C7D2FE" }}
            >
              {updating ? (
                <ActivityIndicator
                  size="small"
                  color="#FFFFFF"
                />
              ) : (
                <View style={styles.actionButtonContent}>
                  <MaterialCommunityIcons
                    name="arrow-right-bold"
                    size={18}
                    color="#FFFFFF"
                  />
                  <Text style={styles.actionButtonText}>
                    Mark as {nextStatusLabel(order.status)}
                  </Text>
                </View>
              )}
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

function nextStatusLabel(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Pending:
      return "In Progress";
    case OrderStatus.InProgress:
      return "Completed";
    default:
      return "Completed";
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  orderId: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4F46E5",
    letterSpacing: 0.3,
  },
  customerName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryRowItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "500",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 12,
  },
  itemsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 2,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  itemDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
  },
  itemQty: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  itemPriceBlock: {
    alignItems: "flex-end",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },
  itemLineTotal: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 2,
  },
  footer: {
    marginTop: "auto",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 2,
  },
  totalLabel: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  actionButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  actionButtonDisabled: {
    opacity: 0.7,
  },
  actionButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
