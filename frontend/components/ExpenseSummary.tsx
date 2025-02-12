import { View, Text, StyleSheet } from "react-native"

export default function ExpenseSummary() {
  // Sample data - replace with your actual data from backend
  const summary = {
    income: 5000,
    expenses: 2500,
    balance: 2500,
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Income</Text>
        <Text style={[styles.amount, styles.income]}>₹{summary.income}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Expenses</Text>
        <Text style={[styles.amount, styles.expense]}>₹{summary.expenses}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Balance</Text>
        <Text style={[styles.amount, styles.balance]}>₹{summary.balance}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  income: {
    color: "#34C759",
  },
  expense: {
    color: "#FF3B30",
  },
  balance: {
    color: "#007AFF",
  },
})

