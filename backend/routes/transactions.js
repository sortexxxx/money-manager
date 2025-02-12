const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.use(authenticateToken);

// Create a new transaction
router.post('/', async (req, res) => {
  const { amount, type, categoryName } = req.body;
  const userId = req.user.userId;

  // Validate amount
  if (amount <= 0 || amount==null) {
    return res.status(400).json({ error: 'Amount must be greater than 0' });
  }

  // Validate type
  if ((type !== 'EARN' && type !== 'SPEND') || type == null) {
    return res.status(400).json({ error: 'Invalid transaction type' });
  }

  // Validate categoryId
  const category = await prisma.category.findUnique({
    where: { name: categoryName },
  });

  if (!category) {
    return res.status(400).json({ error: 'Invalid category name' });
  }

  const transaction = await prisma.transaction.create({
    data: {
      amount,
      type,
      categoryName,
      userId,
    },
  });

  res.json(transaction);
});

// Get all transactions for a user
router.get('/', async (req, res) => {
  const userId = req.user.userId;

  const transactions = await prisma.transaction.findMany({
    where: { userId },
    include: { category: true },
  });

  res.json(transactions);
});

// Update a transaction
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { amount, type, categoryName } = req.body;

  const userId = req.user.userId;
  // Validate amount
  if (amount <= 0 || amount==null) {
    return res.status(400).json({ error: 'Amount must be greater than 0' });
  }

  // Validate type
  if ((type !== 'EARN' && type !== 'SPEND') || type == null) {
    return res.status(400).json({ error: 'Invalid transaction type' });
  }

  // Validate categoryId
  const category = await prisma.category.findUnique({
    where: { name: categoryName },
  });

  if (!category) {
    return res.status(400).json({ error: 'Invalid category Name, Add your category first' });
  }

  const transaction = await prisma.transaction.updateMany({
    where: { id: parseInt(id), userId },
    data: { amount, type, categoryName },
  });

  if (transaction.count === 0) {
    return res.status(404).json({ error: 'Transaction not found or not authorized' });
  }

  res.json(transaction);
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const transaction = await prisma.transaction.deleteMany({
    where: { id: parseInt(id), userId },
  });

  if (transaction.count === 0) {
    return res.status(404).json({ error: 'Transaction not found or not authorized' });
  }

  res.json({ message: 'Transaction deleted' });
});

module.exports = router;
