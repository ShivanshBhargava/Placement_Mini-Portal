Placement_Mini_Portal

A lightweight web application built to simplify the college placement process. Students can view and apply for job listings, while the placement cell can manage postings and track applicants — all in one place.


Overview

Placement_Mini_Portal is built with a focus on simplicity and usability.

The frontend is made using React and Motion (for UI animations).

The backend is built with Node.js, Express, Prisma, and MySQL.

Authentication uses JWT for secure login.

Both backend and frontend are deployed on Vercel, along with the MySQL database.


Tech Stack
Frontend
React.js
Motion

Backend
Node.js
Express.js
Prisma ORM
MySQL
JWT Authentication


Deployment
Frontend: Vercel
Backend: Vercel
Database: Vercel MySQL


Features
For Students
Register and log in
View job listings
Apply for jobs
Track application status


For Admin
Add and manage job postings
View applicants
Update application status


Project Structure
Placement_Mini_Portal/

│
├── frontend/     # React frontend
└── backend/      # Node.js + Express + Prisma


Setup Instructions
1. Clone the Repository
git clone https://github.com/your-repo-url.git
cd Placement_Mini_Portal


2. Backend Setup
cd backend
npm install

Create a .env file:
DATABASE_URL="your-mysql-connection-url"

Run backend:
npm run dev


3. Frontend Setup
cd frontend
npm install
npm start


Deployment
Frontend deployed on Vercel
Backend deployed on Vercel
Database hosted using Vercel MySQL


Team Members
Shivansh Bhargava – Project Lead & Developer
Sahil – Frontend Development
Om Gupta – Backend & Database
Devansh Saini – Testing & Documentation
