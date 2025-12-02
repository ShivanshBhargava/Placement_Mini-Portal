Placement_Mini_Portal

A small and lightweight web application built to simplify the college placement process. Students can view and apply for job listings, and the placement cell can manage postings and track applicants — all in one place.

Overview

This project was created as a minimal placement portal with a focus on clarity and ease of use.
The frontend is built using React with some UI/animation libraries like Motion, and the backend is built with Node.js, Express, Prisma, and MySQL.
Authentication is handled using JWT.

Tech Stack
Frontend

React.js

Motion (for simple animations)

Backend

Node.js

Express.js

Prisma ORM

MySQL

JWT authentication

Deployment

Frontend: Vercel

Backend: Vercel

Database: Vercel (MySQL)

Features
For Students

Register and log in

View job openings

Apply for available jobs

Check application status

For Admin

Add and manage job listings

View applicants for each job

Update application status

Project Structure
Placement_Mini_Portal/
│
├── frontend/     # React frontend
└── backend/      # Node.js + Express + Prisma

Setup Instructions
1. Clone the repository
git clone https://github.com/your-repo-url.git
cd Placement_Mini_Portal

2. Backend Setup
cd backend
npm install


Create a .env file in the backend folder:

DATABASE_URL="your-mysql-connection-url"


Run the backend:

npm run dev

3. Frontend Setup
cd frontend
npm install
npm start

Deployment Info

The frontend and backend are both deployed on Vercel.

The MySQL database is also hosted using Vercel’s built-in database service.

Team Members

Shivansh Bhargava – Project Lead & Developer

Sahil – Frontend Development

Om Gupta – Backend & Database

Devansh Saini – Testing & Documentation
