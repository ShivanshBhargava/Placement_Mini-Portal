import dotenv from "dotenv"
dotenv.config();
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jobRoutes from "./routes/jobs.js";
import studentRoutes from "./routes/student.js";

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: process.env.FRONTEND_URL || "https://placement-mini-portal-wwbu.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/student", studentRoutes);

// LOGIN ROUTE
app.post("/Login", async (req, res) => {

  console.log(req.body, "req.body");
  const { email, password } = req.body;

  // Check student first
  let user = await prisma.Student.findUnique({ where: { email } });
  let userType = "student";
  // If not student, check company
  if (!user) {
    user = await prisma.Company.findUnique({ where: { email } });
    userType = "company";
  }

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      companyName: userType === "company" ? user.companyName : undefined,
      userType
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return res.json({ message: "Login successful", token, userType });
});


app.post("/Signup", async (req, res) => {
  try {
    const { role, name, email, password } = req.body;
    console.log("Signup request:", { role, name, email });

    if (!role || !name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user exists in both tables
    const existingStudent = await prisma.Student.findUnique({ where: { email } });
    const existingCompany = await prisma.Company.findUnique({ where: { email } });

    if (existingStudent || existingCompany) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;

    if (role === "student") {
      newUser = await prisma.Student.create({
        data: { name, email, password: hashedPassword }
      });
    } else if (role === "company") {
      newUser = await prisma.Company.create({
        data: {
          companyName: name,
          email,
          password: hashedPassword
        }
      });
    }

    return res.json({ message: "Signup successful", user: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});




// Start Server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await prisma.$disconnect();
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await prisma.$disconnect();
  server.close(() => {
    console.log('HTTP server closed');
  });
});
