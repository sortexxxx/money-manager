const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.use(authenticateToken);

// Create a new budget
router.post('/', async (req, res) => {
  const { amount, name, month, year } = req.body;
  const userId = req.user.userId;

  const budget = await prisma.budget.create({
    data: {
      amount,
      name,
      month,
      year,
      userId,
    },
  });

  res.json(budget);
});

// Get budgets for a user
router.get('/', async (req, res) => {
  const userId = req.user.userId;

  const budgets = await prisma.budget.findMany({
    where: { userId },
  });

  res.json(budgets);
});

module.exports = router;
