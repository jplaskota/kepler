import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/search/movies/$title')({
  component: () => <div>Hello /search/movies/$title!</div>
})