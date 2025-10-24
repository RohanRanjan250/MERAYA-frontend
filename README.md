Meraya - E-commerce Platform

🚀 Overview

Meraya is a fully functional e-commerce website developed for a startup clothing brand based in India. This project serves as the online storefront, enabling customers to browse products, manage their accounts, and complete purchases securely. It showcases the integration of a modern frontend framework with a robust backend system to deliver a complete online shopping experience.

✨ Features

User Authentication: Secure signup, login (including potentially Google OAuth), and password management.

Product Catalog: Browse products by category, view detailed product pages with image galleries and variant (size) selection.

Shopping Cart: Add/remove items, update quantities, persistent cart for logged-in users.

Wishlist: Save favorite items for later.

User Profile Management: Update contact information, manage saved addresses, view order history.

Secure Checkout: Multi-step checkout process (Cart -> Address -> Summary -> Payment).

Payment Gateway Integration: Secure payment processing via Razorpay (supporting UPI, Cards, Netbanking, etc.).

Order Management (Backend): Creation of orders, association with users and payments, status tracking.

Responsive Design: Optimized user experience across desktop, tablet, and mobile devices.

🛠️ Tech Stack

Frontend: React.js, React Router, Context API (or other state management), CSS Modules (or chosen styling method)

Backend: Django, Django Rest Framework (DRF), Simple JWT (for authentication)

Database: MySQL

Payment Gateway: Razorpay

Image Hosting (Recommended): Cloudinary

Deployment:

Frontend: Vercel (or Netlify/Firebase Hosting)

Backend & DB: Render / DigitalOcean App Platform / VPS (e.g., DigitalOcean, Hostinger) with Nginx & Gunicorn

⚙️ Setup and Installation

Follow these steps to set up the project locally for development.

Prerequisites

Node.js and npm (or yarn)

Python 3.x and pip

MySQL Server

Git

1. Clone the Repository

git clone <your-repository-url>
cd <project-directory-name>


2. Backend Setup (Django)

# Navigate to the backend directory
cd backend # Or your backend folder name

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Set up the database
# 1. Create a MySQL database named 'meraya' (or your chosen name)
# 2. Configure database settings in meraya/settings.py

# Create a .env file in the backend root directory and add environment variables:
# DJANGO_SECRET_KEY='your_strong_secret_key'
# DEBUG=True
# DATABASE_NAME='meraya'
# DATABASE_USER='your_db_user'
# DATABASE_PASSWORD='your_db_password'
# DATABASE_HOST='localhost' # Or your DB host
# DATABASE_PORT='3306'
# RAZORPAY_KEY_ID='your_razorpay_test_key_id'
# RAZORPAY_KEY_SECRET='your_razorpay_test_key_secret'
# RAZORPAY_WEBHOOK_SECRET='your_razorpay_webhook_secret' # Important for production/testing webhooks
# CORS_ALLOWED_ORIGINS='http://localhost:3000,[http://127.0.0.1:3000](http://127.0.0.1:3000)' # Add your frontend URL

# Apply database migrations (if using Django's migration system)
# If your tables are managed=False, ensure they exist in the DB.
# python manage.py migrate

# Run the backend server
python manage.py runserver 0.0.0.0:8000


Backend API will be available at http://localhost:8000

3. Frontend Setup (React)

# Navigate to the frontend directory from the project root
cd ../frontend # Or your frontend folder name

# Install dependencies
npm install # or yarn install

# Create a .env file in the frontend root directory (optional, if needed for API URL)
# VITE_API_BASE_URL=http://localhost:8000/api # Example for Vite

# Run the frontend development server
npm run dev # or yarn dev
