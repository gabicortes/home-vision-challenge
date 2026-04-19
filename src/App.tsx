import { useEffect, useMemo, useRef } from 'react'
import { useInfiniteHouses } from './api/houses'
import { AppHeader } from './components/AppHeader/AppHeader'
import { CardGrid } from './components/CardGrid/CardGrid'

function App() {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const {
    data,
    error,
    isError,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteHouses()

  const items = useMemo(() => data?.pages.flatMap((page) => page) ?? [], [data])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage()
        }
      },
      { rootMargin: '220px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <div className="min-h-screen bg-background-page">
      <AppHeader />
      <main className="mx-auto w-full max-w-[1400px] px-5 pt-6 pb-8">
        {isPending && (
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <span
                className="size-8 animate-spin rounded-full border-2 border-border-subtle border-t-text-brand"
                aria-hidden="true"
              />
              <p className="text-center text-body text-text-secondary">
                We're loading the house of your dreams...
              </p>
            </div>
          </div>
        )}

        {!isPending && <CardGrid items={items} />}

        {isFetchingNextPage && !isPending && (
          <p className="mt-5 text-center text-body text-text-secondary">
            Loading more houses...
          </p>
        )}

        {isError && (
          <div className="mx-auto mt-5 max-w-xl rounded-sm border border-border-subtle bg-background-surface p-4 text-center">
            <p className="m-0 text-body text-text-primary">
              {error instanceof Error
                ? error.message
                : 'Unexpected error loading houses.'}
            </p>
            <button
              type="button"
              className="mt-3 rounded-sm border border-border-subtle px-4 py-2 text-small font-semibold text-text-primary transition hover:bg-background-page"
              onClick={() => {
                void refetch()
              }}
            >
              Retry
            </button>
          </div>
        )}

        {!isPending && !isError && items.length === 0 && (
          <p className="mt-5 text-center text-body text-text-secondary">
            No listings available.
          </p>
        )}

        {!isFetchingNextPage && !hasNextPage && items.length > 0 && (
          <p className="mt-5 text-center text-body text-text-secondary">
            You reached the end of the listings.
          </p>
        )}

        <div ref={sentinelRef} aria-hidden="true" className="h-1 w-full" />
      </main>
    </div>
  )
}

export default App
