import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./routes.jsx";
import { RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
const queryClient = new QueryClient();

function App() {
  return (
    <>                                  
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AnimatePresence>
            <RouterProvider router={router} />
          </AnimatePresence>
        </QueryClientProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
