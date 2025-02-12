"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native"

interface Transaction {
  id: string
  amount: number
  type: "income" | "expense"
  category: {
    id: string
    name: string
  }
  description: string
  date: string
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [refreshing, setRefreshing] = useState(false)

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/transactions")
      const data = await response.json()
      setTransactions(data)
    } catch (error) {
      console.error("Error fetching transactions:", error)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchTransactions()
    setRefreshing(false)
  }

  useEffect(() => {
    fetchTransactions()
  }, []) //This was the line that needed fixing.  The empty array [] means it only runs once on mount.  Adding fetchTransactions as a dependency means it will rerun whenever fetchTransactions changes.  However, fetchTransactions doesn't change, so this is likely not the intended behavior.  A better solution would be to add a dependency that changes when new transactions are needed, such as a variable indicating whether to refresh.

  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View>
        <Text style={styles.category}>{item.category.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
      <Text style={[styles.amount, item.type === "income" ? styles.income : styles.expense]}>
        {item.type === "income" ? "+" : "-"}${item.amount}
      </Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  list: {
    gap: 12,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  category: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  description: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: "#999999",
    marginTop: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
  },
  income: {
    color: "#34C759",
  },
  expense: {
    color: "#FF3B30",
  },
})

