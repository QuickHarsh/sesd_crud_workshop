# SESD CRUD Workshop Backend

## Overview
This is a full-fledged CRUD backend for a **Product Management System**, built using Node.js, Express, Mongoose (MongoDB), and TypeScript. It follows a clean Object-Oriented Programming (OOP) architecture with `Controller -> Service -> Repository` layers.

## Features
- **CRUD Operations**: Create, Read (List/Single), Update, Delete Products.
- **Advanced Querying**:
    - **Search**: Search by name, description, or category.
    - **Filter**: Filter by category, minPrice, maxPrice.
    - **Sorting**: Sort by any field (e.g., price, createdAt) in asc/desc order.
    - **Pagination**: Efficient pagination with `page` and `limit`.
- **Validation**: Strict request validation using **Zod**.
- **Architecture**:
    - **Controllers**: Handle HTTP requests and responses.
    - **Services**: Contain business logic.
    - **Repositories**: Handle database interactions (Generic BaseRepository + ProductRepository).
    - **Models**: Mongoose schemas and interfaces.
- **Global Error Handling**: Centralized error middleware.

## Setup
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd sesd_crud
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment:**
   Create a `.env` file in the root:
   ```env
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/sesd_crud
   ```
4. **Run the server:**
   - Development: `npm run dev`
   - Build: `npm run build`
   - Start: `npm start`

## API Endpoints

### Products
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/products` | Create a new product |
| `GET` | `/api/products` | Get all products (supports queries) |
| `GET` | `/api/products/:id` | Get single product by ID |
| `PUT` | `/api/products/:id` | Update a product |
| `DELETE` | `/api/products/:id` | Delete a product |

### Query Examples
- **Search**: `GET /api/products?search=phone`
- **Filter**: `GET /api/products?category=Electronics&minPrice=100`
- **Sort**: `GET /api/products?sortBy=price&sortOrder=asc`
- **Pagination**: `GET /api/products?page=2&limit=5`

## Project Structure
```
src/
├── config/         # Database connection
├── controllers/    # API Controllers (Class-based)
├── middlewares/    # Error & Validation middlewares
├── models/         # Mongoose Models
├── repositories/   # Data Access Layer (Base + Entity specific)
├── schemas/        # Zod Validation Schemas
├── services/       # Business Logic Layer
├── app.ts          # App configuration
└── server.ts       # Entry point
```
