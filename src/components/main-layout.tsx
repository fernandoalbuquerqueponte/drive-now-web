import { Outlet } from "react-router-dom";

import Footer from "./footer";
import Header from "./header";

export default function MainLayout() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Header />
      <main className="w-full flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
