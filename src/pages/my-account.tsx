import { Car, MessageCircle, User } from "lucide-react";

import CarListCard from "@/components/car-list-card";
import Header from "@/components/header";
import HeaderProfile from "@/components/header-profile";
import PersonalDataCard from "@/components/personal-data-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUser } from "@/http/use-get-user";

function MyAccountPage() {
  const { data, isLoading, isError } = useGetUser();

  if (isLoading) return <p>Carregando perfil...</p>;
  if (isError) return <p>Erro ao carregar perfil. Faça login novamente.</p>;

  return (
    <>
      <Header />

      <div className="container mx-auto w-full py-9">
        <div className="mx-auto w-200 space-y-9">
          <HeaderProfile user={data} />

          {/* TABS */}
          <div className="mx-auto w-full">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="account">
                  <User />
                  Informações
                </TabsTrigger>
                <TabsTrigger value="my-cars">
                  <Car />
                  Meus Carros
                </TabsTrigger>
                <TabsTrigger value="comments">
                  <MessageCircle />
                  Comentários
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <PersonalDataCard user={data} />
              </TabsContent>
              <TabsContent value="my-cars">
                {data?.cars.map((car) => {
                  return <CarListCard key={car.id} car={car} />;
                })}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAccountPage;
