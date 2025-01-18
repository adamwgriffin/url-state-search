import { objectToQueryString } from './listingSearchParams'
import isEmpty from 'lodash/isEmpty'

export async function http<T = unknown>(
  url: string,
  searchParams?: object,
  options: RequestInit = {}
) {
  // await new Promise((resovle) => setTimeout(resovle, 2000))
  const urlWithParams = isEmpty(searchParams)
    ? url
    : `${url}?${objectToQueryString(searchParams)}`
  const res = await fetch(urlWithParams, options)
  if (!res.ok) {
    throw new Error(await res.text())
  }
  return (await res.json()) as T
}
