# Comments Section - Client/Server Project

This project is a simple client-server web application for managing comments. It consists of a backend built with Laravel (PHP) and a frontend built with Vite + React (TypeScript).

## Features

- RESTful API for comments (list, create)
- Example database seeder for comments
- Frontend ready to consume the API using Axios

## Installation

### Backend (Laravel)

1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. Install PHP dependencies:
   ```sh
   composer install
   ```
3. Copy the example environment file and configure your environment:
   ```sh
   cp .env.example .env
   # Edit .env as needed (DB_CONNECTION, etc.)
   ```
4. Generate the application key:
   ```sh
   php artisan key:generate
   ```
5. Run migrations and seeders:
   ```sh
   php artisan migrate --seed
   ```
6. Start the development server:
   ```sh
   php artisan serve
   ```

### Frontend (Vite + React)

1. Navigate to the `frontend` folder:
   ```sh
   cd frontend
   ```
2. Install Node.js dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

- The backend API will be available at `http://localhost:8000/api/comments`.
- The frontend will be available at the port shown in the terminal (usually `http://localhost:5173`).
- Make sure to configure CORS if accessing the API from a different origin.

## Project Structure

- `backend/` - Laravel API and database
- `frontend/` - React client

---

Feel free to modify and extend this project for your needs.
