# 🌌 Kepler

Kepler is a web application for saving movies and series for later. Keep track of your watchlist and never lose sight of the content you want to watch!

## 🚀 Features

- Search for movies and TV series
- Save content to your watchlist
- Get detailed information about movies and series
- User authentication and personalized lists

## 📸 Screenshots

Here are some screenshots of the application:

![Main page of Kepler application](/screenshots/kepler.jpeg)

![Detailed view of a movie or series](/screenshots/details.jpeg)

![User profile and watchlist](/screenshots/user.jpeg)

## 🛠️ Tech Stack

### Frontend

- React with TypeScript
- Vite
- TanStack Router
- Tailwind CSS
- Shadcn/ui

### Backend

- Bun
- Hono
- Drizzle ORM
- PostgreSQL
- Supabase

### Authentication

- Kinde Auth

## 🏗️ Project Structure

```
├── client/          # Frontend application
└── server/          # Backend application
```

Detailed documentation for each part can be found in their respective directories:

- [Client Documentation](./client/README.md)
- [Server Documentation](./server/README.md)

## 🚦 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- PostgreSQL database
- Kinde Auth account
- TMDB and OMDB API keys

### Development Environment

1. Clone the repository

```bash
git clone https://github.com/your-username/kepler.git
cd kepler
```

2. Configure environment variables

```bash
cd server
cp .env.example .env
```

Edit the `.env` file and fill in your credentials for:

- Database connection
- Kinde Auth
- TMDB and OMDB API keys

3. Start the frontend development server

```bash
cd client
bun install
bun dev     # Runs on localhost:5173
```

4. Start the backend development server

```bash
cd server
bun install
bun dev     # Runs on localhost:3000
```

### Production Environment

To run the application in production mode:

```bash
cd server
bun install
bun dev     # Runs on localhost:3000
```

## 📝 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

I welcome your input! I aim to make contributing to Kepler as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

All contributions are welcome! Please feel free to open issues and submit pull requests.
