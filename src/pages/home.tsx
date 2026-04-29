import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FilterInput from "@/components/filter-input";
import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";

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

      <div className="container mx-auto w-screen py-20">
        <Card>
          <CardContent className="flex flex-col">
            <FilterInput />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HomePage;
