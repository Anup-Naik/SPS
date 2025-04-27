# Student Proctoring System (SPS)🏫🎓

## Overview
The Student Proctoring System is a comprehensive web application designed to facilitate efficient tracking and monitoring of student academic performance. It provides a robust platform where students can submit personal, academic, and relevant details, which faculty advisors can access and analyze to provide better guidance and support.

## Technology Stack
- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Backend**: Node.js, Express.js
- **Template Engine**: EJS
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Session-based authentication
- **Email**: Nodemailer for password reset functionality

## Features

### User Roles
1. **Admin** 🏫
   - Manage faculty members (add, edit, delete)
   - Manage students (add, edit, delete)
   - Handle graduated students
   - Control system access permissions
   - Toggle student access to system
   - Toggle student edit access

2. **Faculty** 🧑‍🏫
   - View assigned mentees (students)
   - Add remarks and meeting notes for mentees
   - View student profiles and academic progress
   - Generate student reports
   - Access and view student uploaded files
   - View information of graduated mentees
   - Create personal memos for tracking events
   - Send emails to mentees (individual or by semester)
   - Change password

3. **Student** 👨‍🎓
   - Complete and update personal information
   - Submit academic details and progress
   - View faculty advisor information
   - Upload documents (regular and supplementary)
   - View academic progress summary
   - Change password

### Core Functionalities
- **User Authentication**: Secure login system with role-based access control
- **Student Registration**: Self-registration and admin-controlled registration
- **Data Management**: Comprehensive student data management system
- **Academic Tracking**: Track student academic progress across semesters
- **Counseling System**: Faculty can record counseling sessions and outcomes
- **Document Management**: Upload and retrieve academic documents
- **Graduation Management**: System to transition graduating students
- **Password Recovery**: Email-based password reset functionality
- **Security Features**: Protection against common web vulnerabilities

## System Architecture 

### Models
1. **Admin Model**
   - Manages admin users with system control permissions
   - Controls student access toggles

2. **Faculty Model**
   - Stores faculty information and credentials
   - Maintains mentee relationships and remarks
   - Keeps record of counseling meetings
   - Stores personal memos

3. **Student Model**
   - Comprehensive student profile information
   - Academic history and progress tracking
   - Backlog tracking
   - Document storage references

4. **Graduate Model**
   - Archive for graduated student information
   - Maintains historical academic data

### Controllers
1. **Admin Controllers**
   - Faculty management
   - Student management
   - System access control
   - Graduate data management

2. **Faculty Controllers**
   - Mentee management
   - Academic progress monitoring
   - Remarks and meeting management
   - Graduate information access
   - Communication tools
   - Memo management

3. **Student Controllers**
   - Profile management
   - Document submission
   - Academic data entry
   - Password management

4. **Session Controllers**
   - Authentication management
   - Login/logout functionality

5. **Password Reset Controllers**
   - Password recovery workflow

### Routes
Organized into distinct modules:
- Admin routes
- Faculty routes
- Student routes
- Session routes
- Password recovery routes

### Security Implementations
- Session management with secure cookies
- Helmet for HTTP header security
- Rate limiting to prevent brute force attacks
- MongoDB sanitization to prevent NoSQL injection
- Content Security Policy implementation
- CSRF protection
- Input validation

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm (Node Package Manager)

### Installation Steps
1. Clone the repository
   ```
   git clone https://github.com/your-username/SPS.git
   cd SPS
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGO_URL=mongodb://localhost:27017/student-proctoring
   SESSION_SECRET=your_secure_session_secret
   GMAIL_USER=your_email@gmail.com
   GMAIL_PASS=your_app_password
   ```

4. Start the application
   ```
   npm start
   ```

5. Access the application
   ```
   http://localhost:3000
   ```

### Initial Setup
- The first admin user should be created directly in the database or by uncommenting and running the admin creation code in the `adminCont.js` file.

---

### Homepage
![SPS1](https://github.com/Anup-Naik/SPS/assets/117713985/5dc0ff46-bb04-4880-adca-a63953f12ce7)

### Login Page
![SPS2](https://github.com/Anup-Naik/SPS/assets/117713985/4b8df1a3-5410-4d32-b2ee-60854195c3f7)

### Admin Dashboard
![SPS3](https://github.com/Anup-Naik/SPS/assets/117713985/4a697bc3-a3ba-4815-b778-1bf57592e938)

### Faculty Dashboard
![SPS4](https://github.com/Anup-Naik/SPS/assets/117713985/5a2c63d7-b5f3-4cc7-9846-3f24abcee9ff)

### Student SignUp 
![SPS5](https://github.com/Anup-Naik/SPS/assets/117713985/250bd901-b27d-4200-a529-9b1432f57883)

### Student Dashboard
![SPS6](https://github.com/Anup-Naik/SPS/assets/117713985/8eeb5aef-297d-4008-8fd3-25086a6079b0)
