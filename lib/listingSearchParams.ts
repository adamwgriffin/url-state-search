import type { SearchParamsInit, URLParams } from '~/types'
import isEqual from 'lodash/isEqual'
import omitBy from 'lodash/omitBy'

export const GeospatialSearchParams = ['bounds', 'boundary_id', 'zoom']

/**
 * Keep track of a subset of Listing Service param defaults so that we can avoid
 * sending them in the request if the service would behave this way be default
 * anyway
 */
export const ParamDefaults: Partial<URLParams> = Object.freeze({
  page_index: '0',
  page_size: '20',
  sort_by: 'listedDate',
  sort_direction: 'desc'
})

/**
 * Remove params marked for removal as well as params that use default values.
 * Setting a param to these falsey values indicates that it should be removed
 * from the filters if present.
 */
export function removeUnwantedParams(params: URLParams) {
  return omitBy(
    params,
    (value, key) =>
      value === null || value === '' || isEqual(ParamDefaults[key], value)
  )
}

export function objectToQueryString(params: URLParams) {
  // Casting params as SearchParamsInit because the current type provided by
  // Typescript for this is not correct
  return new URLSearchParams(params as SearchParamsInit)
    .toString()
    .replace(/%2C/g, ',') // Don't encode commas in url params
}

export function updateParams(currentParams: URLParams, newParams: URLParams) {
  const merged = { ...currentParams, ...newParams }
  return removeUnwantedParams(merged)
}

export function getUpdatedQueryString(
  currentParams: URLParams,
  newParams: URLParams
) {
  return objectToQueryString(updateParams(currentParams, newParams))
}
