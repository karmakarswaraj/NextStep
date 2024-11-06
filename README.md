---

# NextStep Job Portal

NextStep is a feature-rich job portal application built on the MERN (MongoDB, Express, React, Node.js) stack. It offers a seamless experience for job seekers and employers alike, featuring user authentication, dynamic search and filtering options, and an intuitive interface to simplify the job search and hiring process.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### User Authentication

- **Multi-user support**: Separate login options for job seekers and employers.
- **Secure authentication**: Uses JWT tokens for secure access to protected routes.
- **Profile management**: Allows users to create and manage personal profiles.
- **JWT-based secure access**: Uses JWT tokens for secure access to protected routes.
- **Separate User Roles**: Supports both student and recruiter logins, with customized features for each user type.

### Job Search and Filters

- **Keyword search**: Search for jobs based on job title, description, or company.
- **Advanced filters**: Filter jobs by location, category, experience level, salary range, and more.
- **Save job listings**: Users can save favorite jobs to review later.
- **Application tracking**: Track applied jobs and view application statuses.

### Job Seeker Features

- **Profile Creation**: Students can create a profile with detailed information, including education, skills, and work experience.
- **Resume Upload**: Students can upload their resumes, allowing recruiters to view and download them.
- **Job Applications**: Students can apply to job listings and track the status of each application.
- **Saved Jobs**: Allows students to save job listings for future reference.
- **Application history**: View previously applied jobs and statuses.
- **Job recommendations**: Personalized job recommendations based on profile preferences.

### Recruiter Features

- **Job Posting**: Recruiters can create and publish job listings with detailed descriptions.
- **Application Management**: Recruiters can view all applicants for each job and review student profiles and resumes.
- **Accept or Decline Applications**: Recruiters have the option to accept or decline applications, providing feedback or hiring updates directly.
- **Company profile**: Build a company profile to attract potential employees.

---

## Demo

A live demo of the NextStep Job Portal can be found at: []

---

## Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/nextstep-job-portal.git
   cd nextstep-job-portal
   ```

2. **Backend Setup:**

   ```bash
   cd server
   npm install
   ```

3. **Frontend Setup:**

   ```bash
   cd ../client
   npm install
   ```

4. **Environment Variables:**
   Create a `.env` file in the `server` directory with the following:

   ```env
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

5. **Start the application:**

   - **Backend**: Start the server.

     ```bash
     npm run dev
     ```

   - **Frontend**: Start the client.
     ```bash
     npm start
     ```

The application should now be running on `http://localhost:3000`.

---

## Usage

1. **Job Seekers**: Sign up, create a profile, upload a resume, and search for jobs.
2. **Employers**: Register as an employer, post jobs, and manage applications.
3. **Admins** (if applicable): Manage users, jobs, and other site content.

---

## Tech Stack

- **Frontend**: React, Redux, CSS/SCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)

---

## API Documentation

### Base URL

`http://localhost:5000/api`

### Endpoints

- **Auth Routes**

  - `POST /auth/register`: Register a new user.
  - `POST /auth/login`: Log in an existing user.

- **Job Routes**

  - `GET /jobs`: Retrieve all job listings.
  - `POST /jobs`: Create a new job listing (employer-only).
  - `GET /jobs/:id`: Retrieve a specific job by ID.

- **User Routes**
  - `GET /users/:id`: Retrieve a specific user’s profile.
  - `PUT /users/:id`: Update a user’s profile.

> **Note**: Refer to the [full API documentation](API_DOCUMENTATION.md) for detailed information on all endpoints.

---

### Contact

For additional questions, feel free to contact the development team at [swarajkarmakar5@gmail.com].

---
