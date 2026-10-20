# SCH Project Management System

A role-based project management web app for a university environment. The platform helps students, lecturers, and administrators browse, manage, and review academic projects across faculties, departments, and courses.

## Overview

This application is designed to support the full project lifecycle within a school or university setting. It provides a central place to:

- Explore published projects and academic work
- View student and lecturer project records
- Manage course-related academic activities
- Maintain faculty and department information
- Support admin oversight for users and projects
- Offer role-specific dashboards and routes

## Key Features

### Public and project discovery pages
- Landing page with project overview and browsing experience
- Search and browse across available projects
- Individual project detail views for public access

### Student access
- Student dashboard with assigned or completed project listings
- Project profile and details view
- Course-related project navigation
- Personal profile settings

### Lecturer access
- Lecturer dashboard for managing academic work
- Course management and project tracking
- Lecturer-specific project views and profiles

### Admin access
- Faculty and department management
- User management for lecturers and students
- Administrative project oversight
- Role-based navigation and data organization

## Tech Stack

- React
- React Router DOM
- Axios
- CSS Modules and custom styling
- React Icons
- React Toastify

## Project Structure

```bash
src/
├── components/
│   ├── appRoutes/
│   ├── common/
│   ├── context/
│   ├── layouts/
│   ├── modal/
│   ├── modalMsg/
│   ├── pages/
│   └── section/
├── Assets/
├── App.js
├── index.js
├── App.css
└── index.css
```

## Role-based App Flow

The application routes are organized around user roles:

- `/` - landing page and public project browsing
- `/login` - login page for different roles
- `/student/*` - student dashboard, courses, and project management
- `/lecturer/*` - lecturer dashboard, courses, and project views
- `/admin/*` - admin dashboard, faculty, departments, and user management

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

### Run the app locally

```bash
npm start
```

The app will run in development mode at:

```text
http://localhost:3000
```

### Build for production

```bash
npm run build
```

## Available Scripts

```bash
npm start
npm test
npm run build
npm run eject
```

## Notes

This project was bootstrapped with Create React App and is designed as a university project management system for academic collaboration, tracking, and administration.

## License

This project is currently unlicensed unless otherwise specified in the repository.
