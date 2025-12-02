-- CreateTable
CREATE TABLE "subjects" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "credits" INTEGER
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "total" INTEGER NOT NULL DEFAULT 0,
    "attended" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "attendance_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "attendance_studentId_subjectId_key" ON "attendance"("studentId", "subjectId");
