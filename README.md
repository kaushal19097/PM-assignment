
# 🖼️ Polimart Media Upload App

A secure backend system built with **Node.js, MongoDB, Multer, and JWT** that allows users to upload media (image/video), view uploads, and download them. All routes are protected with JWT-based authentication.

---

## ⚙️ Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Multer (for file upload)
- JWT (for authentication)
- Postman (for API testing)

---

## 🚀 Getting Started

## Install Node.js (Skip if already installed)

## On Windows:

Visit: https://nodejs.org/
Download the Windows Installer (.msi)
Run the installer and follow the setup instructions.
Confirm installation by typing the below commands in the terminal window: 

node -v
npm -v

## On macOS

Use Homebrew (recommended).
Type this command in the terminal window -- brew install node
Confirm installation by typing the below commands in the terminal window: 

node -v
npm -v

### ✅ 1. Clone & Open Project

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### ✅ 2. MongoDB
If MongoDB is not installed please download and install.

Download link - https://www.mongodb.com/try/download/community

### ✅ 3. Run the Server

You already have `node_modules` included, so just run:

```bash
node server.js
```

Output:
```
MongoDB connected
🚀 Server running at http://localhost:5000
```

---

## 🔐 Authentication

### Dummy Login User

```json
{
  "email": "test@example.com",
  "password": "test123"
}
```

### 🟢 Login Endpoint

**POST** `/api/user/login`

- Body → `raw` → `JSON`:
```json
{
  "email": "test@example.com",
  "password": "test123"
}
```

- ✅ Response:
```json
{
  "token": "your-jwt-token"
}
```

> Copy this token for next steps.

---

## 💡 How to Use Postman (Mac & Windows)

### Step-by-step for All OS:

#### 🟢 1. Login & Get JWT Token

- Open Postman
- Set method to `POST`
- Enter URL: `http://localhost:5000/api/user/login`
- Go to **Body** → choose `raw` → `JSON` and paste:
```json
{
  "email": "test@example.com",
  "password": "test123"
}
```
- Click **Send**
- Copy the returned `"token"`

---

#### 🔐 2. Authorize with JWT

- Click **Authorization** tab in Postman
- Select Type → `Bearer Token`
- Paste your JWT token

## 📤 Upload Media (Image/Video)

**POST** `/api/user/upload`

- Authorization → Bearer Token
- Go to **Body** → `form-data`
  - `name`: your name (text)
  - `email`: test@example.com
  - `media`: (file input, select an image or video)

✅ Uploads file, returns metadata + download URL.

---

## 📋 View All Uploads

**GET** `/api/user/uploads`

- Authorization → Bearer Token
- ✅ Returns JSON array of all uploaded files with metadata & download links.

---

## ⬇️ Download File

**GET** `/api/user/download/:filename`

- Example:
```
GET http://localhost:5000/api/user/download/1720705581716-image.jpg
```
- Authorization → Bearer Token

📁 Saves file to your system.


## 🧪 Postman Testing Summary

| Feature        | Endpoint                       | Method | Auth Required |
|----------------|--------------------------------|--------|----------------|
| Login          | `/api/user/login`              | POST   | ❌             |
| Upload Media   | `/api/user/upload`             | POST   | ✅             |
| View Uploads   | `/api/user/uploads`            | GET    | ✅             |
| Download File  | `/api/user/download/:filename` | GET    | ✅             |

---

## 📝 Notes

- Only one dummy user is allowed: `test@example.com / test123`
- Upload folder can be auto-created at runtime.
- File metadata includes name, type, extension, size, and upload time.
- JWT tokens expire in 1 hour.

---
