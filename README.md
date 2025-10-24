# 🛍️ Meraya - E-commerce Platform

## 🚀 Overview

**Meraya** is a fully functional e-commerce website developed for a startup clothing brand based in India.  
This project serves as the **online storefront**, enabling customers to browse products, manage their accounts, and complete purchases securely.  

It combines a **modern React frontend** with a **robust Django + MySQL backend** to deliver a complete, production-ready shopping experience.

> 💡 *From product discovery to secure checkout, Meraya offers a smooth and scalable e-commerce workflow.*

---

## ✨ Features

- 👤 **User Authentication:** Secure signup, login (with optional Google OAuth), and password management.  
- 👗 **Product Catalog:** Browse products by category, view detailed product pages with image galleries and size/variant selection.  
- 🛒 **Shopping Cart:** Add/remove items, update quantities, and maintain a persistent cart for logged-in users.  
- ❤️ **Wishlist:** Save favorite items for later.  
- 👛 **User Profile Management:** Update contact info, manage saved addresses, and view order history.  
- 🔒 **Secure Checkout:** Multi-step checkout (Cart → Address → Summary → Payment).  
- 💳 **Payment Integration:** Razorpay payment gateway with support for UPI, Cards, and Netbanking.  
- 📦 **Order Management (Backend):** Order creation, user association, payment linking, and status tracking.  
- 📱 **Responsive Design:** Seamless experience across desktop, tablet, and mobile devices.  

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React.js, React Router, Context API, CSS Modules |
| **Backend** | Django, Django REST Framework (DRF), Simple JWT |
| **Database** | MySQL |
| **Payment Gateway** | Razorpay |
| **Image Hosting** | Cloudinary |
| **Deployment** | Frontend: Vercel / Netlify <br> Backend: Render / DigitalOcean / Hostinger VPS (Nginx + Gunicorn) |

---

## ⚙️ Setup and Installation

### 🧩 Prerequisites
Ensure you have the following installed:

- Node.js and npm (or yarn)
- Python 3.x and pip
- MySQL Server
- Git

---

### 🗂️ 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <project-directory-name>
```

### 🐍 2. Backend Setup (Django)
```bash
cd backend  # Navigate to backend folder

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```
### 🧱 Database Setup
```bash
1. Create a MySQL database named meraya (or your chosen name).

2. Update database settings in meraya/settings.py.

🔑 Environment Variables (.env)
DJANGO_SECRET_KEY='your_strong_secret_key'
DEBUG=True
DATABASE_NAME='meraya'
DATABASE_USER='your_db_user'
DATABASE_PASSWORD='your_db_password'
DATABASE_HOST='localhost'
DATABASE_PORT='3306'
RAZORPAY_KEY_ID='your_razorpay_test_key_id'
RAZORPAY_KEY_SECRET='your_razorpay_test_key_secret'
RAZORPAY_WEBHOOK_SECRET='your_razorpay_webhook_secret'
CORS_ALLOWED_ORIGINS='http://localhost:3000,http://127.0.0.1:3000'

🧩 Apply Migrations
python manage.py migrate


(If using managed=False models, ensure the tables already exist in MySQL.)

▶️ Run the Backend Server
python manage.py runserver 0.0.0.0:8000


Backend API: http://localhost:8000
```

### ⚛️ 3. Frontend Setup (React)
```bash
cd ../frontend  # Navigate to frontend folder

# Install dependencies
npm install   # or yarn install

🌐 Environment Variables (.env)
VITE_API_BASE_URL=http://localhost:8000/api

▶️ Run the Frontend Server
npm run dev   # or yarn dev


Frontend runs at http://localhost:3000
 or http://localhost:5173
```

▶️ Running the Project
```bash

Start MySQL server

Run Django backend → python manage.py runserver

Run React frontend → npm run dev

Visit http://localhost:3000
```
