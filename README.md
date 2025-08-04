# Staff Dashboard

A modern internal staff dashboard built to improve employee productivity and organizational transparency. It enables staff to manage tasks, monitor KPIs, apply for leave, give anonymous feedback, and access relevant tools and information all in one place.

## ✨ Features

- 🔒 **Authentication**: Staff login with secure access.
- 📊 **KPI Tracking**: Monitor individual and departmental performance metrics.
- 📅 **Attendance Management**: Track daily attendance records.
- 📝 **Leave Requests**: Apply for and manage leave.
- 👥 **Staff Directory**: View staff members within the same division.
- 🎯 **Task Management**: Create, assign, accept, and track tasks.
- 📩 **Anonymous Feedback**: Send anonymous messages to management.
- 👤 **Profile Management**: Update personal staff profile.
- 🆘 **Help Center**: Access resources or raise concerns easily.

## 🧑‍💼 Target Users

This platform is designed specifically for **staff** within an organization.

## 🧱 Tech Stack

- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Icons**: React Icons
- **Others**: React DOM, Vite

## 🗂 Folder Structure (Key Directories)

`/src`
- `api/` – Axios route definitions for authentication and dashboard data.
- `assets/` – Static assets like images and logos.
- `component/` – Reusable components and modules:
  - `charts/`, `profile/`, `leave/`, `task/`, `staff/`, etc.
- `data/` – Static or mock data, schemas.
- `features/` – Feature-specific logic.
- `helper/` – Utility functions.
- `layout/` – Page layout components.
- `pages/` – Page-level components/routes.
- `utils/` – Redux store, interceptors, config files.

## ⚙️ Getting Started

### 🔧 Prerequisites

- Node.js ≥ v16
- npm

### 🚀 Setup (Development)

```bash
# Clone the repository
git clone <repo-url>
cd staff-dashboard-frontend

# Install dependencies
npm install

# Create and configure the .env file
touch .env
# Add the following variable
VITE_API_URL=<your-api-url>

# Start the dev server
npm run dev
```

## 📸 UI Preview


## 🧑‍💻 Authors

- **Awoleye Bolaji** – Frontend Developer  
- **Makinde Samuel** – Team Supervisor

## 🏢 About

This project is part of an internal company initiative to streamline employee operations and centralize workforce activities through a single dashboard.
