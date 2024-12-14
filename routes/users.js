import { Router } from "express";
import { prisma } from "../index.js";
import checkPermission from "../check-permission.js";
import Permissions from "../roles.js";

const router = Router();

// get all users
router.post(
  "/users/findMany",
  checkPermission(Permissions.READ_EMPLOYEES),
  async (req, res) => {
    try {
      const users = await prisma.user.findMany(req.body || {});
      res.json(users);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
);

// get one user
router.post(
  "/users/findUnique",
  checkPermission(Permissions.READ_EMPLOYEES),
  async (req, res) => {
    try {
      const user = await prisma.user.findUnique(req.body || {});
      res.json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
);

// create user
router.post(
  "/users/create",
  [
    checkPermission(Permissions.READ_EMPLOYEES),
    checkPermission(Permissions.CREATE_EMPLOYEE),
  ],
  async (req, res) => {
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
  }
);

router.patch(
  "/users/update",
  [
    checkPermission(Permissions.READ_EMPLOYEES),
    checkPermission(Permissions.EDIT_EMPLOYEE),
  ],
  async (req, res) => {
    try {
      const user = await prisma.user.update(req.body || {});
      res.json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
);

router.delete(
  "/users/delete",
  [
    checkPermission(Permissions.READ_EMPLOYEES),
    checkPermission(Permissions.DELETE_EMPLOYEE),
  ],
  async (req, res) => {
    try {
      const user = await prisma.user.delete(req.body || {});
      res.json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
);

export default router;
