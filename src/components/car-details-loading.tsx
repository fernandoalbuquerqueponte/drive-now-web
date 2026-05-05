import { Skeleton } from "@/components/ui/skeleton";

export function CarDetailsLoading() {
  return (
    <div className="container mx-auto">
      <div className="flex h-16 w-full items-center border-b px-4">
        <Skeleton className="h-8 w-32" />
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:flex lg:items-start lg:gap-8">
        <div className="flex-1 space-y-8">
          <section>
            <Skeleton className="mb-7 h-150 w-full rounded-md" />
          </section>

          <div className="flex w-full flex-col gap-3 rounded-2xl bg-zinc-900 px-8 py-7">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-10 w-1/2" />
            <div className="flex gap-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 pb-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
            <div className="space-y-3 pt-7">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
          </div>
        </div>

        <aside className="mt-8 w-full lg:sticky lg:top-8 lg:mt-0 lg:w-100">
          <div className="flex w-full flex-col gap-5 rounded-2xl bg-zinc-900 px-10 py-10">
            <div className="space-y-2">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>
            <Skeleton className="h-64 w-full rounded-xl" />{" "}
          </div>
        </aside>
      </main>
    </div>
  );
}
