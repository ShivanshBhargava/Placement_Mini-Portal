import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateStudent } from "../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Student routes working" });
});

// Get all available job listings
router.get("/jobs", authenticateStudent, async (req, res) => {
  try {
    console.log("Student requesting jobs:", req.student.id);
    const jobs = await prisma.job.findMany({
      include: {
        postedBy: {
          select: { companyName: true }
        },
        applications: {
          where: { studentId: req.student.id },
          select: { id: true, status: true }
        }
      },
      orderBy: { postedAt: "desc" }
    });
    console.log("Found jobs:", jobs.length);
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// Apply for a job
router.post("/jobs/:id/apply", authenticateStudent, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    
    // Check if already applied
    const existingApplication = await prisma.application.findUnique({
      where: {
        studentId_jobId: {
          studentId: req.student.id,
          jobId: jobId
        }
      }
    });

    if (existingApplication) {
      return res.status(400).json({ error: "Already applied to this job" });
    }

    const application = await prisma.application.create({
      data: {
        studentId: req.student.id,
        jobId: jobId
      }
    });

    res.json({ message: "Application submitted successfully", application });
  } catch (error) {
    res.status(500).json({ error: "Failed to apply for job" });
  }
});

// Get student's applications
router.get("/applications", authenticateStudent, async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: { studentId: req.student.id },
      include: {
        job: {
          include: {
            postedBy: {
              select: { companyName: true }
            }
          }
        }
      },
      orderBy: { appliedAt: "desc" }
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

export default router;