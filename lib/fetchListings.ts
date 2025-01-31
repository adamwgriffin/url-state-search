import omit from 'lodash/omit'
import type { ReadonlyURLSearchParams } from 'next/navigation'
import { http } from '~/lib/http'
import type { ListingSearchResponse, URLParams } from '~/types'
import {
  type GeocodeBoundaryQueryParams,
  geocodeBoundaryQuerySchema
} from '~/zod_schemas/geocodeBoundarySearchSchema'
import {
  type BoundarySearchQueryParams,
  boundarySearchQuerySchema
} from '~/zod_schemas/boundarySearchRequestSchema'
import {
  type BoundsSearchQueryParams,
  boundsSearchQuerySchema
} from '~/zod_schemas/boundsSearchRequestSchema'

export type ListingServiceRequest =
  | GeocodeBoundaryQueryParams
  | BoundarySearchQueryParams
  | BoundsSearchQueryParams

function removeNonListingServiceParams(params: URLParams) {
  return omit(params, 'bounds', 'boundary_id', 'zoom')
}

function removeNonGeospatialParams(params: URLParams) {
  return omit(params, 'address')
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
  const newParams = removeNonListingServiceParams(
    removeNonGeospatialParams(params)
  )
  return { ...newParams, ...listingServiceBounds }
}

async function getListings<T>(endpoint: string, params: ListingServiceRequest) {
  return http<T>(`/api/listing/search/${endpoint}`, params)
}

async function searchNewLocation(params: URLParams) {
  const result = geocodeBoundaryQuerySchema.safeParse(
    removeNonListingServiceParams(params)
  )
  if (result.success) {
    return getListings<ListingSearchResponse>('geocode', result.data)
  }
  console.warn(
    'Error parsing params for listing search. Cancelling request.',
    result.error
  )
  return {} // ReactQuery complains if we don't return a value
}

async function searchCurrentLocation(params: URLParams) {
  const requestParams = paramsForGeospatialSearch(params)
  const result = params.boundary_id
    ? boundarySearchQuerySchema.safeParse(requestParams)
    : boundsSearchQuerySchema.safeParse(requestParams)
  if (result.success) {
    return getListings<ListingSearchResponse>(
      params.boundary_id ? `boundary/${params.boundary_id}` : 'bounds',
      result.data
    )
  }
  console.warn(
    'Error parsing params for listing search. Cancelling request.',
    result.error
  )
  return {}
}

export async function fetchListings(searchParams: ReadonlyURLSearchParams) {
  if (searchParams.size === 0) return {}
  const params = Object.fromEntries(searchParams.entries())
  return params.bounds
    ? await searchCurrentLocation(params)
    : await searchNewLocation(params)
}
