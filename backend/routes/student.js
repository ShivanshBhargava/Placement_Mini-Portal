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

// Get student profile
router.get("/profile", authenticateStudent, async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: req.student.id },
      select: {
        id: true,
        name: true,
        email: true,
        branch: true,
        college: true,
        university: true,
        passingYear: true,
        cgpa: true,
        percentage: true,
        bio: true,
        goals: true,
        resumeUrl: true,
        resumeName: true,
        profileImage: true
      }
    });
    
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    
    res.json(student);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Update student profile
router.put("/profile", authenticateStudent, async (req, res) => {
  try {
    console.log('Updating profile for student:', req.student.id);
    console.log('Received data:', req.body);
    
    const {
      name,
      branch,
      college,
      university,
      passingYear,
      cgpa,
      percentage,
      bio,
      goals,
      resumeUrl,
      resumeName,
      profileImage
    } = req.body;
    
    console.log('Extracted fields:', {
      name, branch, college, university, passingYear, cgpa, percentage, bio, goals, resumeName
    });

    const updatedStudent = await prisma.student.update({
      where: { id: req.student.id },
      data: {
        name: name || undefined,
        branch: branch || undefined,
        college: college || undefined,
        university: university || undefined,
        passingYear: passingYear && passingYear !== '' ? parseInt(passingYear) : undefined,
        cgpa: cgpa && cgpa !== '' ? parseFloat(cgpa) : undefined,
        percentage: percentage && percentage !== '' ? parseFloat(percentage) : undefined,
        bio: bio || undefined,
        goals: goals || undefined,
        resumeUrl: resumeUrl || undefined,
        resumeName: resumeName || undefined,
        profileImage: profileImage || undefined
      },
      select: {
        id: true,
        name: true,
        email: true,
        branch: true,
        college: true,
        university: true,
        passingYear: true,
        cgpa: true,
        percentage: true,
        bio: true,
        goals: true,
        resumeUrl: true,
        resumeName: true,
        profileImage: true
      }
    });

    console.log('Profile updated successfully');
    res.json({ message: "Profile updated successfully", student: updatedStudent });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile: " + error.message });
  }
});

export default router;