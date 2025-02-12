"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, StyleSheet, Pressable, SafeAreaView, StatusBar } from "react-native"
import { useRouter } from "expo-router"
import { PieChart } from "react-native-chart-kit"
import  TransactionForm  from "../../components/TransactionForm"
import  TransactionList  from "../../components/TransactionList"
import  ExpenseSummary  from "../../components/ExpenseSummary"
import { useAuth } from "../../hooks/useAuth"
import { apiRequest } from "../../utils/api"

export default function HomePage() {
  const { isAuthenticated, logout } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [expenseData, setExpenseData] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      fetchExpenseData()
    } else {
      router.replace("/login")
    }
  }, [isAuthenticated, router]) // Added router to dependencies

  const fetchExpenseData = async () => {
    try {
      const data = await apiRequest("/reports/expenses")
      // Transform data for pie chart
      const chartData = data.map((item: any) => ({
        name: item.category,
        amount: item.total,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      }))
      setExpenseData(chartData)
    } catch (error) {
      console.error("Error fetching expense data:", error)
    }
  }

  const getRandomColor = () => {
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const handleTransactionSuccess = () => {
    // Refresh data after new transaction
    fetchExpenseData()
  }

  const handleLogout = () => {
    logout()
    router.replace("/login")
  }

  if (!isAuthenticated) {
    return null // The useEffect will redirect to login page
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Expense Tracker</Text>
          <View style={styles.headerButtons}>
            <Pressable style={styles.addButton} onPress={() => setShowForm(true)}>
              <Text style={styles.buttonText}>Add Transaction</Text>
            </Pressable>
            <Pressable style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </Pressable>
          </View>
        </View>

        <ExpenseSummary />

        {expenseData.length > 0 && (
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
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>
        )}

        <TransactionList />

        {showForm && (
          <TransactionForm visible={showForm} onClose={() => setShowForm(false)} onSuccess={handleTransactionSuccess} />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerButtons: {
    flexDirection: "row",
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
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
})

