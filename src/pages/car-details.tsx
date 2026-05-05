import { useParams } from "react-router-dom";

import CarCommentSection from "@/components/car-comment-section";
import CarDescription from "@/components/car-description";
import CarPriceDetails from "@/components/car-price-details";
import Header from "@/components/header";
import { Spinner } from "@/components/ui/spinner";
import { useGetCarById } from "@/http/use-get-car-by-id";

function CarDetailsPage() {
  const { id } = useParams();
  const { data } = useGetCarById(id!);

  if (!id || !data) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:flex lg:items-start lg:gap-8">
        <div className="flex-1 space-y-8">
          <section>
            <img
              src={data?.image}
              alt={data?.brand}
              className="mb-7 h-150 w-full rounded-md object-cover"
            />
          </section>

          <CarDescription data={data} />
          <CarCommentSection id={id} data={data} />
        </div>

        <aside className="mt-8 w-full lg:sticky lg:top-8 lg:mt-0 lg:w-100">
          <CarPriceDetails data={data} />
        </aside>
      </main>
    </div>
  );
}

export default CarDetailsPage;
