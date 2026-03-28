# 🚀 Blogify – Full Stack Blogging Platform

Blogify is a full-stack blogging application built using **Node.js, Express, MongoDB, and EJS**. It allows users to create, manage, and view blogs with authentication and dynamic server-side rendering.

---

## 📌 Features

* 🔐 User Authentication (Signup/Login)
* ✍️ Create, Edit & Delete Blogs
* 📄 Dynamic Blog Rendering using EJS
* 🧑‍💼 Session-based Authentication
* 🌐 RESTful Routing Structure
* 📱 Responsive UI
* ⚡ Clean MVC Architecture

---

## 🛠️ Tech Stack

### 💻 Frontend

* HTML
* CSS
* JavaScript
* EJS (Templating Engine)

### ⚙️ Backend

* Node.js
* Express.js

### 🗄️ Database

* MongoDB

### 🔧 Tools

* Git & GitHub
* Postman

---

## 📂 Project Structure

```id="real1"
Blogify/
│── controller/
│   │── add-blog.js
│   │── user.js
│
│── middlewares/
│   │── authentication.js
│
│── model/
│   │── blog.js
│   │── user.js
│
│── routes/
│   │── addblog.js
│   │── user.js
│   │── viewBlog.js
│
│── services/
│   │── Authentication.js
│
│── views/
│   │── partials/
│   │── addblog.ejs
│   │── blog.ejs
│   │── home.ejs
│   │── signin.ejs
│   │── signup.ejs
│   │── viewBlog.ejs
│
│── public/              # Static files (CSS, JS)
│── connect.js           # Database connection
│── index.js             # Entry point
│── package.json
│── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash id="real2"
git clone https://github.com/utkarsh1480/Blogify.git
cd Blogify
```

---

### 2️⃣ Install Dependencies

```bash id="real3"
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file:

```id="real4"
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4️⃣ Run the Server

```bash id="real5"
npm run dev
```

---

### 5️⃣ Open in Browser

```id="real6"
http://localhost:5000
```

---

## 🔄 Application Flow

1. User signs up or logs in
2. Authentication handled via middleware
3. User creates blog using form (EJS view)
4. Controller processes request
5. Data stored in MongoDB
6. Blogs rendered dynamically on frontend

---

## 🔐 Authentication System

* Middleware-based protection
* JWT / session handling
* Secure route access

---

## 🧠 Architecture

This project follows **MVC (Model-View-Controller)** pattern:

* **Model** → MongoDB schemas
* **View** → EJS templates
* **Controller** → Business logic
* **Routes** → API endpoints

---

## 📈 Future Improvements

* ❤️ Like & Comment system
* 🔍 Search functionality
* 🧑‍💼 Admin Dashboard
* ☁️ Image Upload (Cloudinary)
* 🧠 AI Blog Suggestions

---

## 🧑‍💻 Author

Utkarsh
CSE Student | Full Stack Developer

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
