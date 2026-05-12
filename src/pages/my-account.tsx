import Header from "@/components/header";
import HeaderProfile from "@/components/header-profile";
import { useGetUser } from "@/http/use-get-user";

function MyAccountPage() {
  const { data, isLoading, isError } = useGetUser();

  if (isLoading) return <p>Carregando perfil...</p>;
  if (isError) return <p>Erro ao carregar perfil. Faça login novamente.</p>;

  return (
    <>
      <Header />

      <div className="container mx-auto w-full py-9">
        <div className="mx-auto w-165">
          <HeaderProfile user={data} />
        </div>
      </div>
    </>
  );
}

export default MyAccountPage;
