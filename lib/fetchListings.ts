import omit from 'lodash/omit'
import type { ReadonlyURLSearchParams } from 'next/navigation'
import { http } from '~/lib/http'
import type {
  ListingSearchBoundaryResponse,
  ListingSearchGeocodeResponse,
  URLParams
} from '~/types'

function removeNonListingServiceParams(params: URLParams) {
  return omit(params, 'bounds', 'boundary_id', 'address', 'zoom')
}

function convertBoundsParamToListingServiceBounds(boundsString: string) {
  const [bounds_south, bounds_west, bounds_north, bounds_east] =
    boundsString.split(',')
  return { bounds_south, bounds_west, bounds_north, bounds_east }
}

// TODO: Validate params with Zod instead
function paramsForGeospatialSearch(params: URLParams) {
  if (typeof params.bounds !== 'string') {
    throw new Error('Bounds not included in params')
  }
  const listingServiceBounds = convertBoundsParamToListingServiceBounds(
    params.bounds
  )
  const newParams = removeNonListingServiceParams(params)
  return { ...newParams, ...listingServiceBounds }
}

async function getListings<T>(endpoint: string, params: URLParams) {
  return http<T>(`/api/listing/search/${endpoint}`, params)
}

async function searchNewLocation(params: URLParams) {
  return getListings<ListingSearchGeocodeResponse>('geocode', params)
}

async function searchCurrentLocation(params: URLParams) {
  return getListings<ListingSearchBoundaryResponse>(
    params.boundary_id ? `boundary/${params.boundary_id}` : 'bounds',
    paramsForGeospatialSearch(params)
  )
}

export async function fetchListings(searchParams: ReadonlyURLSearchParams) {
  if (searchParams.size === 0) return null
  const params = Object.fromEntries(searchParams.entries())
  return params.bounds
    ? await searchCurrentLocation(params)
    : await searchNewLocation(params)
}
