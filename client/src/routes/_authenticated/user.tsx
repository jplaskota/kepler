import UserPage from "@/components/UserPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/user")({
  component: UserPage,
});
