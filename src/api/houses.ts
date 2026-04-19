import { useInfiniteQuery } from '@tanstack/react-query'
import type { House } from '../types'

const HOUSES_ENDPOINT = 'https://staging.homevision.co/api_project/houses'
const REQUEST_TIMEOUT_MS = 8000
const DEFAULT_PER_PAGE = 10

type HousesResponse = {
  houses?: House[]
}

const parseHouses = (value: unknown): House[] => {
  if (!value || typeof value !== 'object' || !('houses' in value)) {
    throw new Error('Unexpected API response shape.')
  }

  const response = value as HousesResponse
  if (!Array.isArray(response.houses)) {
    throw new Error('The API response does not include a houses array.')
  }

  return response.houses
}

export const fetchHousesPage = async (
  page: number,
  perPage: number,
): Promise<House[]> => {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const params = new URLSearchParams({
      page: String(page),
      per_page: String(perPage),
    })

    const response = await fetch(`${HOUSES_ENDPOINT}?${params.toString()}`, {
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}.`)
    }

    const payload = (await response.json()) as unknown
    return parseHouses(payload)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown network error.'
    throw new Error(`Could not load houses. ${message}`)
  } finally {
    window.clearTimeout(timeoutId)
  }
}

export const useInfiniteHouses = (perPage = DEFAULT_PER_PAGE) =>
  useInfiniteQuery({
    queryKey: ['houses', perPage],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => fetchHousesPage(pageParam, perPage),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < perPage ? undefined : allPages.length + 1,
    retry: 5,
    retryDelay: (attemptIndex) => Math.min(5000, 400 * 2 ** attemptIndex),
  })
