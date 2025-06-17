# Forum College - University Comments System

College project showcasing modern frontend and backend integration for university comments management.

![Main UI Screenshot](assets/Screenshot%202025-06-17%20at%2001-48-58%20Vite%20React%20TS.png)

## Key Features

- Interface with React and Tailwind CSS
- RESTful API with Laravel
- User and comment management
- Voting system (upvotes/downvotes)

## Technologies

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Laravel
- **Database**: MySQL

## Installation

### Backend (Laravel)

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
composer install
```

3. Configure the environment:

```bash
cp .env.example .env
# Configure database in .env
php artisan key:generate
```

4. Run migrations and seeders:

```bash
php artisan migrate --seed
```

5. Start the server:

```bash
php artisan serve
```

### Frontend (React)

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Project Structure

```
seccion_comentarios/
├── backend/         # Laravel REST API
│   ├── app/         # Models, controllers and routes
│   └── database/    # Migrations and seeders
│
└── frontend/        # React application
    ├── src/         # Components and logic
    └── public/      # Static assets
```

## Usage

1. Backend will be available at `http://localhost:8000`
2. Frontend will be available at `http://localhost:5173`
3. Make sure to configure CORS to allow cross-origin requests
