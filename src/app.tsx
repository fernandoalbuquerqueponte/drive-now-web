import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster } from "./components/ui/sonner";
import Authentication from "./pages/auth";
import BookingsPage from "./pages/bookings";
import CarDetailsPage from "./pages/car-details";
import HomePage from "./pages/home";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route element={<Authentication />} path="/authentication" index />
          <Route element={<HomePage />} path="/home" />
          <Route element={<CarDetailsPage />} path="/car/:id" />
          <Route element={<BookingsPage />} path="/bookings" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
