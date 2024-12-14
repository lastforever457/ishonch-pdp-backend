import { Router } from "express";
import { prisma } from "../index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Roles from "../roles.js";

dotenv.config();

const router = Router();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
if (!ACCESS_TOKEN_SECRET) {
  throw new Error('"secretOrPrivateKey must have a value"');
}

const generateAccessToken = (user) => {
  const userPermissions = Roles[user.role] || [];
  return jwt.sign(
    { id: user.id, role: user.role, permissions: userPermissions },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30d" }
  );
};

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const accessToken = generateAccessToken(user);
  res.json({ accessToken });
});

router.post("/auth/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, birthday, phone } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !gender ||
      !birthday ||
      !phone
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", uploaded: req.body });
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        gender,
        phone,
        birthday: new Date(birthday).toISOString(),
        status: "WAITING",
        role: "STUDENT",
      },
    });
    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json(JSON.stringify(error.message, null, 2));
  }
});

export default router;

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
