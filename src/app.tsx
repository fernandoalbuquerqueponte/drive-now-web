import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster } from "./components/ui/sonner";
import Authentication from "./pages/auth";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route element={<Authentication />} index />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
