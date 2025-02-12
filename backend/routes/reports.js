const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authenticateToken = require("../middleware/auth");
const router = express.Router();

router.use(authenticateToken);

// Get monthly financial report
router.get("/monthly", async (req, res) => {
  const userId = req.user.userId;
  const { month, year } = req.query;

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      AND: [
        { createdAt: { gte: new Date(year, month - 1, 1) } },
        { createdAt: { lt: new Date(year, month, 1) } },
      ],
    },
  });

  const totalIncome = transactions
    .filter((t) => t.type === "EARN")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "SPEND")
    .reduce((sum, t) => sum + t.amount, 0);

  const leftBalance = totalIncome - totalExpense;

  if (leftBalance < 0) {
    return res.status(400).json({ error: "You have spent more than you have earned" });
  }
  res.json({ totalIncome, totalExpense, leftBalance });
});

router.get("/category-wise-expenses", async (req, res) => {
  const userId = req.user.userId;

  try {
    // Group transactions by categoryId and sum the amount
    const expenses = await prisma.transaction.groupBy({
      by: ["categoryName"],
      where: {
        userId,
        type: "SPEND",
      },
      _sum: {
        amount: true,
      },
    });

    // Fetch the category details for each grouped result
    const categoryWiseExpenses = await Promise.all(
      expenses.map(async (expense) => {
        const category = await prisma.category.findUnique({
          where: { name: expense.categoryName },
        });
        return {
          categoryId: expense.categoryName,
          totalAmount: expense._sum.amount,
        };
      })
    );

    res.json(categoryWiseExpenses);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the expenses" });
  }
});

module.exports = router;
