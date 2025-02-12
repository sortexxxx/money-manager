const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
// const transactionRoutes = require('./routes/transactions');
const budgetRoutes = require('./routes/budgets');
const reportRoutes = require('./routes/reports');
const categorytRoutes = require('./routes/categories');

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
// app.use('/transactions', transactionRoutes);
app.use('/budgets', budgetRoutes);
app.use('/reports', reportRoutes);
app.use('/categories', categorytRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
