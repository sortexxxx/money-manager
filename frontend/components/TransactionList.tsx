import { View, Text, StyleSheet, FlatList } from "react-native"

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
  // description: string;
}

export type Transactions = Transaction[]

interface TransactionListProps {
  transactions: Transactions;
}

export default function TransactionList({ transactions }: TransactionListProps) {
  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View>
        <Text style={styles.category}>{item.category.name}</Text>
        {/* <Text style={styles.description}>{item.description}</Text> */}
        <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
      <Text style={[styles.amount, item.type === "EARN" ? styles.income : styles.expense]}>
        {item.type === "EARN" ? "+" : "-"}₹{item.amount}
      </Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        // keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
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
    flex: 1,
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

