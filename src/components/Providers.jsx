"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Next13ProgressBar } from "next13-progressbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Next13ProgressBar
        height="4px"
        color="#272343"
        options={{ showSpinner: true }}
      />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
