import { Car, MessageCircle, User } from "lucide-react";

import HeaderProfile from "@/components/header-profile";
import MyCarsProfileTabsSection from "@/components/my-cars-profile-tabs-section";
import MyCommentsProfileTabsSection from "@/components/my-comments-profile-tabs-section";
import PersonalDataCard from "@/components/personal-data-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUser } from "@/http/use-get-user";

function MyAccountPage() {
  const { data } = useGetUser();

  if (!data) {
    return null;
  }

  return (
    <div className="container mx-auto w-full py-9">
      <div className="mx-auto max-w-220 space-y-9 px-5">
        <HeaderProfile user={data} />

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
              <MyCarsProfileTabsSection cars={data.cars} />
            </TabsContent>

            <TabsContent value="comments">
              <MyCommentsProfileTabsSection reviews={data.reviews} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default MyAccountPage;
