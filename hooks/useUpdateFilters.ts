import {
  type ReadonlyURLSearchParams,
  useSearchParams,
  useRouter,
  usePathname
} from 'next/navigation'
import omitBy from 'lodash/omitBy'
import { SearchParams } from '~/types'

function getNewSearchParams(
  currentParams: ReadonlyURLSearchParams,
  newParams: SearchParams
) {
  const mergedParams = Object.assign(
    Object.fromEntries(currentParams),
    newParams
  )
  const updatedParams = omitBy(mergedParams, (value) => !value)
  return new URLSearchParams(updatedParams)
}

export function useUpdateFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return function (newParams: SearchParams) {
    const updatedQueryString = getNewSearchParams(
      searchParams,
      newParams
    ).toString()
    const url =
      updatedQueryString === '' ? pathname : `${pathname}?${updatedQueryString}`
    router.push(url)
  }
}
