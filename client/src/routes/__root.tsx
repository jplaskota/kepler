import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import CategoryProvider from "@/store/category.context";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: Container,
});

function Container() {
  return (
    <div className="w-full flex flex-col items-center bg-background">
      <CategoryProvider>
        <Navbar />
        <Outlet />
      </CategoryProvider>
      <Toaster />
      {/* <TanStackRouterDevtools /> */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </div>
  );
}

// TODO tanstack router devtools
// TODO query devtools
