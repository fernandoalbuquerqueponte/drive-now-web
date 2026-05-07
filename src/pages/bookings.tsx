import CarBookingTabs from "@/components/car-bookings-tabs";
import Header from "@/components/header";

function BookingsPage() {
  return (
    <>
      <Header />

      <div className="container mx-auto py-16">
        <h2 className="w-full pb-11 text-center text-3xl font-bold">
          Minhas reservas
        </h2>

        <div className="flex w-full justify-center">
          <CarBookingTabs />
        </div>
      </div>
    </>
  );
}

export default BookingsPage;
