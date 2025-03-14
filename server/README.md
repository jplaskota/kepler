# 🚀 Kepler Backend

This is the backend application for Kepler - a web application for managing your movie and TV series watchlist. Built with modern technologies, it provides a robust and scalable API for the frontend application.

## 🛠️ Tech Stack

### Core

- **Bun** - Fast JavaScript runtime and package manager
- **TypeScript** - Type safety and better developer experience
- **Drizzle ORM** - Type-safe SQL query builder
- **Hono** - Fast, lightweight, and type-safe web framework

### Database

- **Supabase** - PostgreSQL database with real-time capabilities
- **Database Migrations** - Version-controlled database schema

### Authentication

- **Kinde** - Authentication as a service for secure user management

### Development Tools

- **ESLint** - Code linting with TypeScript rules
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📁 Project Structure

```
├── src/
│   ├── db/           # Database configuration and schema
│   ├── lib/          # Utility functions
│   ├── models/       # Data models and types
│   ├── routes/       # API routes and handlers
│   ├── services/     # Business logic and external services
│   ├── kinde.ts      # Authentication configuration
│   ├── server.ts     # Server setup and middleware
│   └── index.ts      # Application entry point
├── supabase/         # Database migrations
└── tests/            # Test files
```

## 🚀 Getting Started

### Prerequisites

- Bun 1.0+
- Git
- Supabase Account
- Kinde Account

### Installation

1. Clone the repository and navigate to the server directory:

```bash
git clone https://github.com/your-username/kepler.git
cd kepler/server
```

2. Copy the environment variables file and fill in your values:

```bash
cp .env.example .env
```

3. Install dependencies:

```bash
bun install
```

4. Start the development server:

```bash
bun dev
```

The server will start at `http://localhost:3000`

## 🔧 Development

### Environment Variables

The application requires several environment variables for configuration. These include:

- Database connection details
- Kinde authentication credentials
- Development URLs
- TMDB and OMDB API keys

Check the `.env.example` file for the complete list of required variables and their formats. Copy this file to `.env` and update the values according to your setup.

### Database Migrations

To create a new migration:

```bash
bun run db:generate
```

To apply migrations:

```bash
bun run db:migrate
```

### API Routes

The API follows RESTful conventions:

- `GET /api/movies` - Get user's movie watchlist
- `POST /api/movies` - Add a movie to watchlist
- `DELETE /api/movies/:id` - Remove a movie from watchlist
- `GET /api/series` - Get user's TV series watchlist
- `POST /api/series` - Add a TV series to watchlist
- `DELETE /api/series/:id` - Remove a TV series from watchlist

### Authentication Flow

1. User is redirected to Kinde login page
2. After successful login, user is redirected back with an authorization code
3. Backend exchanges the code for access and refresh tokens
4. Access token is used for subsequent API requests
