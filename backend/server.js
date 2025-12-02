import dotenv from "dotenv"
dotenv.config();
import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// CORS for Express 5 (must NOT use "*")
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// LOGIN ROUTE
app.post("/Login", async (req, res) => {
    // console.log(req);
  const { email, password } = req.body;

  const student = await prisma.Student.findUnique({
    where: { email },
  });

  if (!student) {
    return res.status(400).json({ error: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, student.password);

  if (!validPassword) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const token = jwt.sign(
    {
      id: student.id,
      email: student.email,
    },
    "MY_SECRET_KEY",
    { expiresIn: "30d" }
  );

  return res.json({ message: "Login successful", token });
});


app.post("/Signup", async (req, res) => {
  const { role, name, email, password } = req.body;
    console.log(req.body)
  if (!role || !name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if user already exists
  const existing1 = await prisma.Student.findUnique({ where: { email } });
  const existing2 = await prisma.Company.findUnique({ where: { email } });
  if (existing1 || existing2) {
    return res.status(400).json({ error: "Email already registered" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser;

  if (role === "student") {
    newUser = await prisma.Student.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
  } else if (role === "company") {
    newUser = await prisma.Company.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
  }

  return res.json({ message: "Signup successful", user: newUser });
});




// Start Server
app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});
