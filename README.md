# 🏋️ GymExpert — AI-Powered Gym & Fitness Management System

GymExpert is a full-stack gym and fitness management application designed to help users manage their fitness journey, track weekly progress, select fitness goals, and maintain their personal profiles.

The application provides separate user and admin experiences with a modern and responsive interface.

---

## ✨ Features

### 👤 User Features

- User registration
- Secure user login
- User profile management
- Fitness goal selection
- Weekly progress tracking
- Dashboard for fitness information
- View personal fitness details
- Export fitness information
- Responsive user interface

### 🔐 Authentication

- User signup
- User login
- Password-based authentication
- User-specific dashboard
- Protected user information

### 🎯 Goal Management

Users can select and manage their fitness goals, such as:

- Weight Loss
- Muscle Gain
- Strength
- Fitness
- General Health

### 📊 Progress Tracking

Users can track their weekly fitness progress and monitor changes over time.

Progress information can be exported for personal records.

### 👨‍💼 Admin Features

- Admin login
- Admin dashboard
- Manage user information
- View registered users
- Monitor gym-related data

### 📄 Export Features

GymExpert supports exporting information into:

- PDF
- CSV

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js

### Database

- SQLite

### File Upload

- Multer

### Export

- jsPDF
- html2canvas
- CSV export

### Development Tools

- VS Code
- npm
- Git
- GitHub

---

## 📁 Project Structure

```text
GymExpert/
│
├── backend/
│   ├── server.js
│   ├── gym.db
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── GetStarted/
│   │   │   ├── Login/
│   │   │   ├── Signup/
│   │   │   ├── AdminDashboard/
│   │   │   ├── UserDashboard/
│   │   │   ├── Profile/
│   │   │   ├── GoalSelection/
│   │   │   └── WeeklyProgress/
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── ...
│
├── README.md
└── .gitignore
```

> The exact file names may vary depending on the current version of the project.

---

## 💻 Requirements

Before running GymExpert, install the following software.

### 1. Git

