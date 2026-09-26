# Project Afri-Health Team Hub — V1 Starter

A private project-management/community hub for the Project Afri-Health team.

## Included
- Firebase email/password login
- Dashboard
- Tasks & deliverables
- Meetings
- Team directory
- Departments
- Announcements
- Activity page
- Documents placeholder
- Responsive mobile layout

## Setup
1. Create a Firebase project.
2. Enable Authentication > Email/Password.
3. Create Realtime Database.
4. Create Storage.
5. Copy your Firebase Web App config into `js/firebase.js`.
6. Create the four department/admin accounts in Firebase Authentication.
7. Deploy the folder to GitHub Pages or another static host.

## Important
The included database rules are intentionally simple for development. Before using real sensitive health information or private documents, tighten the rules so users can only read/write authorized records. Do not store patient-identifiable health data in this starter without a proper privacy/security design.

## Suggested V2
- Real role-based permissions
- Firebase Storage uploads
- task status editing
- comments
- meeting reminders
- notifications
- decision log
- activity logging
- search
- department dashboards
- admin user management
