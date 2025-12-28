# 🧵 Desi Etsy - Handmade Products E-commerce Platform

Desi Etsy is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed to promote local artisans and their handmade products. It features customer shopping, artisan product listings, and admin moderation – creating a niche marketplace tailored to Indian crafts and handmade goods.

---

## 🌐 Live Demo

Frontend: [https://desietsy.netlify.app](https://desietsy.netlify.app)  
Backend: Hosted on Render

---

## 📂 Folder Structure

```
Desi-Etsy/
├── backend/             # Node.js + Express API
├── frontend/            # ReactJS client app
└── README.md
```

---

## 🚀 Tech Stack

### 🔧 Backend:

- **Node.js**
- **Express.js**
- **MongoDB** + Mongoose
- **JWT Authentication**
- **Razorpay Integration**
- **Nodemailer** for password reset via email

### 🎨 Frontend:

- **React.js**
- **React Router DOM**
- **React Context API** for auth & cart
- **Axios** for API calls
- **React Hot Toast** for alerts
- **Custom CSS**

---

## 🧑‍💼 User Roles

### 🛒 Customer:

- Browse products using filters
- Add to cart and checkout using Razorpay
- View order history

### 🎨 Artisan:

- Register and login
- Upload handmade products for admin approval
- Manage their product listings

### 🛠️ Admin:

- Approve/reject products and artisan registrations
- View and update order status (Pending, Packed, Shipped, Delivered)

---

## 🔑 Authentication & Authorization

- **JWT-based login** with cookie storage (`httpOnly`)
- **Role-based routing** for Admin, Artisan, and Customer
- **Forgot Password** with tokenized email link using **Nodemailer**

---

## 💳 Razorpay Integration

- Customer can make payments using Razorpay Checkout
- Payments are verified on backend via signature
- Orders are stored only after successful verification

---

## 🔍 Filters and Search

- Product filtering by:
  - Name / keyword
  - Category
  - Artisan
  - Price range

---

## 📥 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Amish-Soni/Desi-Etsy.git
cd Desi-Etsy
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
PORT=8080
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
FRONTEND_URL=your_frontend_url
```

Start the server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create `.env` file in `/frontend`:

```env
VITE_API_URL=your_backend_url/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

Start the frontend:

```bash
npm run dev
```

---

## 🛡️ Security & Best Practices

- Cookies are `httpOnly` and secure in production
- Passwords hashed using `bcrypt`
- Backend routes protected by middleware (`authMiddleware`, `isAdmin`, `isArtisan`)
- Razorpay signature is verified on backend before order creation

---
Under the project: **Desi Etsy - Niche E-commerce Platform for Handmade Products**  
Stack: **MERN**

---
