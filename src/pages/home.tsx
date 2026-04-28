import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/header";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/authentication");
    }
  }, [navigate]);

  return (
    <div>
      <Header />
    </div>
  );
}

export default HomePage;
