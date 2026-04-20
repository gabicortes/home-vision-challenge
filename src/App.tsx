import { useEffect, useMemo, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useInfiniteHouses } from "./api/houses";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { CardGrid } from "./components/CardGrid/CardGrid";
import { PriceFilter } from "./components/PriceFilter/PriceFilter";

function App() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");

  const {
    data,
    error,
    isError,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    failureCount,
  } = useInfiniteHouses();

  const items = useMemo(
    () => data?.pages.flatMap((page) => page) ?? [],
    [data],
  );
  const minPrice = minPriceInput.trim() === "" ? null : Number(minPriceInput);
  const maxPrice = maxPriceInput.trim() === "" ? null : Number(maxPriceInput);
  const hasValidMinPrice = minPrice !== null && Number.isFinite(minPrice);
  const hasValidMaxPrice = maxPrice !== null && Number.isFinite(maxPrice);
  const hasPriceFilter = hasValidMinPrice || hasValidMaxPrice;

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        const matchesMin = hasValidMinPrice
          ? item.price >= (minPrice as number)
          : true;
        const matchesMax = hasValidMaxPrice
          ? item.price <= (maxPrice as number)
          : true;
        return matchesMin && matchesMax;
      }),
    [hasValidMaxPrice, hasValidMinPrice, items, maxPrice, minPrice],
  );
  const isRetrying =
    !isError && (isPending || isFetchingNextPage) && failureCount > 0;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { rootMargin: "220px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="min-h-screen bg-cream-50">
      <AppHeader />
      <main className="mx-auto w-full max-w-[1400px] p-12">
        <PriceFilter
          minPriceInput={minPriceInput}
          maxPriceInput={maxPriceInput}
          onMinPriceChange={setMinPriceInput}
          onMaxPriceChange={setMaxPriceInput}
          onClear={() => {
            setMinPriceInput("");
            setMaxPriceInput("");
          }}
        />

        {isRetrying && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-neutral-280 bg-neutral-0 px-5 py-5 text-neutral-800">
            <LoaderCircle className="size-5 animate-spin text-blue-500" />
            <p className="m-0 text-body font-semibold">
              Retrying ({Math.min(failureCount, 5)}/5)...
            </p>
          </div>
        )}

        {isPending && (
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <span
                className="size-8 animate-spin rounded-full border-2 border-neutral-260 border-t-blue-600"
                aria-hidden="true"
              />
              <p className="text-center text-body text-neutral-700">
                We're loading the house of your dreams...
              </p>
            </div>
          </div>
        )}

        {!isPending && <CardGrid items={filteredItems} />}

        {isFetchingNextPage && !isPending && (
          <p className="mt-5 text-center text-body text-neutral-700">
            Loading more houses...
          </p>
        )}

        {isError && (
          <div className="mx-auto mt-5 max-w-xl rounded-sm border border-neutral-260 bg-neutral-0 p-4 text-center">
            <p className="m-0 text-body text-neutral-900">
              {error instanceof Error
                ? error.message
                : "Unexpected error loading houses."}
            </p>
            <button
              type="button"
              className="mt-3 rounded-sm border border-neutral-260 px-4 py-2 text-small font-semibold text-neutral-900 transition hover:bg-neutral-50"
              onClick={() => {
                void refetch();
              }}
            >
              Retry
            </button>
          </div>
        )}

        {!isPending && !isError && items.length === 0 && (
          <p className="mt-5 text-center text-body text-neutral-700">
            No listings available.
          </p>
        )}

        {!isPending &&
          !isError &&
          hasPriceFilter &&
          items.length > 0 &&
          filteredItems.length === 0 && (
            <p className="mt-5 text-center text-body text-neutral-700">
              No listings match your price range.
            </p>
          )}

        {!isFetchingNextPage && !hasNextPage && filteredItems.length > 0 && (
          <p className="mt-5 text-center text-body text-neutral-700">
            You reached the end of the listings.
          </p>
        )}

        <div ref={sentinelRef} aria-hidden="true" className="h-1 w-full" />
      </main>
    </div>
  );
}

export default App;
