import * as React from "react";
import ReactDOM from "react-dom/client";
import {
  ErrorComponent,
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { auth } from "./utils/auth";
import { Spinner } from "~shadcn/ui/spinner";
import { routeTree } from "./routeTree.gen";
import { useSessionStorage } from "./hooks/useSessionStorage";
import "./styles.css";

//

export const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className={`p-2 text-2xl`}>
      <Spinner />
    </div>
  ),
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: undefined!, // We'll inject this when we render
    queryClient,
  },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  // This stuff is just to tweak our sandbox setup in real-time
  const [loaderDelay, setLoaderDelay] = useSessionStorage("loaderDelay", 500);
  const [pendingMs, setPendingMs] = useSessionStorage("pendingMs", 1000);
  const [pendingMinMs, setPendingMinMs] = useSessionStorage(
    "pendingMinMs",
    500
  );

  return (
    <RouterProvider
      router={router}
      defaultPreload="intent"
      defaultPendingMs={pendingMs}
      defaultPendingMinMs={pendingMinMs}
      context={{
        auth,
      }}
    />
  );
}

const rootElement = document.getElementById("app")!;
const root = ReactDOM.createRoot(rootElement);
root.render(
  //<React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  //</React.StrictMode>
);
