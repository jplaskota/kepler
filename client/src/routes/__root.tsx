import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import LanguageProvider from "@/store/language.context";
import LibraryProvider from "@/store/library.context";
import PreferencesProvider from "@/store/preferences.context";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

// need to be type to avoid error
type RootRouteProps = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootRouteProps>()({
  component: Root,
});

function Root() {
  return (
    <div className="w-full min-h-svh flex flex-col items-center">
      <LanguageProvider>
        <PreferencesProvider>
          <LibraryProvider>
            <Navbar />
            <Outlet />
          </LibraryProvider>
        </PreferencesProvider>
        <Toaster />
      </LanguageProvider>
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

// TODO tanstack router devtools
// TODO query devtools
