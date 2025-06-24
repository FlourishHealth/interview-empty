# Interview Application

## 📋 Table of Contents

- [Critical Files & Project Structure](#-critical-files--project-structure)
- [Quick Start](#-quick-start)
- [Available Commands](#-available-commands)
- [Application Architecture](#-application-architecture)
- [Testing](#-testing)
- [Database Management](#-database-management)
- [Troubleshooting](#-troubleshooting)

## 🗂️ Critical Files & Project Structure

Before diving in, here are the key files you'll need to know about:

### Backend
- **`backend/src/server.ts`** - Main Express server with API endpoints and routing
- **`backend/src/user.ts`** - User management and authentication logic
- **`backend/src/loadDb.ts`** - Database initialization and fixture loading

### Frontend
- **`frontend/app/patient/(tabs)/index.tsx`** - Patient dashboard for booking appointments
- **`frontend/app/clinician/(tabs)/index.tsx`** - Clinician dashboard for viewing appointments
- **`frontend/contexts/AuthContext.tsx`** - Authentication context and user session management

## 🚀 Quick Start

### Prerequisites (macOS Setup)

1. **Install Node.js**
   ```bash
   # Using Homebrew (recommended)
   brew install node@22
   
   # Verify installation
   node --version
   yarn --version
   ```

2. **Install MongoDB**
   ```bash
   # Install MongoDB Community Edition
   brew tap mongodb/brew
   brew install mongodb-community
   
   # Start MongoDB service
   brew services start mongodb/brew/mongodb-community
   
   # Verify MongoDB is running
   mongosh --eval "db.adminCommand('ismaster')"
   ```

3. **Install Yarn (if not already installed)**
   ```bash
   npm install -g yarn
   ```

### Installation & Setup

1. **Clone and install dependencies**
   ```bash
   # Install root dependencies
   yarn install
   
   # Install backend dependencies
   cd backend && yarn install
   
   # Install frontend dependencies
   cd ../frontend && yarn install
   ```

2. **Set up the database**
   ```bash
   # From the `backend/` directory
   yarn loaddb
   ```
   This command initializes your MongoDB database with sample users. **Use this command whenever you want to reset your database to a clean state.**

3. **Start the applications**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   yarn dev
   ```
   Backend runs at `http://localhost:9000`
   
   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   yarn web
   ```
   Frontend runs at `http://localhost:8081`

## 🔧 Available Commands

### Backend Commands
- `yarn dev` - Start development server with hot reload
- `yarn test` - Run all tests
- `yarn loaddb` - Load database fixtures and sample data
- `yarn lint` - Check code style
- `yarn lintfix` - Fix linting issues automatically

### Frontend Commands
- `yarn web` - Start web development server
- `yarn android` - Run on Android device/emulator
- `yarn ios` - Run on iOS device/simulator
- `yarn start` - Start Expo development server (for mobile)
- `yarn lint` - Check code style
- `yarn lintfix` - Fix linting issues automatically

## 🏗️ Application Architecture

This is a monorepo with two main components:

1. **Backend** (`backend/`) - Node.js/Express API with MongoDB
2. **Frontend** (`frontend/`) - React Native/Expo application with web support

### Authentication
The app uses JWT-based authentication with two user types:
- **Patients** - Can view and book available appointment slots
- **Clinicians** - Can view patient details

### Database Schema
- **Users** - Patient and clinician profiles

## 🧪 Testing

### Backend Tests
```bash
cd backend
yarn test
```

### Run Specific Tests
```bash
cd backend
yarn test -t "gets users"
```

## 🔄 Database Management

### Reset Database
To completely reset your database with fresh sample data:
```bash
cd backend
yarn loaddb
```

This is particularly useful when:
- You encounter data inconsistencies
- You want to start with a clean slate
- You need to restore the original sample data

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `brew services start mongodb/brew/mongodb-community`
- Check MongoDB status: `brew services list | grep mongodb`

### Port Conflicts
- Backend uses port 9000
- Frontend uses port 8081
- Make sure these ports are available

### Common Issues
- **Database connection errors**: Restart MongoDB service
- **Port already in use**: Kill existing processes or use different ports
- **Module not found**: Run `yarn install` in the respective directory
- **Stale data**: Reset database using `yarn loaddb`

---

**Happy coding!** 🎉

