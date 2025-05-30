# ✅ MERN Todo App

A full-stack Todo application built with **MongoDB**, **Express**, **React**, and **Node.js**. Users can sign up, log in, create, update, and delete todos with secure JWT-based authentication.

---

## 🔗 Live Demo

- 🌐 Frontend: https://sturdy-couscous-u9qd.onrender.com
<!-- - ⚙️ Backend API: [https://your-backend.onrender.com](https://your-backend.onrender.com) -->

---

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS, Axios, Framer Motion
- **Backend**: Node.js, Express, MongoDB (via Mongoose), JWT Auth
- **Deployment**: Render, MongoDB Atlas

---

## 🔐 Features

- ✅ Signup / Login with JWT
- ✅ Protected routes (only authenticated users can access todos)
- ✅ Create / Edit / Delete Todos
- ✅ Toggle completion status
- ✅ Dark mode support
- ✅ Responsive UI with animations

---

## 🚀 Getting Started Locally

### 1. Clone the Repository

\`\`\`bash
git clone 
cd mern-todo-app
\`\`\`

---

### 2. Setup Backend

\`\`\`bash
cd server
npm install
\`\`\`

Create a `.env` file inside \`/server\`:

\`\`\`env
PORT=5000
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/TodosApp
JWT_PASS=your_jwt_secret
\`\`\`

Start the backend:
\`\`\`bash
npm start
\`\`\`

---

### 3. Setup Frontend

\`\`\`bash
cd ../client
npm install
\`\`\`


\`\`\`API_URL
API_URL=http://localhost:5000
\`\`\`

Start the frontend:
\`\`\`bash
npm run dev  # for Vite
\`\`\`

---


## ✅ API Routes

| Method | Route                  | Description         |
|--------|------------------------|---------------------|
| POST   | \`/api/user/signup\`     | Register a new user |
| POST   | \`/api/user/login\`      | Log in a user       |
| GET    | \`/api/todo\`            | Get all todos       |
| POST   | \`/api/todo\`            | Create a todo       |
| PUT    | \`/api/todo/:id\`        | Update a todo       |
| DELETE | \`/api/todo/:id\`        | Delete a todo       |

🔐 All \`/todo\` routes require Bearer token in \`Authorization\` header.

---

## 🙋‍♂️ Author

- **Name**: DARK7177
- **GitHub**: [@DARK7177](https://github.com/DARK7177)

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).
