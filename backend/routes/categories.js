const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authenticateToken = require("../middleware/auth");
const router = express.Router();

router.use(authenticateToken);

// Create a new category for the authenticated user
router.post("/", async (req, res) => {
  const { name } = req.body;
  const userId = req.user.userId;
  console.log("name", name)
  console.log("userId", userId)

  try {
    // Validate name for the authenticated user
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: name, 
        userId: userId,
      },
    });

    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }
    console.log("before")
    const category = await prisma.category.create({
      data: {
        name: name,
        userId: userId,
      },
    });
    // console.log("Data", data)
    console.log("after")

    res.json(category);
  } catch (error) {
    console.log("ERROR Category:", error)
    res.status(500).json({ error: "Failed to create category" });
  }
});

// Get all categories for the authenticated user
router.get("/", async(req, res) => {
  console.log("ENTERED");
  const userId = req.user.userId;
  console.log(userId);
  try {
    const categories = await prisma.category.findMany({
      where: { userId: userId },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

module.exports = router;
