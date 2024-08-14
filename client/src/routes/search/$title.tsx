import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/search/$title')({
  component: () => <div>Hello /search/$title!</div>
})