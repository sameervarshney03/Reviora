# Reviora

## Overview

Reviora is a full-stack MERN application designed to help students retain knowledge through systematic revision.

Instead of allowing notes to accumulate and be forgotten, Reviora schedules revision sessions based on customizable revision gaps. Students can create revision material, configure revision intervals, and receive revision content when it is due.

The project was built to explore full-stack web development concepts including authentication, REST APIs, MongoDB data modeling, React state management, custom hooks, protected routes, and revision scheduling logic.

---

## Features

### Authentication System

- User registration
- User login
- Secure password hashing
- JWT-based authentication
- Protected routes
- Cookie-based session handling

### Revision Management

- Create revision notes
- View revision material
- Retrieve individual revision entries
- Store and manage long-form revision content

### Custom Revision Scheduler

- User-defined revision gaps
- Automated revision date calculation
- Dynamic revision retrieval
- Gap update functionality

### Responsive User Interface

- Mobile-friendly design
- Responsive layouts using Tailwind CSS and DaisyUI
- Interactive components
- Carousel-based feature showcase

### Security

- Password hashing using bcrypt
- JWT authentication
- Protected backend routes
- Environment variable configuration

---

## Tech Stack

### Frontend

- React
- React Router DOM
- Parcel Bundler
- Tailwind CSS
- DaisyUI
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication

- JWT (JSON Web Tokens)
- bcrypt

---

## Project Structure

### Frontend

```text
frontend/
├── components/
├── pages/
├── hooks/
├── utils/
├── assets/
├── app.js
└── package.json
```

### Backend

```text
backend/
├── routes/
├── models/
├── middleware/
├── utils/
├── app.js
└── package.json
```

---

## Installation

### Clone Repository

```bash
git clone <https://github.com/gauravpurohit685/Reviora>
cd reviora
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=7777
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start backend server:

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
API_BASE_URL=http://localhost:7777
```

Start frontend server:

```bash
npm start
```

---

## Environment Variables

### Backend

```env
PORT=
MONGO_URI=
JWT_SECRET=
```

### Frontend

```env
VERIFY_API =
LOGIN_API =
SIGNUP_API =
GETNOTES_API =
POSTNOTES_API =
PATCHNOTES_API =
DELETENOTES_API =
REQNOTES_API =
GETPROFILE_API =
POSTPROFILE_API =
GAP_API =
REVISION_API =
LOGOUT_API =
```

---

## Revision System

Reviora uses a configurable gap-based revision strategy.

Example:

```text
Revision Gaps:
1 day
3 days
7 days
14 days
30 days
```

When a revision note is created, the system calculates future revision dates based on the configured gaps and displays revision material when it becomes due.

This functionality is powered by a custom date calculation engine implemented in the backend.

---

## API Endpoints

### Authentication

```http
POST /signup
POST /login
POST /logout
```

### Revision

```http
GET    /revision
POST   /revision
GET    /revision/:revId
GET    /revision/revdata/gap
PATCH  /revision/gap
```

### Notes

```http
GET    /notes/view
GET   /notes/:noteId
POST   /notes/add
PATCH    /notes/:noteId
DELETE  /notes/:noteId
```

### Profile

```http
GET    /profile/view
POST   /profile/edit
```

---

## Learning Outcomes

This project was built to gain hands-on experience with:

- React Fundamentals
- React Hooks
- Custom Hooks
- State Management
- Express Routing
- REST API Design
- MongoDB & Mongoose
- Authentication Systems
- JWT Security
- Responsive UI Design
- Full Stack Deployment
- Debugging Large Applications

---

## Future Improvements

- Rich text editor
- Revision statistics dashboard
- Revision streak tracking
- Flashcard generation
- AI-assisted note summarization
- Email reminders
- Dark/Light theme customization
- Revision analytics

---

## Author

Gaurav Purohit

Computer Science Engineering Student

Built as a full-stack MERN project to explore modern web development concepts and revision-based learning systems.
