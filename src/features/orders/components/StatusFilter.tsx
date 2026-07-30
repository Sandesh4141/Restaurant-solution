import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { OrderStatus } from "../types/order";

interface StatusFilterProps {
  selectedStatus: OrderStatus | "All";
  onSelectStatus: (status: OrderStatus | "All") => void;
}

type FilterKey = OrderStatus | "All";

const FILTERS: FilterKey[] = [
  "All",
  OrderStatus.Pending,
  OrderStatus.InProgress,
  OrderStatus.Completed,
];

export default function StatusFilter({
  selectedStatus,
  onSelectStatus,
}: StatusFilterProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {FILTERS.map((status) => {
          const isSelected = selectedStatus === status;

          return (
            <Pressable
              key={status}
              style={[
                styles.chip,
                isSelected && styles.selectedChip,
              ]}
              onPress={() => onSelectStatus(status)}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.selectedChipText,
                ]}
              >
                {status}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    minHeight: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedChip: {
    backgroundColor: "#4F46E5",
    borderColor: "#4F46E5",
  },
  chipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },
  selectedChipText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