Download and install Git: [https://git-scm.com/downloads](https://git-scm.com/downloads)

Check installation:

```bash
git --version
```

### 2. Node.js

Install the latest Node.js LTS version: [https://nodejs.org/](https://nodejs.org/)

Check installation:

```bash
node --version
npm --version
```

Recommended:

- Node.js LTS
- npm

### 3. VS Code

Recommended code editor: [https://code.visualstudio.com/](https://code.visualstudio.com/)

---

## 📥 Clone the Repository

Clone the project from GitHub:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project:

```bash
cd GymExpert
```

---

## 📦 Backend Installation

Open a terminal in the project directory.

Move into the backend:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

### ▶️ Run Backend

Start the Express server:

```bash
npm start
```

If the project uses a development script:

```bash
npm run dev
```

The backend will normally run on: `http://localhost:5000`

> The exact port depends on the port configured in the backend server.

---

## 🎨 Frontend Installation

Open another terminal.

From the project root:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

### ▶️ Run Frontend

Start the React development server:

```bash
npm start
```

If the project uses Vite:

```bash
npm run dev
```

The frontend will normally be available at: `http://localhost:3000`

or, for Vite: `http://localhost:5173`

---

## 🔄 Running the Complete Application

GymExpert requires both the frontend and backend servers to run.

**Terminal 1 — Backend**

```bash
cd GymExpert/backend
npm install
npm start
```

**Terminal 2 — Frontend**

```bash
cd GymExpert/frontend
npm install
npm start
```

Then open the frontend URL displayed in the terminal.

---

## 🗄️ Database

GymExpert uses SQLite as its database.

Database file: `gym.db`

The database stores application information such as:

- User accounts
- User profile information
- Fitness goals
- Progress information
- Gym-related data

SQLite makes the project simple to run locally without requiring a separate database server.

---

## 📤 File Upload

GymExpert uses Multer for handling file uploads.

Multer allows the backend to receive and process uploaded files through HTTP requests.

---

## 📊 PDF Export

The application uses:

- jsPDF
- html2canvas

to generate downloadable PDF reports from the application's fitness information.

The general process is:

```
User Fitness Data
       │
       ▼
Frontend UI
       │
       ▼
html2canvas
       │
       ▼
Canvas/Image
       │
       ▼
jsPDF
       │
       ▼
PDF Report
```

---

## 📑 CSV Export

Fitness and progress information can also be exported as CSV data.

Example fields:

- User
- Goal
- Week
- Progress
- Status

CSV files can be opened using:

- Microsoft Excel
- Google Sheets
- LibreOffice Calc
- Any text editor

---

## 🔐 Application Flow

```
                GymExpert
                    │
          ┌─────────┴─────────┐
          │                   │
       Get Started          Login
          │                   │
          ▼                   ▼
       Signup            Authentication
          │                   │
          └─────────┬─────────┘
                    │
                    ▼
              User Dashboard
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
     Profile      Goals      Progress
        │           │           │
        └───────────┼───────────┘
                    │
                    ▼
              Export Reports
                 PDF / CSV
```

---

## 👨‍💼 Admin Flow

```
Admin Login
     │
     ▼
Admin Dashboard
     │
     ├── View Users
     │
     ├── Manage User Information
     │
     └── Monitor Gym Data
```

---

## 🎯 Main Pages

**Get Started**
The starting page of the application where users can begin their fitness journey.

**Login**
Allows existing users to access their account.

**Signup**
Allows new users to create an account.

**User Dashboard**
Provides users with an overview of their fitness information.

**Profile**
Displays and manages user profile information.

**Goal Selection**
Allows users to select their fitness objectives.

**Weekly Progress**
Allows users to monitor their fitness progress over time.

**Admin Dashboard**
Provides administrative functionality for managing users and application data.

---

## 🔌 Backend API

The exact API routes depend on the backend implementation.

Typical API operations include:

### Authentication

- `POST /register`
- `POST /login`

### Users

- `GET /users`
- `GET /users/:id`
- `PUT /users/:id`

### Fitness Goals

- `POST /goals`
- `GET /goals/:userId`
- `PUT /goals/:id`

### Progress

- `POST /progress`
- `GET /progress/:userId`
- `PUT /progress/:id`

> Check the backend route files for the exact endpoint paths used by your current version.

---

## 🧪 Testing the Application

After starting both servers, test the following workflow:

1. Open the frontend.
2. Create a new account.
3. Login using the created account.
4. Open the User Dashboard.
5. Update the profile.
6. Select a fitness goal.
7. Add or update weekly progress.
8. Verify that the information is stored in SQLite.
9. Test PDF export.
10. Test CSV export.
11. Login as an administrator and verify the Admin Dashboard.

---

## 🐛 Common Problems

### npm is not recognized

Install Node.js and restart the terminal.

Check:

```bash
node --version
npm --version
```

### npm install fails

Try:

```bash
npm cache clean --force
```

Then:

```bash
npm install
```

### Port Already in Use

If the backend or frontend port is already being used, stop the existing process or change the configured port.

### Database Error

Make sure the backend has permission to create or access `gym.db`.

### Frontend Cannot Connect to Backend

Make sure both servers are running.

Check the backend URL configured in the frontend, for example: `http://localhost:5000`

Also verify that the API route being requested actually exists in the backend.

---

## 🔒 Security Considerations

For production deployment, the following should be added or strengthened:

- Secure password hashing
- JWT authentication
- Input validation
- CORS configuration
- Environment variables
- Secure file upload validation
- Rate limiting
- HTTPS
- Database backup
- Role-based authorization

> Do not store production secrets directly in source code.

---

## 🚀 Future Improvements

- AI-based workout recommendations
- AI diet recommendations
- Exercise library
- Workout scheduling
- Calorie tracking
- BMI calculator
- Progress charts
- Body measurement tracking
- Workout history
- Trainer dashboard
- Trainer-user communication
- Notifications
- Email authentication
- JWT refresh tokens
- Role-based access control
- PostgreSQL support
- Cloud deployment
- Mobile application
- Wearable device integration

---

## 🌐 Deployment

GymExpert can be deployed by hosting the frontend and backend separately.

Possible deployment architecture:

```
                 User
                  │
                  ▼
          React Frontend
                  │
                  ▼
          Express Backend
                  │
                  ▼
             SQLite DB
```

For production, a server-based database such as PostgreSQL can be considered instead of SQLite.

---

## 📋 Development Commands

### Backend

Install dependencies:

```bash
npm install
```

Run:

```bash
npm start
```

Development mode:

```bash
npm run dev
```

### Frontend

Install dependencies:

```bash
npm install
```

Run:

```bash
npm start
```

Development mode:

```bash
npm run dev
```

Build:

```bash
npm run build
```

---

## 📌 Important Notes

- Run the backend and frontend separately.
- Make sure the backend is running before using API-dependent frontend features.
- Do not commit database files if the project configuration does not require them.
- Do not commit passwords, API keys, or other secrets.
- Use environment variables for production configuration.
- The exact commands may depend on the scripts defined in each `package.json`.

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository

```bash
git fork YOUR_GITHUB_REPOSITORY_URL
```

2. Clone your fork

```bash
git clone YOUR_FORK_URL
```

3. Create a new branch

```bash
git checkout -b feature/new-feature
```

4. Make your changes

5. Commit your changes

```bash
git add .
git commit -m "Add new feature"
```

6. Push the branch

```bash
git push origin feature/new-feature
```

7. Create a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

You are free to:

- Use the project
- Modify the project
- Distribute the project
- Use it for personal or educational purposes

See the LICENSE file for complete license information.

---

## 👨‍💻 Author

**Karthik S Kulal**

Artificial Intelligence & Machine Learning Engineer
Full-Stack Developer

GitHub: [https://github.com/kulalkarthik013-wq](https://github.com/kulalkarthik013-wq)

---

## ⭐ Support

If you find GymExpert useful, consider giving the repository a ⭐ on GitHub.

---

**🏋️ GymExpert**
Track your goals. Monitor your progress. Build a healthier routine.
