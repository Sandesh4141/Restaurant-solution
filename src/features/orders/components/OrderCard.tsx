import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Order } from "../types/order";
import StatusBadge from "./StatusBadge";

interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

export default function OrderCard({
  order,
  onPress,
}: OrderCardProps) {
  const itemCount = order.items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      android_ripple={{ color: "#E5E7EB" }}
    >
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={styles.orderId}>#{order.id}</Text>
          <Text style={styles.customerName}>
            {order.customerName}
          </Text>
        </View>
        <StatusBadge status={order.status} />
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text style={styles.amountLabel}>Total</Text>
          <Text style={styles.amount}>
            ₹{order.totalAmount.toFixed(2)}
          </Text>
        </View>
        <View style={styles.footerRight}>
          <Text style={styles.itemCount}>{itemCount} items</Text>
          <Text style={styles.date}>
            {new Date(order.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleBlock: {
    flex: 1,
    marginRight: 12,
  },
  orderId: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4F46E5",
    letterSpacing: 0.3,
  },
  customerName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  footerLeft: {},
  amountLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
    marginBottom: 2,
  },
  amount: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  footerRight: {
    alignItems: "flex-end",
  },
  itemCount: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4F46E5",
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: "#94A3B8",
  },
});
