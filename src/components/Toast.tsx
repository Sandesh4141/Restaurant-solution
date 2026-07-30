import React from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";

const toastConfig = {
  success: ({ text1 }: any) => (
    <View
      style={{
        borderRadius: 8,
        backgroundColor: "#22C55E",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderCurve: "continuous",
        minHeight: 44,
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 14 }}>
        {text1}
      </Text>
    </View>
  ),
};

export { Toast, toastConfig };
