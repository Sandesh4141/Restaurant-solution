import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../navigation/types/types";
import { VALID_CREDENTIALS } from "../constants/credentials";
type Props = NativeStackScreenProps<RootStackParamList, "Login">;


const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const isValid =
      email.trim() === VALID_CREDENTIALS.email &&
      password === VALID_CREDENTIALS.password;

    if (!isValid) {
      Alert.alert("Login Failed", "Invalid email or password.");
      return;
    }

    navigation.replace("Orders");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Restaurant Owner</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.demoContainer}>
          <Text style={styles.demoTitle}>Demo Credentials</Text>
          <Text style={styles.demoText}>
            Email: {VALID_CREDENTIALS.email}
          </Text>
          <Text style={styles.demoText}>
            Password: {VALID_CREDENTIALS.password}
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F5F5F5",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 24,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#666",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: "#FFF",
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  demoContainer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  demoTitle: {
    fontWeight: "600",
    marginBottom: 8,
  },
  demoText: {
    color: "#666",
    fontSize: 14,
  },
});