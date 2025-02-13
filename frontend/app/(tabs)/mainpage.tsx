import { useEffect, useState } from "react";
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
import axios from "axios";
import { getQualifiedRouteComponent } from "expo-router/build/useScreens";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Transaction {
  id: number;
  amount: number;
  type: "EARN" | "SPEND";
  categoryId: number;
  category: {
    id: number;
    name: string;
    
  };
  userId: number;
  user: {
    id: number;
    name: string;
  };
  createdAt: string;
}
export type Transactions = Transaction[]

export default function MainPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState<Transactions>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        const response = await axios.get("http://192.168.29.184:3000/categories", {
          headers: {
            Authorization: token,
          },
          
        });
        console.log("categories", response.data);
        setCategories(response.data);
      } catch (error) {
        console.error(error);
        }

      };
      const fetchTransactions = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          console.log(token);
          const response = await axios.get("http://192.168.29.184:3000/transactions", {
            headers: {
              Authorization: token,
            },
            
          });
          console.log("Transactions", response.data);
          setTransactions(response.data);
        } catch (error) {
          console.error(error);
          }
  
        };
      fetchCategories();
      fetchTransactions()
    }, []);
  

    const expenseData = transactions.map((transaction: Transaction) => ({
      id: transaction.id,
      name: transaction.category.name,
      amount: transaction.amount,
      color: transaction.type === "EARN" ? "#34C759" : `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    }))

  // const expenseData = [
  //   transa

  //   // {
  //   //   name: "Food",
  //   //   amount: 300,
  //   //   color: "#FF6384",
  //   //   legendFontColor: "#7F7F7F",
  //   //   legendFontSize: 15,
  //   // },
  //   // {
  //   //   name: "Transport",
  //   //   amount: 150,
  //   //   color: "#36A2EB",
  //   //   legendFontColor: "#7F7F7F",
  //   //   legendFontSize: 15,
  //   // },
  //   // {
  //   //   name: "Shopping",
  //   //   amount: 200,
  //   //   color: "#FFCE56",
  //   //   legendFontColor: "#7F7F7F",
  //   //   legendFontSize: 15,
  //   // },
  // ];

  

  return(
    
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.title}>Expense Tracker</Text>
            <Pressable style={styles.addButton} onPress={() => setShowForm(true)}>
              <Text style={styles.buttonText}>Add Expense</Text>
            </Pressable>
          </View>

          <ExpenseSummary transactions={transactions} />

          <View style={styles.chartContainer}>
            <Text style={styles.sectionTitle}>Expense Breakdown</Text>
            <PieChart
              data={expenseData}
              width={350}
              height={220}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Fixed issue here
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>

          {/* Fix for nested VirtualizedList issue */}
          <TransactionList transactions={transactions} />

          {showForm && (
            <TransactionForm
              visible={showForm}
              onClose={() => setShowForm(false)}
              categories={categories}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    // marginBottom: 24,
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
    justifyContent: "space-around",
    alignItems: "center",
    padding: 16,
    gap: 13,
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
    // margin: 16,
    // padding: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
});
