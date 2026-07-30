import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({
  value,
  onChangeText,
}: SearchBarProps) {
  return (
    <View style={styles.wrapper}>
      <MaterialCommunityIcons
        name="magnify"
        size={20}
        color="#9CA3AF"
        style={styles.icon}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search by customer or order ID"
        placeholderTextColor="#9CA3AF"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1E293B",
  },
});
