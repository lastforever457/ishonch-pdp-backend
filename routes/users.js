import { Router } from "express";
import { prisma } from "../index.js";

const router = Router();

// get all users
router.post("/users/findMany", async (req, res) => {
  try {
    const users = await prisma.user.findMany(req.body || {});
    res.json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// get one user
router.post("/users/findUnique", async (req, res) => {
  try {
    const user = await prisma.user.findUnique(req.body || {});
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// create user
router.post("/users/create", async (req, res) => {
  const { lastName, firstName, phone, birthday, gender, role } = req.body;
  if (!lastName || !firstName || !phone || !birthday || !gender || !role) {
    return res
      .status(400)
      .json({ message: "All fields are required", uploaded: req.body });
  }
  try {
    const user = await prisma.user.create({
      data: {
        lastName,
        firstName,
        phone,
        birthday: new Date(birthday).toISOString(),
        gender,
        role,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.patch("/users/update", async (req, res) => {
  try {
    const user = await prisma.user.update(req.body || {});
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/users/delete", async (req, res) => {
  try {
    const user = await prisma.user.delete(req.body || {});
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
