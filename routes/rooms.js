import { Router } from "express";
import { prisma } from "../index.js";

const router = Router();

// get all rooms
router.post("/rooms/findMany", async (req, res) => {
  try {
    const rooms = await prisma.room.findMany(req.body || {});
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// get one room
router.post("/rooms/findUnique", async (req, res) => {
  try {
    const room = await prisma.room.findUnique(req.body || {});
    res.json(room);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// create room
router.post("/rooms/create", async (req, res) => {
  const { name, capacity, tables, chairs } = req.body;
  if (!name || !capacity || !tables || !chairs) {
    return res
      .status(400)
      .json({ message: "All fields are required", uploaded: req.body });
  }
  try {
    const room = await prisma.room.create({
      data: {
        name,
        capacity: Number(capacity),
        tables: Number(tables),
        chairs: Number(chairs),
      },
    });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/rooms/update", async (req, res) => {
  try {
    const room = await prisma.room.update(req.body || {});
    res.json(room);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/rooms/delete", async (req, res) => {
  try {
    const room = await prisma.room.delete(req.body || {});
    res.json(room);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
