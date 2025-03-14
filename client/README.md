# 🎬 Kepler Frontend

This is the frontend application for Kepler - a web application for managing your movie and TV series watchlist. Built with modern web technologies, it provides a smooth and responsive user experience.

## 🛠️ Tech Stack

### Core

- **React 18.3** - UI library with hooks and functional components
- **TypeScript** - Type safety and better developer experience
- **Vite 5** - Fast build tool and development server
- **Bun** - Fast JavaScript runtime and package manager

### Routing & State Management

- **TanStack Router** - Type-safe routing with automatic route type generation
- **TanStack Query** - Data fetching, caching, and state management
- **React Context** - Local state management for themes, language, and library

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Accessible and composable UI components
- **Lucide Icons** - Beautiful and consistent icons

### Internationalization

- **i18next** - Internationalization framework
- **Language Detector** - Automatic browser language detection

### Development Tools

- **ESLint** - Code linting with TypeScript and React rules
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Vite** - Development server with HMR

## 📁 Project Structure

```
├── public/          # Static assets
├── src/
│   ├── assets/      # Images and other assets
│   ├── components/  # Reusable UI components
│   │   ├── ui/     # Shadcn/ui components
│   │   └── Search/ # Search-related components
│   ├── hooks/      # Custom React hooks
│   ├── lib/        # Utility functions
│   ├── locales/    # i18n translation files
│   ├── routes/     # Application routes
│   ├── services/   # API services
│   ├── store/      # Context providers
│   └── types/      # TypeScript types
```

## 🚀 Getting Started

### Prerequisites

- Bun 1.0+
- Git

### Installation

1. Clone the repository and navigate to the client directory:

```bash
git clone https://github.com/your-username/kepler.git
cd kepler/client
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun dev
```

## 🔧 Development

### Code Style

The project uses ESLint and Prettier for code consistency. The configuration extends from:

- typescript-eslint
- eslint-plugin-react
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh

### State Management

React Context is used for state management. Context providers are located in `src/store/`:

- `language.context.tsx` - Internationalization settings
- `library.context.tsx` - User's library management
- `preferences.context.tsx` - User preferences

### Routing

TanStack Router provides type-safe routing with features like:

- Automatic route type generation
- File-based routing in `src/routes/`
- Route guards for protected routes
- Dev tools for debugging

### API Integration

API services are organized in `src/services/` using TanStack Query for:

- Data fetching and caching
- Automatic background updates
- Loading and error states
- Optimistic updates

## 📦 Building for Production

```bash
bun run build
```

The build output will be in the `dist/` directory.
