import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native"
export interface Transaction {
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

interface ExpenseSummaryProps {
  transactions: Transactions;
}

export default function ExpenseSummary({ transactions }: ExpenseSummaryProps) {
  // Sample data - replace with your actual data from backend
  const income = transactions
    .filter(transaction => transaction.type === 'EARN')
    .reduce((total, transaction) => total + transaction.amount, 0);
  const expenses = transactions
    .filter(transaction => transaction.type === 'SPEND')
    .reduce((total, transaction) => total + transaction.amount, 0);
  const balance = income - expenses;
  
  const summary = {
    income: income,
    expenses: expenses,
    balance: balance,
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
    paddingTop: 16,
    paddingBottom: 16,
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

