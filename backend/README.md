# Personal Finance Management System

## Overview
The Personal Finance Management System is a backend application developed to manage personal finances, including budgeting, expense tracking, and financial reporting. This system allows users to register, authenticate, manage their income and expenses, create and track budgets, and generate monthly financial reports.

## Features
- User registration and authentication
- CRUD operations for income and expenses
- Budget creation and tracking
- Monthly financial reports
- Category-wise expense tracking (e.g., groceries, rent, entertainment)

## Technology Stack
- **Node.js** with **Express** for the server
- **Prisma** for database management
- **JWT** for user authentication
- **MySQL** as the database

## Database Schema
- `Users` table
- `Transactions` table (to track income and expenses)
- `Categories` table
- `Budgets` table

## Setup Instructions

### Prerequisites
- Node.js
- MySQL
- npm (Node Package Manager)

### Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/s4rth4k82/Finance-Management-System.git
    cd Finance-Management-System
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Setup the MySQL database:**
    - Create a new MySQL database.
    - Update the `.env` file with your database credentials.

    ```plaintext
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
    JWT_SECRET="your_jwt_secret_key"
    ```

4. **Run Prisma migrations:**
    ```bash
    npx prisma migrate dev
    ```

5. **Start the server:**
    ```bash
    npx nodemon index.js
    ```

### API Endpoints

#### Authentication

- **Register:**
    - **URL:** `/auth/register`
    - **Method:** `POST`
    - **Body:**
        ```json
        {
          "email": "user@example.com",
          "password": "yourpassword",
          "name": "Abcde Fghji"
        }
        ```

- **Login:**
    - **URL:** `/auth/login`
    - **Method:** `POST`
    - **Body:**
        ```json
        {
          "email": "user@example.com",
          "password": "yourpassword"
        }
        ```

#### Transactions

- **Create Transaction:**
    - **URL:** `/transactions`
    - **Method:** `POST`
    - **Headers:** `Authorization: Bearer <token>`
    - **Body:**
        ```json
        {
          "amount": 100,
          "type": "EXPENSE",
          "categoryId": 1
        }
        ```

- **Get All Transactions:**
    - **URL:** `/transactions`
    - **Method:** `GET`
    - **Headers:** `Authorization: Bearer <token>`

- **Update Transaction:**
    - **URL:** `/transactions/:id`
    - **Method:** `PUT`
    - **Headers:** `Authorization: Bearer <token>`
    - **Body:**
        ```json
        {
          "amount": 150,
          "type": "EXPENSE",
          "categoryId": 2
        }
        ```

- **Delete Transaction:**
    - **URL:** `/transactions/:id`
    - **Method:** `DELETE`
    - **Headers:** `Authorization: Bearer <token>`

#### Budgets

- **Create Budget:**
    - **URL:** `/budgets`
    - **Method:** `POST`
    - **Headers:** `Authorization: Bearer <token>`
    - **Body:**
        ```json
        {
          "amount": 500,
          "month": 5,
          "year": 2024
        }
        ```

- **Get All Budgets:**
    - **URL:** `/budgets`
    - **Method:** `GET`
    - **Headers:** `Authorization: Bearer <token>`

#### Reports

- **Monthly Financial Report:**
    - **URL:** `/reports/monthly`
    - **Method:** `GET`
    - **Headers:** `Authorization: Bearer <token>`
    - **Query Parameters:**
        - `month`: 5
        - `year`: 2024

- **Category-wise Expenses:**
    - **URL:** `/reports/category-wise-expenses`
    - **Method:** `GET`
    - **Headers:** `Authorization: Bearer <token>`

## Testing
For detailed testing, refer to the document containing images of the application testing on Postman: [Postman Testing Images](https://docs.google.com/document/d/1lwFFjehtCInEcxCDJceasRfgFOVicrLyC_Ny2Qwasio/edit?usp=sharing)



