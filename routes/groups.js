import { Router } from "express";
import { prisma } from "../index.js";

const router = Router();

// get all groups
router.post("/groups/findMany", async (req, res) => {
  try {
    const groups = await prisma.course.findMany(req.body || {});
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// get one group
router.post("/groups/findUnique", async (req, res) => {
  try {
    const group = await prisma.course.findUnique(req.body || {});
    res.json(group);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// create group
router.post("/groups/create", async (req, res) => {
  const { name, capacity, tables, chairs } = req.body;
  if (!name || !capacity || !tables || !chairs) {
    return res
      .status(400)
      .json({ message: "All fields are required", uploaded: req.body });
  }
  try {
    const group = await prisma.course.create({
      data: {
        name,
        capacity: Number(capacity),
        tables: Number(tables),
        chairs: Number(chairs),
      },
    });
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/groups/update", async (req, res) => {
  try {
    const group = await prisma.course.update(req.body || {});
    res.json(group);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/groups/delete", async (req, res) => {
  try {
    const group = await prisma.course.delete(req.body || {});
    res.json(group);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
