import type { UseGetCarByIdResponse } from "@/http/types/use-get-car-by-id-response";

import BookingDateForm from "./booking-date-form";

interface CarPriceDetailsProps {
  data: UseGetCarByIdResponse;
}

function CarPriceDetails({ data }: CarPriceDetailsProps) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl bg-zinc-900 px-10 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-blue-500">
          R$ {data?.pricePerHour}{" "}
          <span className="text-muted-foreground text-lg font-normal">
            / hora
          </span>
        </h1>
        <span className="text-md text-muted-foreground">
          R$ {data?.pricePerHour ? data.pricePerHour * 24 : 0}/dia
        </span>
      </div>

      <BookingDateForm carDetails={data} />
    </div>
  );
}

export default CarPriceDetails;
