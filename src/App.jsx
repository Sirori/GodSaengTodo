import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./routes.jsx";
import { RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />
          <AnimatePresence>
            <RouterProvider router={router} />
          </AnimatePresence>
        </QueryClientProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
