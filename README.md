# Cymulate Phishing Simulation & Awareness App

A full-stack application for simulating phishing attacks and raising security awareness, built as part of the Cymulate Full Stack Engineer challenge.

---

## 🧱 Tech Stack

- **Backend (2 NestJS Services)**
  - `phishing-simulation`: Sends phishing emails, tracks clicks
  - `phishing-management`: Handles user auth and phishing logs
- **Frontend**
  - React (TypeScript)
  - Axios for HTTP
- **Database**
  - MongoDB (Mongoose)
- **Extras**
  - JWT Auth
  - Nodemailer for sending emails

---

## 📁 Project Structure

```
project-root/
├── phishing-simulation/       # Sends emails and tracks phishing clicks
├── phishing-management/       # User auth + phishing logs API
└── frontend/                  # React frontend
```

---

## 🚀 Getting Started

### 1. Start MongoDB

You need MongoDB running locally on the default port (or update `.env` files).

### 2. Phishing Simulation Service

```bash
cd phishing-simulation
# Or create your own .env file
npm install
npm run start
```

#### .env file:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
MONGO_URI=mongodb://localhost/phishing
```

---

### 3. Phishing Management Service

```bash
cd ../phishing-management
# Or create your own .env file
npm install
npm run start
```

#### .env file:

```
MONGO_URI=mongodb://localhost/phishing
JWT_SECRET=your-secret-key
```

---

### 4. Frontend

```bash
cd ../frontend
npm install
PORT=3002 npm start
```

Frontend available at: [http://localhost:3002](http://localhost:3002)

---

## 🧪 API Highlights

### Authentication

- `POST /auth/register` – Create account
- `POST /auth/login` – Login and get JWT

### Phishing Management

- `GET /attempts` – Get attempts for logged-in user
- `POST /attempts/send` – Send phishing email (calls simulation server)

### Phishing Simulation

- `POST /phishing/send` – Send phishing email directly
- `GET /phishing/click/:id` – Track click on phishing link

---

## ✅ Features

- JWT-secured login/register
- Role: Admin (default)
- Send and track phishing attempts
- Track clicks via special link
- Each user sees only their own attempts
- Frontend includes login/register/dashboard UI

---

## 🛡 Security

- Email credentials stored in `.env`
- CORS enabled for frontend dev
- MongoDB and Mongoose sanitize inputs

---

## 👨‍💻 Dev Tips

- Use Gmail app password (not your real password)
- You can mock emails if you don’t want to send real ones

---

## 🙏 Author

Built by Tigran as part of Cymulate's Full Stack Engineer interview task.
