/*
  Warnings:

  - You are about to drop the column `applicationEnd` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `applicationStart` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `jobs` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_applications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,
    "appliedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    CONSTRAINT "applications_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "applications_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_applications" ("appliedAt", "id", "jobId", "status", "studentId") SELECT "appliedAt", "id", "jobId", "status", "studentId" FROM "applications";
DROP TABLE "applications";
ALTER TABLE "new_applications" RENAME TO "applications";
CREATE INDEX "applications_jobId_fkey" ON "applications"("jobId");
CREATE UNIQUE INDEX "applications_studentId_jobId_key" ON "applications"("studentId", "jobId");
CREATE TABLE "new_jobs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "description" TEXT,
    "eligibility" TEXT,
    "location" TEXT,
    "salaryPackage" TEXT,
    "postedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postedById" INTEGER NOT NULL,
    CONSTRAINT "jobs_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_jobs" ("companyName", "description", "eligibility", "id", "location", "postedAt", "postedById", "salaryPackage", "title") SELECT "companyName", "description", "eligibility", "id", "location", "postedAt", "postedById", "salaryPackage", "title" FROM "jobs";
DROP TABLE "jobs";
ALTER TABLE "new_jobs" RENAME TO "jobs";
CREATE INDEX "jobs_postedById_fkey" ON "jobs"("postedById");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
