Meraya - E-commerce Platform 🛍️

🚀 Overview

Meraya is a fully functional e-commerce website developed for a startup clothing brand based in India. This project serves as the online storefront, enabling customers to browse products, manage their accounts, and complete purchases securely. It showcases the integration of a modern frontend framework (React) with a robust backend system (Django + MySQL) to deliver a complete online shopping experience.

[Optional: Insert a compelling screenshot of your website's homepage here]
<!--  -->

✨ Features

👤 User Authentication: Secure signup, login (including potentially Google OAuth), and password management.

<0xF0><0x9F><0x91><0x9A> Product Catalog: Browse products by category, view detailed product pages with image galleries and variant (size) selection.

🛒 Shopping Cart: Add/remove items, update quantities, persistent cart for logged-in users.

❤️ Wishlist: Save favorite items for later.

<0xF0><0x9F><0xAA><0xAA> User Profile Management: Update contact information, manage saved addresses, view order history.

🔒 Secure Checkout: Multi-step checkout process (Cart -> Address -> Summary -> Payment).

💳 Payment Gateway Integration: Secure payment processing via Razorpay (supporting UPI, Cards, Netbanking, etc.).

📦 Order Management (Backend): Creation of orders, association with users and payments, status tracking.

📱 Responsive Design: Optimized user experience across desktop, tablet, and mobile devices.

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


Frontend will typically be available at http://localhost:3000 or http://localhost:5173 (check terminal output).

▶️ Running the Project

Start the MySQL database server.

Start the Django backend server: python manage.py runserver 0.0.0.0:8000

Start the React frontend server: npm run dev (or yarn dev)

Open your browser and navigate to the frontend URL (e.g., http://localhost:3000).

☁️ Deployment

🌐 Live Frontend: [Link to your Vercel/Netlify deployment] - e.g., https://meraya.vercel.app

🔗 Live Backend API: [Link to your Render/DO/VPS deployment] - e.g., https://api.meraya.co.in

Deployment Notes:

Frontend: Deployed via Vercel, connected directly to the GitHub repository for automatic CI/CD.

Backend & Database: Currently hosted on [Render/DigitalOcean App Platform/Hostinger VPS - Specify your choice]. The VPS setup uses Nginx as a reverse proxy and web server, with Gunicorn managing the Django application processes.

Images: Product images are hosted and served via Cloudinary for optimized delivery.

Environment Variables: Production environment variables (Database credentials, DJANGO_SECRET_KEY, Razorpay Live keys, etc.) are securely configured in the hosting provider's dashboard or server environment. Ensure DEBUG=False in production.

📸 Screenshots (Optional but Recommended)

Include screenshots of key features:

Homepage

Product Listing Page

Product Detail Page

Cart

Checkout Flow

User Profile

🔮 Future Enhancements (Optional)

Admin dashboard for managing products, orders, and users.

Product reviews and ratings.

Search functionality.

Integration with shipping APIs.

Discount codes/Coupons implementation.

🤝 Contributing (Optional)

Contributions, issues, and feature requests are welcome. Please adhere to the project's code of conduct.
