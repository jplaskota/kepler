import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/search/series/$title')({
  component: () => <div>Hello /search/series/$title!</div>
})