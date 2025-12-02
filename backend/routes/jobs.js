import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateCompany } from "../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

// Create job opening
router.post("/", authenticateCompany, async (req, res) => {
  const { title, description, eligibility, location, salaryPackage } = req.body;
  
  try {
    const job = await prisma.job.create({
      data: {
        title,
        companyName: req.company.companyName,
        description,
        eligibility,
        location,
        salaryPackage,
        postedById: req.company.id
      }
    });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: "Failed to create job" });
  }
});

// Get all jobs for company
router.get("/", authenticateCompany, async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { postedById: req.company.id },
      include: { applications: true }
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// Update job
router.put("/:id", authenticateCompany, async (req, res) => {
  const { title, description, eligibility, location, salaryPackage } = req.body;
  
  try {
    const job = await prisma.job.update({
      where: { 
        id: parseInt(req.params.id),
        postedById: req.company.id 
      },
      data: { title, description, eligibility, location, salaryPackage }
    });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: "Failed to update job" });
  }
});

// Delete job
router.delete("/:id", authenticateCompany, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    console.log(`Attempting to delete job ${jobId} for company ${req.company.id}`);
    
    const deletedJob = await prisma.job.delete({
      where: { 
        id: jobId,
        postedById: req.company.id 
      }
    });
    
    console.log('Job deleted successfully:', deletedJob);
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete job: " + error.message });
  }
});

// Get applications for a job
router.get("/:id/applications", authenticateCompany, async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: { 
        jobId: parseInt(req.params.id),
        job: { postedById: req.company.id }
      },
      include: { student: true }
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

export default router;