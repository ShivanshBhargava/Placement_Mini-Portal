#  Project Ideation Document  
##  Project Name: Placement_Mini_Portal  

---

##  Project Overview  
**Placement_Mini_Portal** is a simplified web application designed to streamline the campus placement process.  
It enables students to register, create profiles, and apply for listed company jobs, while the placement cell (admin) can manage postings and track applications.  

The focus of this project is to build a **functional, easy-to-use, and minimal placement management system** - covering the essential flow of registration, job listings, applications, and tracking.

---

##  1. Objectives  
- Provide students with a central platform to view and apply for placement opportunities.  
- Enable admins to efficiently manage job postings and monitor applications.  
- Maintain a clean UI with reliable data handling and user authentication.  

---

##  2. Core Features  

###  Student Side  
- **Registration & Login**  
  Secure signup and login system for students.  

- **Profile Management**  
  Students can update personal details like name, email, branch, CGPA, and resume link.  

- **Job Listings**  
  Display all active job openings with company name, role, stipend, and eligibility criteria.  

- **Filter Button**  
  Filter jobs by company, salary, location, or eligibility  

- **Application Status**  
  Track progress through simple labels: `Applied`, `Shortlisted`, `Selected`, `Rejected`.  

---

###  Placement Cell Side   
- **Company & Job Management**  
  Add, edit, or remove job postings.  

- **Filter Button**  
  Search students by skills or CGPA.

- **Application Tracking**  
  View how many students applied for each job.  
  Update each student’s application status manually if required.  

---

## ⚙️ 3. Backend Tasks  
- Store and manage student profiles and login credentials.  
- Store job postings linked to company details.  
- Store student applications, linking each to a job and student record.  
- Track and update the application status for each submission.  

---

##  4. Frontend Pages  

| Page | Description |
|------|--------------|
| **Landing Page** | Intro page with navigation buttons for Login/Register. |
| **Login / Register** | Forms for both student and admin accounts. |
| **Student Dashboard** | Displays student profile, applied jobs, and job listings. |
| **Job Details Page** | Detailed job view with role, company info, and “Apply” button. |
| **Placement Cell Dashboard** | Interface to add/view jobs and monitor applications. |

> **Design Goal:** Keep UI minimal, responsive, and intuitive using **Chakra UI** or **React** for faster development.

---

##  5. Tech Stack  

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js / HTML / CSS / JavaScript |
| **Backend** | Node.js + Express.js |
| **Database** | MySQL (with prisma) |
| **Authentication** | JWT or simple session-based login |
| **Hosting** | Vercel |

---

##  6. Expected Outcome  
By the end of the development cycle, **Placement_Mini_Portal** will be a functional web app where:  
- Students can register, view, and apply for jobs.  
- Placement cell can post jobs and view applicants.  
- All data persists securely in a connected database.  

The system will be simple, responsive, and demonstration-ready, effectively showcasing a digital placement workflow.

---

##  Contributors
- **Shivansh Bhargava** – Developer & Project Lead  
- **Sahil** - Frontend Developer (UI/UX)
- **Om Gupta** - Backend Developer & Database Engineer
- **Devansh Saini** - Testing & Documentation Engineer

---

##  Summary  
**Placement_Mini_Portal** is a compact yet complete web solution to manage student placements digitally.  
It focuses on practicality, clean UI, and robust core functionalities — all achievable within one month of development.
