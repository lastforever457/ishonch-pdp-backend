import { Router } from "express";
import { prisma } from "../index.js";

const router = Router();

router.post("/permissions/findMany", async (req, res) => {
  try {
    const permissions = await prisma.permission.findMany(req.body || {});
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/permissions/findUnique", async (req, res) => {
  try {
    const permission = await prisma.permission.findUnique(req.body || {});
    res.json(permission);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/permissions/create", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ message: "Name is required", uploaded: req.body });
  }
  try {
    const permission = await prisma.permission.create({
      data: {
        name,
      },
    });
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/permissions/update", async (req, res) => {
  try {
    const permission = await prisma.permission.update(req.body || {});
    res.json(permission);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/permissions/delete", async (req, res) => {
  try {
    const permission = await prisma.permission.delete(req.body || {});
    res.json(permission);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
