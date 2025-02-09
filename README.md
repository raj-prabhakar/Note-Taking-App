# Note-Taking Web App

This project is a **full-stack MERN (MongoDB, Express, React, Node.js) application.** The app allows users to create, manage, and search notes using text input or **speech-to-text transcription** via the Web Speech API.

## Features

### **Frontend (React + Vite)**
- Next.js/React with functional components
- Tailwind CSS for styling
- React Hook Form for form validation
- JWT-based authentication (Sign-up & Login)
- Speech-to-text transcription using the **Browser Web Speech API**
- Search functionality for notes
- Modal-based note viewing and editing
- Image upload support
- Favorite and rename note options

### **Backend (Express + MongoDB)**
- Express for API handling
- Mongoose for database interactions
- JSON Web Token (JWT) authentication
- Multer for file uploads
- Cloudinary integration for image storage
- Dotenv for environment variables
- Bcrypt.js for password hashing

## Installation

### Prerequisites
Make sure you have the following installed:
- Node.js (>= 18.x)
- MongoDB (local or Atlas)
- npm or yarn

### Clone the Repository
```sh
git clone <repository_url>
cd <repository_folder>
```

### Install Dependencies
#### Backend
```sh
cd server
npm install
```

#### Frontend
```sh
cd client
npm install
```

## Environment Variables
Create a `.env` file in the `server` directory and add the following:
```
PORT=5000
MONGO_URI=<your_mongo_db_uri>
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
```

## Running the Project
### Start Backend Server
```sh
cd server
npm run dev
```

### Start Frontend Server
```sh
cd client
npm run dev
```
The frontend will be available at `http://localhost:5173`

## Deployment
### Build Frontend
```sh
cd client
npm run build
```

### Deploy Backend
Use services like **Vercel, Render, or Railway** for deployment.

## Tech Stack
- **Frontend**: Next.js/React, Tailwind CSS, React Hook Form
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Speech-to-Text API**: Web Speech API
- **File Storage**: Cloudinary
- **Styling**: Tailwind CSS


