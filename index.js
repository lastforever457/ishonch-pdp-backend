import express from "express";
import cors from "cors";
import UserRouter from "./routes/users.js";
import RoomRouter from "./routes/rooms.js";
import AuthRouter from "./routes/auth.js";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const app = express();
app.use(
  cors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(UserRouter);
app.use(RoomRouter);
app.use(AuthRouter);

app.get("/", (req, res) => {
  res.send("Hello from express");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
