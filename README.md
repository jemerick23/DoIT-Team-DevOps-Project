# DoIT-Team-DevOps-Project

DoIT is a team task and project collaboration platform developed for COM 430 Software Engineering.

Saint Leo University

## Team Features

- Authentication System
- Task Management Dashboard
- AI Assistant Dashboard
- Database Integration
- Calendar Integration
- Team Collaboration
- User Settings Management
- JWT-Based Authentication

## Repository Structure

- auth = Login, Sign Up, Forgot Password
- dashboard = Dashboard and AI Assistant
- database = Database design and integration
- tasks = Task creation, display, and deletion functionality

## Contributors

- Justin Emerick
- Angel Perez
- Matthew Goncalves

# Prerequisites

Before running the application, install the following:

    Node.js
    MySQL Server
    npm (included with Node.js)

# Setup instructions

1. Clone or Download the Project

Download the project files and extract them to a local directory.

2. Install Dependencies

Open a terminal in the project directory and run:

npm install

3. Create the Database

Open MySQL and create the database:

CREATE DATABASE doit_project;

4. Import the Database

Import the provided database file (DoIT_mySQL_database.sql) into mySQL Workbench:

    MySQL Workbench:

        Open Workbench
        Connect to your MySQL server
        Go to Server → Data Import
        Select DoIT_mySQL_database.sql
        Click Start Import

You can also copy and paste all file contents into the workbench.

After all contents are added into mySQL Workbench, run the entire database.

This will create all required tables and sample data.

5. Create a .env file inside the backend folder.

    Add the following values:

    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_NAME=doit_project
    JWT_SECRET=doit_super_secret_key

    Change the placeholder values with your local configuration. (For JWT_SECRET, add: doit_super_secret_key).

6. Start the Application

    From the backend directory run:

    node server.js

7. Open the application

    Open the frontend in your browser (live browser) and access the application.

    In VSCode, you can click on Go Live on the bottom right corner of your screen.

8. Create an account in DoIT

   Once on the log in screen, click on the sign up button to create your account.
   Once all fields are filled out, click on the sign up button.

9. Log in

   Once your account is created, you can now log into DoIT with your credentials.
   After logging in, the dashboard will be displayed.

# Technologies Used

# Frontend
    HTML
    CSS
    JavaScript

# Backend
    Node.js
    Express.js

# Database
    MySQL

# Security
    bcrypt
    JSON Web Tokens (JWT)

# Troubleshooting

Database Connection Error

Verify:

1. MySQL is running.
2. Database credentials in .env are correct.
3. The database doit_project exists.
4. The SQL file has been imported successfully.
5. Port Already in Use

Change the PORT value in the .env file and restart the server.


