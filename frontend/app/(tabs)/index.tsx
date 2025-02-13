import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import TransactionForm from "../../components/TransactionForm";
import TransactionList from "../../components/TransactionList";
import ExpenseSummary from "../../components/ExpenseSummary";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginPage from "./login";
import { Stack } from "expo-router";
import MainPage from "./mainpage";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const expenseData = [
    {
      name: "Food",
      amount: 300,
      color: "#FF6384",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Transport",
      amount: 150,
      color: "#36A2EB",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Shopping",
      amount: 200,
      color: "#FFCE56",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const token = AsyncStorage.getItem('token');

  

  return(
    !token ? (
    <>
      <LoginPage />
    </>
  ) : (
    <>
      <MainPage />
    </>
  ));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "#007AFF",
    textAlign: "center",
    marginTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  chartContainer: {
    backgroundColor: "#ffffff",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
});
