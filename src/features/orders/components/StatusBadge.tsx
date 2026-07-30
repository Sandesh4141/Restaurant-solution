import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { OrderStatus } from "../types/order";

interface StatusBadgeProps {
  status: OrderStatus;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const badgeStyle = [
    styles.badge,
    status === OrderStatus.Pending && styles.pending,
    status === OrderStatus.InProgress && styles.inProgress,
    status === OrderStatus.Completed && styles.completed,
  ];

  const textStyle = [
    styles.text,
    status === OrderStatus.Pending && styles.pendingText,
    status === OrderStatus.InProgress && styles.inProgressText,
    status === OrderStatus.Completed && styles.completedText,
  ];

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },

  text: {
    fontSize: 12,
    fontWeight: "600",
  },

  pending: {
    backgroundColor: "#FEF3C7",
  },

  pendingText: {
    color: "#B45309",
  },

  inProgress: {
    backgroundColor: "#DBEAFE",
  },

  inProgressText: {
    color: "#1D4ED8",
  },

  completed: {
    backgroundColor: "#DCFCE7",
  },

  completedText: {
    color: "#15803D",
  },
});