# Ecommerce Project - Backend

## Overview

This is a ecommerce project that includes user authentication, role management, product management, and cart functionality. It features a backend built with Express.js and MongoDB, providing a robust API for managing users, products, and carts. The project also includes email notifications for order confirmations.

## Features

- **User Authentication**: Sign up and log in with JWT-based authentication.
- **Role Management**: Different roles for users and superadmins.
- **Product Management**: Create, update, and delete products (admin only).
- **Cart Functionality**: Add products to the cart, view cart, and checkout.
- **Email Notifications**: Order confirmation emails sent after checkout.

## Installation

### Prerequisites

- Node.js (>= 16.x)
- MongoDB (for local development) or a MongoDB Atlas account (for cloud-based database)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <repository-directory>
```

2. Install dependencies
```bash
npm install
```

3. Environment Variables
Create a `.env` file in the root directory and add the following environment variables:
```bash
PORT = 5000
MONGODB_URL = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerce-project?retryWrites=true&w=majority'

JWT_SECRET = '<your-jwt-secret>'
JWT_EXPIRES_IN = '1h'

EMAIL_USERNAME = '<your-email-address>'
EMAIL_PASSWORD = '<your-email-password>'
```
Replace `<username>`, `<password>`, `<your-jwt-secret>`, `<your-email-address>`, and `<your-email-password>` with your actual MongoDB credentials, JWT secret, and email credentials.

4. Run the Application
```bash
npm start
```

## Deployment

The backend is deployed on Render. You can access the live backend at `https://ecommerce-project-backend-gy68.onrender.com`.