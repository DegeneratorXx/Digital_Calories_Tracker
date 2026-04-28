# Wellness Hub: Digital Calories Tracker 🧘‍♂️📱

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev/)

**Wellness Hub** is a full-stack application designed to help users achieve a healthier digital-physical balance. It introduces the concept of **"Digital Calories"**—quantifying the mental and physical cost of screen time and allowing users to "burn" those calories through real-world physical exercise.

---

## 🚀 Key Features

- **Digital Calorie Tracking**: Log time spent on various digital activities (Social Media, Streaming, Gaming) with predefined caloric "costs".
- **Workout Logger**: Record physical exercises (Running, Strength Training, etc.) to offset your digital consumption.
- **Real-time Net Balance**: A dynamic dashboard showing your current "Digital Calorie" debt or surplus.
- **Wellness Alerts**: Automatic warning system when digital consumption exceeds healthy thresholds (e.g., > 100 calories).
- **Activity History**: Comprehensive logs for both screen time usage and physical workouts.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: Custom Vanilla CSS (Responsive Design)
- **API Client**: Fetch API

### Backend
- **Framework**: Spring Boot 4.0.5 (Java 21)
- **Data Access**: Spring Data JPA
- **Database**: H2 (In-memory for easy setup)
- **Web**: Spring Web (RESTful Controllers)

---

## 📂 Project Structure

```text
Digital_Calories_Tracker/
├── backend/                # Spring Boot Application
│   ├── src/main/java       # Source code (Controllers, Services, Models)
│   ├── pom.xml             # Maven dependencies
│   └── ...
├── frontend/               # React Application
│   ├── src/                # Components and App logic
│   ├── package.json        # NPM dependencies
│   └── ...
└── README.md
```

---

## 🚦 Getting Started

### Prerequisites
- **JDK 21** or higher
- **Node.js 18+** and **npm**
- **Maven** (optional, wrapper included)

### 1. Run the Backend
```bash
cd backend
./mvnw spring-boot:run
```
The server will start on `http://localhost:8081`.

### 2. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 🔌 API Documentation (Brief)

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/activities` | `GET` | Fetch available digital activities |
| `/api/usage` | `POST` | Log a digital usage entry |
| `/api/total` | `GET` | Get net digital calories |
| `/api/warning` | `GET` | Get wellness warning status |
| `/api/workouts` | `POST` | Log a physical workout set |
| `/api/workouts/history`| `GET` | Fetch workout history |

---

## 🎨 Preview

### Net Digital Calories Dashboard
The central hub displays your current balance. Positive numbers indicate a "digital debt" that needs to be burned off with exercise!

### Screen Time vs. Workouts
Toggle between tabs to log your activities.
- **Digital Activities**: Instagram (5 cal/min), Netflix (2 cal/min), etc.
- **Physical Exercises**: Pushups, Running, Weightlifting (each with dynamic burn rates).

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---
*Built to improve digital wellness, one rep at a time.*
