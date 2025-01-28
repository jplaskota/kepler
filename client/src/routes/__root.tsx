import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import LibraryProvider from "@/store/library.context";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

// need to be type to avoid error
type RootRouteProps = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootRouteProps>()({
  component: Root,
});

function Root() {
  return (
    <div className="w-full flex flex-col items-center bg-background">
      <LibraryProvider>
        <Navbar />
        <Outlet />
      </LibraryProvider>
      <Toaster />
      {/* <TanStackRouterDevtools /> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

// TODO tanstack router devtools
// TODO query devtools
