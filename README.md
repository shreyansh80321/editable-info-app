# 🧑‍💻 Edit Info App

A **MERN stack application** that allows users to **register, log in, and edit their profile information** — including updating their name, email, and password — with **secure authentication using JWT**.

Built with:
- 🟢 **Express.js** & **MongoDB** for the backend  
- ⚛️ **React (Vite)** for the frontend  
- 🔐 **JWT Authentication**  
- 🚀 **Deployed on Vercel**

---

## 📑 Table of Contents
1. [Overview](#-overview)
2. [Features](#-features)
3. [Tech Stack](#-tech-stack)
4. [Project Structure](#-project-structure)
5. [Getting Started](#-getting-started)
6. [Environment Variables](#-environment-variables)
7. [Deployment (Vercel)](#-deployment-vercel)
8. [Screenshots](#-screenshots)
9. [License](#-license)

---

## 💡 Overview

The **Edit Info App** provides a simple yet secure way for users to manage their profile information.  
It uses JWT-based authentication to protect private routes and ensures users can only update their own details.

When deployed, the backend is hosted first, and the frontend consumes its API using the backend’s deployed URL.

---

## ✨ Features

- ✅ **User Registration** — Create an account with name, email, and password  
- ✅ **User Login** — Secure authentication using JWT  
- ✅ **View Profile** — Fetch and display user data  
- ✅ **Edit Profile** — Update name, email, and password  
- ✅ **Password Change** — Requires current password validation  
- ✅ **Logout** — Clear token and redirect to login  
- ✅ **Error Handling & Toast Notifications**  
- ✅ **Responsive Design (Bootstrap)**  
- ✅ **Vercel Deployment Support**

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- React Toastify
- Bootstrap 5

### Backend
- Node.js with Express.js
- MongoDB (Mongoose)
- bcrypt.js for password hashing
- jsonwebtoken (JWT)
- dotenv
- cors

---

## 📁 Project Structure

edit-info-app/
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ │ └── userController.js
│ │ ├── models/
│ │ │ └── userModel.js
│ │ ├── routes/
│ │ │ └── userRoutes.js
│ │ ├── middleware/
│ │ │ └── authMiddleware.js
│ │ └── server.js
│ ├── .env
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Login.jsx
│ │ │ ├── Signup.jsx
│ │ │ └── Home.jsx
│ │ └── App.jsx
│ ├── public/
│ ├── vercel.json
│ ├── index.html
│ └── package.json
│
├── .gitignore
├── README.md
└── package.json

yaml
Copy code

---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/edit-info-app.git
cd edit-info-app
2. Setup Backend
bash
Copy code
cd backend
npm install
Create a .env file inside the backend folder:

env
Copy code
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Run the backend:

bash
Copy code
npm run dev
The backend will start on http://localhost:3000

3. Setup Frontend
bash
Copy code
cd ../frontend
npm install
Create a .env file inside the frontend folder:

env
Copy code
VITE_API_URL=http://localhost:3000
Run the frontend:

bash
Copy code
npm run dev
The frontend will start on http://localhost:5173

🌍 Deployment (Vercel)
Step 1 — Deploy Backend
Push your backend to a separate Vercel project (choose the backend folder during setup).

Add environment variables (MONGO_URI, JWT_SECRET, etc.) in the Vercel dashboard.

After deployment, copy your backend URL, for example:

arduino
Copy code
https://edit-info-backend.vercel.app
Step 2 — Deploy Frontend
Push your frontend to another Vercel project (choose the frontend folder).

Add a vercel.json file in the frontend root:

json
Copy code
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
Update API URLs in your frontend (replace http://localhost:3000 with your backend URL).

Redeploy the frontend.

🖼️ Screenshots
Login Page	Signup Page	Profile Page

(Replace placeholders with real screenshots after deployment.)

🧾 License
This project is licensed under the MIT License.
You are free to use, modify, and distribute it.

❤️ Acknowledgments
Special thanks to:

React

Express

MongoDB

Vercel

yaml
Copy code

---

Would you like me to **add deployment commands** (for example, how to connect each folder to Vercel via CLI) in this same file?  
I can append that section neatly at the end.
