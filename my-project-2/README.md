# E-Commerce Product Catalog API

A robust, stateless RESTful API and interactive storefront built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**. This project enforces strict schema validation at the network boundary using **Zod**, implements secure stateless authentication using **JSON Web Tokens (JWT)** and **`bcryptjs`**, and provides Role-Based Access Control (RBAC).

---

## Table of Contents

- [Overview & Architectural Principles](#overview--architectural-principles)
- [Tech Stack](#tech-stack)
- [Project Directory Structure](#project-directory-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Installation & Setup](#installation--setup)
- [Database Seeding](#database-seeding)
- [Running the Application](#running-the-application)
- [Interactive Storefront](#interactive-storefront)
- [API Reference & Documentation](#api-reference--documentation)
- [Error Handling & Response Contract](#error-handling--response-contract)

---

## Overview & Architectural Principles

- **Resource-Based Noun Routing:** Strict REST conventions using plural resource nouns (`/api/v1/products`, `/api/v1/categories`, `/api/v1/auth`). Verb-based routes and file extensions are strictly prohibited.
- **Two-Tier Validation (The Gatekeeper Rule):**
  - **Syntactic Validation:** Intercepts all incoming client payloads at the HTTP layer via a reusable Zod `validate(schema)` middleware before requests reach controller logic.
  - **Semantic Validation:** Verifies logical database integrity inside controllers (e.g., confirming that a referenced `categoryId` exists in MongoDB before creating a product).
- **Stateless Security:** Stateless authentication powered by JWTs passed through the `Authorization: Bearer <token>` header, with role verification (`user` vs `admin`) on mutating endpoints.
- **Uniform Response Envelope:** Predictable JSON responses for both successes and failures across all endpoints.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Runtime & Framework** | Node.js (v18+) with Express.js |
| **Database & ODM** | MongoDB Community Server with Mongoose ODM |
| **Validation Engine** | Zod (strict runtime schema parsing) |
| **Authentication & Security** | JSON Web Tokens (`jsonwebtoken`), Password Hashing (`bcryptjs`) |
| **Environment & Dev Tools** | Dotenv, Nodemon |

---

## Project Directory Structure

```text
ecommerce-api/
├── .env
├── .gitignore
├── package.json
├── README.md
├── server.js               # Application entry point & DB connection
├── seed.js                 # Database seeder (50 products, 5 categories)
├── public/                 # Static web client
│   └── index.html          # Interactive storefront interface
└── src/
    ├── app.js              # Express app setup, middleware, and route mounting
    ├── config/
    │   └── db.js           # Mongoose MongoDB connection
    ├── controllers/
    │   ├── authController.js
    │   ├── categoryController.js
    │   └── productController.js
    ├── middlewares/
    │   ├── auth.js         # JWT verification & RBAC authorization
    │   ├── errorHandler.js # Global centralized error & 404 handler
    │   └── validate.js     # Zod boundary gatekeeper middleware
    ├── models/
    │   ├── Category.js     # Mongoose Category schema
    │   ├── Product.js      # Mongoose Product schema
    │   └── User.js         # Mongoose User schema with pre-save password hash
    ├── routes/
    │   ├── authRoutes.js
    │   ├── categoryRoutes.js
    │   ├── productRoutes.js
    │   └── index.js        # Central router aggregating API v1 endpoints
    └── schemas/
        ├── authSchema.js       # Zod schemas for register & login
        ├── categorySchema.js   # Zod schemas for category CRUD
        ├── commonSchema.js     # Shared MongoDB ObjectId validators
        └── productSchema.js    # Zod schemas for product CRUD
```

---

## Features

| Feature | Description | Access Level |
| :--- | :--- | :--- |
| **Stateless Authentication (AuthN)** | Register and login endpoints issuing cryptographic JWTs valid for 24 hours | Public |
| **Role-Based Access Control (AuthZ)** | Restricts category and product mutation operations (POST, PUT, DELETE) | Admins only |
| **Public Catalog Browsing** | Open endpoints to browse categories and query products without authentication | Public |
| **Product Filtering & Population** | Filter products by stock status (`inStock`) and category with Mongoose population | Public |
| **Two-Tier Validation Gatekeeper** | Syntactic checks via Zod middleware and semantic checks in controllers | API Consumers |
| **Database Seeder** | Automated script (`node seed.js`) populating 50 items across 5 categories | Developers |
| **Interactive Storefront** | Built-in web client with live text search, category filtering, and price sorting | Customers |

---

## Prerequisites

Ensure you have the following installed on your local development machine:

- **Node.js** (v18.0.0 or higher)
- **npm** (Node Package Manager)
- **MongoDB Community Server** (running locally on port `27017`) or **MongoDB Atlas URI**

---

## Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce_catalog
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=1d
```

---

## Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd ecommerce-api
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Ensure MongoDB is running:**
   - Verify that your local MongoDB Community Server service is active.

---

## Database Seeding

To automatically populate your database with 5 categories and 50 structured products:

```bash
node seed.js
```

---

## Running the Application

### Development Mode (with hot-reloading):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

Once running, the terminal will confirm:
```text
MongoDB Connected: 127.0.0.1
Server listening on port 5000 in development mode
```

---

## Interactive Storefront

You can explore the frontend catalog directly in your browser:

- **Storefront Interface:** [http://localhost:5000](http://localhost:5000)
- **Health Check Endpoint:** [http://localhost:5000/health](http://localhost:5000/health)

---

## API Reference & Documentation

Base Path: `/api/v1`

### 1. Authentication Endpoints

#### Register User
- **Method:** `POST`
- **Endpoint:** `/auth/register`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "password123",
    "role": "admin"
  }
  ```
- **Responses:** `201 Created`, `400 Bad Request`

#### Login User
- **Method:** `POST`
- **Endpoint:** `/auth/login`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "admin@example.com",
    "password": "password123"
  }
  ```
- **Responses:** `200 OK`, `400 Bad Request`, `401 Unauthorized`

---

### 2. Category Endpoints

| Method | Endpoint | Auth Required | Role | Description | Status Codes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/categories` | No | Public | List all categories | `200` |
| **GET** | `/categories/:id` | No | Public | Fetch category by ID | `200`, `400`, `404` |
| **POST** | `/categories` | Yes (Bearer) | `admin` | Create new category | `201`, `400`, `401`, `403` |
| **PUT** | `/categories/:id` | Yes (Bearer) | `admin` | Update category details | `200`, `400`, `401`, `403`, `404` |
| **DELETE**| `/categories/:id` | Yes (Bearer) | `admin` | Delete category | `200`, `400`, `401`, `403`, `404` |

#### Category Request Body Example (POST):
```json
{
  "name": "Smart Home & IoT",
  "description": "Connected devices, hubs, and intelligent home lighting"
}
```

---

### 3. Product Endpoints

| Method | Endpoint | Auth Required | Role | Description | Status Codes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/products` | No | Public | List all products (supports filtering) | `200` |
| **GET** | `/products/:id` | No | Public | Fetch product by ID (populated category) | `200`, `400`, `404` |
| **POST** | `/products` | Yes (Bearer) | `admin` | Create product (enforces category check) | `201`, `400`, `401`, `403` |
| **PUT** | `/products/:id` | Yes (Bearer) | `admin` | Update product details | `200`, `400`, `401`, `403`, `404` |
| **DELETE**| `/products/:id` | Yes (Bearer) | `admin` | Delete product | `200`, `400`, `401`, `403`, `404` |

#### Product Request Body Example (POST):
```json
{
  "name": "UltraSlim 14\" Laptop",
  "price": 899.99,
  "description": "Lightweight laptop with 16GB RAM and 512GB NVMe SSD",
  "category": "66f0a1b2c3d4e5f6a7b8c9d0",
  "inStock": true
}
```

#### Query Parameters for `GET /products`:
- `category`: Filter products by MongoDB Category ObjectId (e.g., `?category=66f0a1b...`)
- `inStock`: Filter products by inventory status (`?inStock=true` or `?inStock=false`)

---

## Error Handling & Response Contract

All responses conform to standardized JSON response structures.

### Success Format (`200 OK`, `201 Created`)
```json
{
  "status": "success",
  "data": {
    "count": 50,
    "products": [ ]
  }
}
```

### Client Validation Failure (`400 Bad Request`)
```json
{
  "status": "fail",
  "message": "Syntactic validation failed",
  "errors": [
    {
      "field": "price",
      "message": "Price must be greater than zero"
    }
  ]
}
```

### Unauthorized / Forbidden (`401`, `403`)
```json
{
  "status": "fail",
  "message": "Forbidden. You do not have permission to perform this action.",
  "errors": []
}
```

### Resource Not Found (`404 Not Found`)
```json
{
  "status": "fail",
  "message": "Resource not found at POST /api/v1/invalid-route",
  "errors": []
}
```

### Server Error (`500 Internal Server Error`)
```json
{
  "status": "fail",
  "message": "Internal server error occurred.",
  "errors": []
}
```