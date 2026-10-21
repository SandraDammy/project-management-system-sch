# Demo Testing Guide

Use this guide to prepare and run a demo of the School Project Management System.

## Before the demo

- Install dependencies with `npm install`.
- Start the app with `npm start` and open `http://localhost:3000`.
- Confirm you have internet access. The app uses the configured API at
  `https://unilagprojectmanagment.azurewebsites.net/api/`.
- Confirm the API is available and arrange working demo accounts before presenting.
- Use demo accounts and sample data only. Do not add real passwords or tokens to
  this file or commit them to the repository.

## Demo accounts

The repository does not include test credentials. Record the account email
provided for the demo here; enter passwords securely at login rather than
committing them.

| Role | Account email | Password |
| --- | --- | --- |
| Admin | Add the provided demo email | Do not store here |
| Lecturer | Add the provided demo email | Do not store here |
| Student | Add the provided demo email | Do not store here |

## Demo checklist

### Public project browsing

- [ ] Open the landing page.
- [ ] Open the projects page and browse the available projects.
- [ ] Open a project and review its details.

### Role-based access

For each available account, open `/login`, sign in with its email and password,
and confirm that it reaches the expected dashboard:

| Role | Expected route |
| --- | --- |
| Admin | `/admin` |
| Lecturer | `/lecturer` |
| Student | `/student` |

- [ ] Admin: browse the dashboard, faculty, department, course, and user pages.
- [ ] Lecturer: browse the dashboard, courses, and project pages.
- [ ] Student: browse the dashboard, courses, and project pages.
- [ ] Sign out and confirm the login page is shown.

### If something goes wrong

- If sign-in fails, verify the account, selected role, API availability, and
  network connection.
- If a dashboard has no records, verify that the demo account has been assigned
  the required sample data.
- If the API is unavailable, report it as a demo blocker rather than presenting
  sample data as live data.

## Test results

| Date | Tester | Role/flow | Result | Notes |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
